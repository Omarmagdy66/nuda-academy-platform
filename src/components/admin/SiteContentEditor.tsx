
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

// --- Type Definitions ---
interface SiteContentDto {
  email: string;
  phone: string;
  password?: string; 
}

interface SiteContent extends SiteContentDto {
  id: number;
}

// --- API Functions ---

const getAuthToken = (): string | null => {
    return localStorage.getItem('token'); 
};

const safeResponseJson = async (response: Response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse JSON:", text, e);
    return null;
  }
};

const fetchAdminSiteContent = async (): Promise<SiteContent> => {
    const token = getAuthToken();
    if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
    }

    const response = await fetch('https://tibyanacademy.runasp.net/api/SiteContents/GetSiteContentForAdmin', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 404) {
        return { id: 0, email: '', phone: '', password: '' };
    }

    if (!response.ok) {
        const errorBody = await response.text();
        const errorMessage = `Request failed with status: ${response.status}. Message: ${errorBody || 'No additional error message provided.'}`;
        throw new Error(errorMessage);
    }

    const data = await safeResponseJson(response);
    return data || { id: 0, email: '', phone: '', password: '' };
};

const updateSiteContent = async (content: SiteContent): Promise<any> => {
    const token = getAuthToken();
    if (!token) throw new Error('Authentication token not found.');

    const { id, ...dto } = content;
    const url = `https://tibyanacademy.runasp.net/api/SiteContents/UpdateSiteContent?id=${id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to update site content. Status: ${response.status}. Body: ${errorBody}`);
    }
    return await safeResponseJson(response);
};

const createSiteContent = async (content: SiteContentDto): Promise<any> => {
    const token = getAuthToken();
    if (!token) throw new Error('Authentication token not found.');

    const url = 'https://tibyanacademy.runasp.net/api/SiteContents/CreateSiteContent';
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(content),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to create site content. Status: ${response.status}. Body: ${errorBody}`);
    }
    return await safeResponseJson(response);
};

export const SiteContentEditor = () => {
    const queryClient = useQueryClient();
    const [contentId, setContentId] = useState<number | null>(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const unifiedQueryKey = ['siteContent'];

    const { data: initialData, isLoading: isLoadingQuery, error } = useQuery<SiteContent, Error>({
        queryKey: unifiedQueryKey,
        queryFn: fetchAdminSiteContent,
    });

    useEffect(() => {
        if (initialData) {
            setContentId(initialData.id || null);
            setEmail(initialData.email || '');
            setPhone(initialData.phone || '');
        }
    }, [initialData]);

    const mutation = useMutation({
        mutationFn: (currentContent: SiteContentDto) => {
            if (contentId) {
                return updateSiteContent({ id: contentId, ...currentContent });
            } else {
                return createSiteContent(currentContent);
            }
        },
        onSuccess: (data) => {
            toast({ title: "تم حفظ التغييرات بنجاح!" });
            if (data && data.id && !contentId) {
                setContentId(data.id);
            }
            queryClient.invalidateQueries({ queryKey: unifiedQueryKey });
            setPassword('');
        },
        onError: (error: Error) => {
            toast({ title: "حدث خطأ", description: error.message, variant: "destructive" });
        },
    });

    const handleSaveChanges = () => {
        const payload: SiteContentDto = { 
            email, 
            phone, 
            password 
        };

        if (!contentId && !password) {
            toast({ 
                title: "خطأ", 
                description: "كلمة المرور مطلوبة عند إنشاء المحتوى لأول مرة.", 
                variant: "destructive" 
            });
            return;
        }

        mutation.mutate(payload);
    };

    if (isLoadingQuery) {
        return <div className="flex justify-center items-center p-8"><Loader2 className="w-8 h-8 animate-spin"/></div>;
    }

    if (error) {
        return <div className="text-red-500 p-8">
            <h3 className="font-bold text-lg mb-2">حدث خطأ أثناء تحميل البيانات:</h3>
            <pre className="bg-gray-100 p-2 rounded-md text-sm whitespace-pre-wrap"><code>{error.message}</code></pre>
        </div>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>محرر محتوى الموقع</CardTitle>
                <CardDescription>تحديث معلومات التواصل الرئيسية وكلمة المرور في الموقع.</CardDescription>
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
                <div className="space-y-2">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={contentId ? "اتركها فارغة لعدم التغيير" : "كلمة مرور جديدة"}
                    />
                </div>
                <Button onClick={handleSaveChanges} disabled={mutation.isPending}>
                    {mutation.isPending ? <><Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري الحفظ...</> : 'حفظ التغييرات'}
                </Button>
            </CardContent>
        </Card>
    );
};
