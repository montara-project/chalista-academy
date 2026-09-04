import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { listCoursesSafe } from '@/lib/api';

const levelLabels: Record<string, string> = {
  beginner: 'Pemula',
  intermediate: 'Menengah',
  advanced: 'Lanjutan',
};

export default async function CoursesPage() {
  const { courses, live } = await listCoursesSafe();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Katalog Kursus</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {live
            ? `${courses.length} kursus tersedia.`
            : '⚠ Server API belum terjangkau — menampilkan data contoh.'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.slug}`} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-28 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-violet-100 text-3xl font-black text-indigo-600">
                  {course.title.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="group-hover:text-primary">{course.title}</CardTitle>
                  <Badge variant="secondary">{levelLabels[course.level] ?? course.level}</Badge>
                </div>
                <CardDescription>Instruktur {course.instructor}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
