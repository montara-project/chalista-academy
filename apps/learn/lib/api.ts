import { createApiClient } from '@chalista/api-client';
import type { Course, CourseSummary, LiveSession } from '@chalista/types';
import { findMockCourse, mockCourseSummary, MOCK_COURSES, MOCK_LIVE_SESSIONS } from './mock.ts';

/** URL API server. Server components membaca env saat render (fallback dev lokal). */
export const API_URL =
  (typeof process !== 'undefined' && process.env?.VITE_API_URL) || 'http://127.0.0.1:8787';

/** URL sandbox zoom-client untuk tombol Join Live Class. */
export const ZOOM_CLIENT_URL =
  (typeof process !== 'undefined' && process.env?.VITE_ZOOM_CLIENT_URL) || 'http://localhost:5173';

export const serverApi = createApiClient({ baseUrl: API_URL });

/** List kursus; fallback ke mock bila server belum jalan. */
export async function listCoursesSafe(): Promise<{ courses: CourseSummary[]; live: boolean }> {
  try {
    return { courses: await serverApi.courses.list(), live: true };
  } catch {
    return { courses: MOCK_COURSES.map(mockCourseSummary), live: false };
  }
}

/** Detail kursus by slug; null bila tidak ada. */
export async function getCourseSafe(
  slug: string,
): Promise<{ course: Course; live: boolean } | null> {
  try {
    return { course: await serverApi.courses.bySlug(slug), live: true };
  } catch {
    const mock = findMockCourse(slug);
    return mock ? { course: mock, live: false } : null;
  }
}

/** List sesi live (opsional per kursus); fallback ke mock bila server belum jalan. */
export async function listLiveSessionsSafe(
  courseId?: string,
): Promise<{ sessions: LiveSession[]; live: boolean }> {
  try {
    return { sessions: await serverApi.liveSessions.list(), live: true };
  } catch {
    return {
      sessions: courseId
        ? MOCK_LIVE_SESSIONS.filter((session) => session.courseId === courseId)
        : MOCK_LIVE_SESSIONS,
      live: false,
    };
  }
}
