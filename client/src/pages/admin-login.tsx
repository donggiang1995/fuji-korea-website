import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, User } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

interface AdminLoginProps {
  onLoginSuccess: (sessionId: string) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const { toast } = useToast();
  const [loginError, setLoginError] = useState<string>('');

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await apiRequest('/api/admin/login', {
        method: 'POST',
        body: data,
      });
      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.admin.username}!`,
      });
      onLoginSuccess(data.sessionId);
      setLoginError('');
    },
    onError: (error: any) => {
      const errorMessage = error.message || 'Login failed';
      setLoginError(errorMessage);
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginForm) => {
    setLoginError('');
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--fuji-blue))] via-[hsl(var(--fuji-navy))] to-[hsl(var(--fuji-steel))] flex items-center justify-center p-4">
      <div className="absolute inset-0 tech-pattern opacity-10"></div>
      
      <Card className="w-full max-w-md industrial-card border-0 shadow-2xl relative">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="w-20 h-20 bg-[hsl(var(--fuji-blue))] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
              Admin Panel
            </CardTitle>
            <Badge className="bg-[hsl(var(--fuji-blue))]/10 text-[hsl(var(--fuji-blue))] border-[hsl(var(--fuji-blue))]/20">
              FUJI Global Korea
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {loginError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {loginError}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-slate-700">
                      <User className="w-4 h-4" />
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
                        {...field}
                        className="border-slate-300 focus:border-[hsl(var(--fuji-blue))]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-slate-700">
                      <Lock className="w-4 h-4" />
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                        className="border-slate-300 focus:border-[hsl(var(--fuji-blue))]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[hsl(var(--fuji-blue))] hover:bg-[hsl(var(--fuji-navy))] text-white py-3"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Logging in...' : 'Login to Admin Panel'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}