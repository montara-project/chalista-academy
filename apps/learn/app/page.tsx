import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { listCoursesSafe, listLiveSessionsSafe } from '@/lib/api';

export default async function LandingPage() {
  const [{ courses, live: coursesLive }, { sessions }] = await Promise.all([
    listCoursesSafe(),
    listLiveSessionsSafe(),
  ]);

  const upcoming = [...sessions]
    .filter((session) => session.status === 'scheduled')
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col items-start gap-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 px-8 py-16 text-white sm:px-12">
        <Badge className="bg-white/15 text-white hover:bg-white/15">Kelas live via Zoom</Badge>
        <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
          Belajar mandiri, tanya langsung di kelas live.
        </h1>
        <p className="max-w-xl text-lg text-indigo-100">
          ChalistA menggabungkan kursus online terstruktur dengan sesi live Zoom bareng instruktur —
          semua dalam satu tempat.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/courses"
            className={buttonVariants({
              size: 'lg',
              className: 'bg-white text-indigo-700 hover:bg-indigo-50',
            })}
          >
            Jelajahi Katalog
          </Link>
          <Link
            href="/login"
            className={buttonVariants({
              size: 'lg',
              className: 'border border-white/40 bg-transparent text-white hover:bg-white/10',
            })}
          >
            Masuk
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Kursus Unggulan</h2>
            <p className="text-sm text-muted-foreground">
              {coursesLive
                ? 'Data langsung dari server ChalistA.'
                : '⚠ Server API belum terjangkau — menampilkan data contoh.'}
            </p>
          </div>
          <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
            Lihat semua →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`} className="group">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-violet-100 text-3xl font-black text-indigo-600">
                    {course.title.slice(0, 2).toUpperCase()}
                  </div>
                  <CardTitle className="group-hover:text-primary">{course.title}</CardTitle>
                  <CardDescription>
                    {course.instructor} · {course.level}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Kelas Live Mendatang</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada jadwal live.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {upcoming.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <CardDescription>
                    {new Intl.DateTimeFormat('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      timeZone: 'Asia/Jakarta',
                    }).format(new Date(session.startsAt))}{' '}
                    WIB
                  </CardDescription>
                  <CardTitle>{session.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Zoom</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
