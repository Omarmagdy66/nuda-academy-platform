
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Trash2, CheckCircle } from 'lucide-react';

// Define the shape of an Application
interface Application {
  id: number;
  name: string;
  age: number;
  phone: string;
  country: string;
  gender: 'male' | 'female';
  packageId: number;
  notes: string;
  status: string;
  createdAt: string;
}

// API function to fetch applications
const fetchApplications = async (): Promise<Application[]> => {
  const token = localStorage.getItem('token');
  const response = await fetch('https://tibyanacademy.runasp.net/api/Applications/GetApplications', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }
  return response.json();
};

// API function to update application status
const updateApplicationStatus = async (id: number) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://tibyanacademy.runasp.net/api/Applications/UpdateApplicationStatus?id=${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to update application status');
  }
  return response.text();
};

// API function to delete an application
const deleteApplication = async (id: number) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://tibyanacademy.runasp.net/api/Applications/DeleteApplication?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to delete application');
  }
  return response.text();
};

export const ApplicationsViewer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: applications, isLoading, error } = useQuery<Application[], Error>({
    queryKey: ['applications'],
    queryFn: fetchApplications,
  });

  const updateMutation = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({ title: 'Success', description: 'Application status updated.' });
    },
    onError: (err) => {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({ title: 'Success', description: 'Application deleted.' });
    },
    onError: (err) => {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  });

  if (isLoading) return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>طلبات التسجيل</CardTitle>
        <CardDescription>عرض وإدارة جميع طلبات التسجيل المقدمة.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">الاسم</TableHead>
              <TableHead className="text-right">العمر</TableHead>
              <TableHead className="text-right">الدولة</TableHead>
              <TableHead className="text-right">رقم الهاتف</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications && applications.length > 0 ? (
              applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="text-right">{app.name}</TableCell>
                  <TableCell className="text-right">{app.age}</TableCell>
                  <TableCell className="text-right">{app.country}</TableCell>
                  <TableCell className="text-right" dir="ltr">{app.phone}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={app.status === 'PENDING' ? 'destructive' : 'secondary'}>
                      {app.status === 'PENDING' ? 'قيد الانتظار' : 'تم التواصل'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      disabled={app.status === 'CONTACTED' || updateMutation.isPending}
                      onClick={() => updateMutation.mutate(app.id)}
                    >
                      <CheckCircle className="h-4 w-4 ml-2"/>
                      تم التواصل
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      disabled={deleteMutation.isPending}
                      onClick={() => deleteMutation.mutate(app.id)}
                    >
                      <Trash2 className="h-4 w-4 ml-2"/>
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">لا توجد طلبات تسجيل حالياً.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
