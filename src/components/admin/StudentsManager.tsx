
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Student {
  id: number;
  name: string;
  email: string;
  package: string;
  status: 'active' | 'inactive';
}

// Mock Data
const initialStudents: Student[] = [
  { id: 1, name: 'أحمد خالد', email: 'ahmad@example.com', package: 'الباقة الذهبية', status: 'active' },
  { id: 2, name: 'سارة عبدالله', email: 'sarah@example.com', package: 'الباقة الفضية', status: 'active' },
  { id: 3, name: 'عمر ياسر', email: 'omar@example.com', package: 'الباقة الماسية', status: 'inactive' },
];

export const StudentsManager = () => {
  const [students] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة الطلاب</CardTitle>
        <Input
          type="text"
          placeholder="ابحث بالاسم أو البريد الإلكتروني..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mt-4"
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>الباقة</TableHead>
              <TableHead>الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map(student => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.package}</TableCell>
                <TableCell>
                  <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                    {student.status === 'active' ? 'نشط' : 'غير نشط'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
