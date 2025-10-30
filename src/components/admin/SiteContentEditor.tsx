
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const API_BASE_URL = "https://tibyanacademy.runasp.net";

interface SiteContent {
  [key: string]: string;
}

export const SiteContentEditor = () => {
  const [content, setContent] = useState<SiteContent>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/sitecontent`);
        setContent(response.data);
      } catch (error) {
        toast({ title: "فشل جلب محتوى الموقع", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    setIsLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/api/sitecontent`, content, config);
      toast({ title: "تم حفظ التغييرات بنجاح" });
    } catch (error) {
      toast({ title: "فشل حفظ التغييرات", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle>إدارة محتوى الموقع</CardTitle>
        <CardDescription>تعديل النصوص الرئيسية التي تظهر في صفحات الموقع المختلفة.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && !Object.keys(content).length ? (
          <p>جاري تحميل المحتوى...</p>
        ) : (
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="about_us_headline">عنوان صفحة "من نحن"</Label>
              <Textarea id="about_us_headline" value={content.about_us_headline || ''} onChange={e => handleContentChange('about_us_headline', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="our_mission_text">نص "رسالتنا"</Label>
              <Textarea id="our_mission_text" value={content.our_mission_text || ''} onChange={e => handleContentChange('our_mission_text', e.target.value)} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="our_vision_text">نص "رؤيتنا"</Label>
              <Textarea id="our_vision_text" value={content.our_vision_text || ''} onChange={e => handleContentChange('our_vision_text', e.target.value)} rows={4} />
            </div>
            {/* Add other editable fields as needed */}
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
