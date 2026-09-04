'use client';

import { useEffect, useState } from 'react';
import type { CourseSummary, LiveSession } from '@chalista/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { browserApi, clearSession, getStoredUser, zoomClientUrl } from '@/lib/browser-api';

interface MyLearningData {
  courses: Map<string, CourseSummary>;
  enrollments: { id: string; courseId: string }[];
  sessions: LiveSession[];
}

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(iso));
}

export default function MyLearningPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [data, setData] = useState<MyLearningData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredUser();
    setUser(stored);
    if (!stored) {
      return;
    }

    const api = browserApi();
    Promise.all([api.enrollments.list(), api.courses.list(), api.liveSessions.list()])
      .then(([enrollments, courses, sessions]) => {
        const courseMap = new Map<string, CourseSummary>(
          courses.map((course: CourseSummary) => [course.id, course]),
        );
        setData({ courses: courseMap, enrollments, sessions });
      })
      .catch(() => {
        setError('Tidak bisa memuat data. Pastikan apps/server berjalan dan coba muat ulang.');
      });
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Masuk dulu, ya</h1>
        <p className="text-muted-foreground">
          Halaman My Learning menampilkan kursus dan jadwal live milikmu.
        </p>
        <Button onClick={() => (window.location.href = '/login')}>Masuk</Button>
      </div>
    );
  }

  const upcoming = (data?.sessions ?? [])
    .filter(
      (session) =>
        session.status === 'scheduled' &&
        data?.enrollments.some((enrollment) => enrollment.courseId === session.courseId),
    )
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Halo, {user.name} 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Lanjutkan belajarmu atau ikuti kelas live berikutnya.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            clearSession();
            window.location.href = '/';
          }}
        >
          Keluar
        </Button>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold tracking-tight">Kelas Live Mendatang</h2>
        {!data ? (
          <p className="text-sm text-muted-foreground">Memuat…</p>
        ) : upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Tidak ada sesi live mendatang untuk kursus yang kamu ikuti.
          </p>
        ) : (
          upcoming.map((session) => {
            const course = data.courses.get(session.courseId);
            const joinUrl = `${zoomClientUrl()}/?meetingNumber=${encodeURIComponent(
              session.meetingNumber,
            )}&passcode=${encodeURIComponent(session.passcode)}&name=${encodeURIComponent(user.name)}`;
            return (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <CardDescription>
                        {course?.title ?? 'Kursus'} · {formatDateTime(session.startsAt)} WIB ·{' '}
                        {session.durationMinutes} mnt
                      </CardDescription>
                      <CardTitle className="mt-1">{session.title}</CardTitle>
                    </div>
                    <Button onClick={() => (window.location.href = joinUrl)}>
                      Join Live Class
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            );
          })
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold tracking-tight">Kursusku</h2>
        {!data ? (
          <p className="text-sm text-muted-foreground">Memuat…</p>
        ) : data.enrollments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Kamu belum enroll kursus apa pun.{' '}
            <a href="/courses" className="text-primary hover:underline">
              Lihat katalog →
            </a>
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.enrollments.map((enrollment) => {
              const course: CourseSummary | undefined = data.courses.get(enrollment.courseId);
              if (!course) {
                return null;
              }
              return (
                <Card key={enrollment.id}>
                  <CardHeader>
                    <div className="mb-2 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-violet-100 text-3xl font-black text-indigo-600">
                      {course.title.slice(0, 2).toUpperCase()}
                    </div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>Instruktur {course.instructor}</CardDescription>
                    <Badge variant="secondary" className="mt-2 w-fit">
                      Terdaftar
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={`/courses/${course.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Buka kursus →
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
