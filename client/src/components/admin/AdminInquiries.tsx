import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Mail, Building, Calendar, User } from 'lucide-react';
import { useAdminQuery } from '@/hooks/useAdmin';
import type { Inquiry } from '@shared/schema';

export default function AdminInquiries() {
  const { data: inquiries, isLoading } = useAdminQuery('/api/admin/inquiries');

  if (isLoading) {
    return <div className="text-center py-8">Loading inquiries...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Customer Inquiries</h2>
        <p className="text-slate-500">View and manage customer contact form submissions</p>
      </div>

      <div className="grid gap-4">
        {inquiries?.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No inquiries found</p>
              <p className="text-slate-400 text-sm">Customer inquiries will appear here when submitted</p>
            </CardContent>
          </Card>
        ) : (
          inquiries?.map((inquiry: Inquiry) => (
            <Card key={inquiry.id} className="industrial-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{inquiry.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {inquiry.email}
                        </div>
                        {inquiry.company && (
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {inquiry.company}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      New
                    </Badge>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-700 mb-2">Message:</h4>
                  <p className="text-slate-600 whitespace-pre-wrap">{inquiry.message}</p>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <a 
                    href={`mailto:${inquiry.email}`}
                    className="text-[hsl(var(--fuji-blue))] hover:text-[hsl(var(--fuji-navy))] text-sm font-medium"
                  >
                    Reply via Email
                  </a>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}