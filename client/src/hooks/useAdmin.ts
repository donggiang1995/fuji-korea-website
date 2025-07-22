import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { AdminUser } from '@shared/schema';

export function useAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem('adminSession')
  );

  const queryClient = useQueryClient();

  // Get current admin user
  const { data: admin, isLoading } = useQuery({
    queryKey: ['/api/admin/me'],
    enabled: !!sessionId,
    retry: false,
  });

  // Update authentication state
  useEffect(() => {
    if (admin && sessionId) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (sessionId) {
        // Invalid session, clear it
        setSessionId(null);
        localStorage.removeItem('adminSession');
      }
    }
  }, [admin, sessionId]);

  // Login function
  const login = (newSessionId: string) => {
    setSessionId(newSessionId);
    localStorage.setItem('adminSession', newSessionId);
    setIsAuthenticated(true);
    queryClient.invalidateQueries({ queryKey: ['/api/admin/me'] });
  };

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('/api/admin/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionId}`,
        },
      });
    },
    onSuccess: () => {
      setSessionId(null);
      setIsAuthenticated(false);
      localStorage.removeItem('adminSession');
      queryClient.clear();
    },
    onError: () => {
      // Even if server logout fails, clear local session
      setSessionId(null);
      setIsAuthenticated(false);
      localStorage.removeItem('adminSession');
      queryClient.clear();
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return {
    admin: admin?.admin as AdminUser | undefined,
    isAuthenticated,
    isLoading,
    sessionId,
    login,
    logout,
    isLoggingOut: logoutMutation.isPending,
  };
}

// Custom query hook for admin API calls
export function useAdminQuery(endpoint: string, enabled = true) {
  const { sessionId } = useAdmin();
  
  return useQuery({
    queryKey: [endpoint],
    enabled: enabled && !!sessionId,
    queryFn: async () => {
      return apiRequest(endpoint, {
        headers: {
          'Authorization': `Bearer ${sessionId}`,
        },
      });
    },
  });
}

// Custom mutation hook for admin API calls
export function useAdminMutation(endpoint: string, method: string = 'POST') {
  const { sessionId } = useAdmin();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data?: any) => {
      return apiRequest(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${sessionId}`,
        },
        body: data,
      });
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      if (endpoint.includes('products')) {
        queryClient.invalidateQueries({ queryKey: ['/api/admin/products'] });
        queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      }
      if (endpoint.includes('serial-numbers')) {
        queryClient.invalidateQueries({ queryKey: ['/api/admin/serial-numbers'] });
      }
    },
  });
}