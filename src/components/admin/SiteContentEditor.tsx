
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // Using Input instead of Textarea
import { toast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

// --- Type Definitions ---
interface SiteContentDto {
  email: string;
  phone: string;
}

interface SiteContent extends SiteContentDto {
  id: number; 
}

// --- API Functions ---
const fetchSiteContent = async (): Promise<SiteContent> => {
  const response = await fetch('https://tibyanacademy.runasp.net/api/SiteContents/GetSiteContent');
  if (!response.ok) {
    if (response.status === 404) {
      // If no content exists, return a default structure
      return { id: 0, email: '', phone: '' };
    }
    throw new Error('Failed to fetch site content.');
  }
  const data = await response.json();
  // The backend might return just the DTO, let's find the full content record if needed
  // For now, let's assume we can get an ID or we manage it client-side.
  // Based on the new controller, we might need to adjust this.
  // Let's assume the first record is the one to edit.
  const allContentsResponse = await fetch('https://tibyanacademy.runasp.net/api/SiteContents/GetAll');
  const allContents = await allContentsResponse.json();
  const latestContent = allContents.sort((a: any, b: any) => b.id - a.id)[0];
  return latestContent || { id: 0, email: '', phone: '' };
};

const updateSiteContent = async (content: SiteContent): Promise<any> => {
  const { id, ...dto } = content;
  const url = `https://tibyanacademy.runasp.net/api/SiteContents/UpdateSiteContent?id=${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!response.ok) {
    throw new Error('Failed to update site content.');
  }
  return response.json();
};

const createSiteContent = async (content: SiteContentDto): Promise<any> => {
  const url = 'https://tibyanacademy.runasp.net/api/SiteContents/CreateSiteContent';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  });
  if (!response.ok) {
    throw new Error('Failed to create site content.');
  }
  return response.json();
};


export const SiteContentEditor = () => {
  const queryClient = useQueryClient();
  const [contentId, setContentId] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Query to fetch initial data
  const { data: initialData, isLoading: isLoadingQuery, error } = useQuery<SiteContent, Error>({
    queryKey: ['siteContent'],
    queryFn: fetchSiteContent,
  });

  // Effect to set state once data is loaded
  useEffect(() => {
    if (initialData) {
      setContentId(initialData.id || null);
      setEmail(initialData.email || '');
      setPhone(initialData.phone || '');
    }
  }, [initialData]);

  // Mutation for updating or creating
  const mutation = useMutation({
    mutationFn: (currentContent: { email: string; phone: string }) => {
      if (contentId) {
        return updateSiteContent({ id: contentId, ...currentContent });
      } else {
        return createSiteContent(currentContent);
      }
    },
    onSuccess: () => {
      toast({ title: "تم حفظ التغييرات بنجاح!" });
      queryClient.invalidateQueries({ queryKey: ['siteContent'] }); // Refetch data after mutation
    },
    onError: (error: Error) => {
      toast({ title: "حدث خطأ", description: error.message, variant: "destructive" });
    },
  });

  const handleSaveChanges = () => {
    mutation.mutate({ email, phone });
  };

  if (isLoadingQuery) {
    return <div className="flex justify-center items-center p-8"><Loader2 className="w-8 h-8 animate-spin"/></div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">حدث خطأ أثناء تحميل البيانات: {error.message}</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>محرر محتوى الموقع</CardTitle>
        <CardDescription>تحديث معلومات التواصل الرئيسية في الموقع.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني للتواصل</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="example@domain.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">رقم الهاتف للتواصل</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+966123456789"
          />
        </div>
        <Button onClick={handleSaveChanges} disabled={mutation.isPending}>
          {mutation.isPending ? <><Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري الحفظ...</> : 'حفظ التغييرات'}
        </Button>
      </CardContent>
    </Card>
  );
};
