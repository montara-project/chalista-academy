import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCourseSafe, listLiveSessionsSafe } from '@/lib/api';

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(iso));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getCourseSafe(slug);

  if (!result) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Kursus tidak ditemukan</h1>
        <p className="text-muted-foreground">Kursus "{slug}" belum tersedia.</p>
        <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
          ← Kembali ke katalog
        </Link>
      </div>
    );
  }

  const { course, live } = result;
  const { sessions } = await listLiveSessionsSafe(course.id);
  const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);

  return (
    <div className="flex flex-col gap-8">
      <Link href="/courses" className="text-sm text-muted-foreground hover:text-foreground">
        ← Kembali ke katalog
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Badge className="w-fit capitalize">{course.level}</Badge>
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-muted-foreground">Instruktur: {course.instructor}</p>
            <p className="max-w-2xl leading-relaxed">{course.description}</p>
            <p className="text-xs text-muted-foreground">
              {course.modules.length} modul · {totalLessons} pelajaran
              {live ? '' : ' · data contoh (server API belum jalan)'}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold tracking-tight">Silabus</h2>
            {course.modules.map((module, index) => (
              <Card key={module.id}>
                <CardHeader>
                  <CardTitle className="text-base">
                    Modul {index + 1}: {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col divide-y text-sm">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex items-center justify-between py-2">
                        <span>{lesson.title}</span>
                        <span className="text-muted-foreground">{lesson.durationMinutes} mnt</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Ikut kelas ini</CardTitle>
              <CardDescription>Masuk lalu enroll — gratis selama MVP.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/login"
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Enroll Sekarang
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jadwal Live</CardTitle>
              <CardDescription>Sesi Zoom untuk kursus ini.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              {sessions.length === 0 ? (
                <p className="text-muted-foreground">Belum ada jadwal.</p>
              ) : (
                sessions.map((session) => (
                  <div key={session.id} className="rounded-lg border p-3">
                    <p className="font-medium">{session.title}</p>
                    <p className="mt-1 text-muted-foreground">
                      {formatDateTime(session.startsAt)} WIB · {session.durationMinutes} mnt
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
