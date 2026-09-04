import type { Course, CourseSummary, LiveSession } from '@chalista/types';

/** Data contoh dipakai saat API server belum berjalan, agar DX dev tetap enak. */
export const MOCK_COURSES: Course[] = [
  {
    id: 'crs_mock_1',
    slug: 'react-modern',
    title: 'React Modern dari Nol',
    description:
      'Bangun antarmuka web interaktif dengan React 19: komponen, state, hooks, sampai server components.',
    instructor: 'Raka Pratama',
    level: 'beginner',
    published: true,
    createdAt: '2026-08-01T00:00:00.000Z',
    modules: [
      {
        id: 'mod_mock_1',
        title: 'Pengenalan React',
        lessons: [
          { id: 'lsn_1', title: 'Apa itu React?', durationMinutes: 12 },
          { id: 'lsn_2', title: 'Komponen & Props', durationMinutes: 25 },
        ],
      },
      {
        id: 'mod_mock_2',
        title: 'State & Hooks',
        lessons: [
          { id: 'lsn_3', title: 'useState & useEffect', durationMinutes: 30 },
          { id: 'lsn_4', title: 'Custom Hooks', durationMinutes: 20 },
        ],
      },
    ],
  },
  {
    id: 'crs_mock_2',
    slug: 'data-analysis-python',
    title: 'Analisis Data dengan Python',
    description: 'Dari nol sampai mahir mengolah data: pandas, visualisasi, dan studi kasus nyata.',
    instructor: 'Dewi Anggraini',
    level: 'intermediate',
    published: true,
    createdAt: '2026-08-05T00:00:00.000Z',
    modules: [
      {
        id: 'mod_mock_3',
        title: 'Dasar Python untuk Data',
        lessons: [
          { id: 'lsn_5', title: 'NumPy 101', durationMinutes: 18 },
          { id: 'lsn_6', title: 'Pandas DataFrame', durationMinutes: 28 },
        ],
      },
    ],
  },
];

export const MOCK_LIVE_SESSIONS: LiveSession[] = [
  {
    id: 'liv_mock_1',
    courseId: 'crs_mock_1',
    title: 'Live Q&A: Memahami Hooks',
    startsAt: '2026-09-07T14:00:00.000Z',
    durationMinutes: 90,
    meetingNumber: '82345678901',
    passcode: 'chalista',
    status: 'scheduled',
  },
  {
    id: 'liv_mock_2',
    courseId: 'crs_mock_2',
    title: 'Live Mentoring: Studi Kasus Dataset Penjualan',
    startsAt: '2026-09-09T10:00:00.000Z',
    durationMinutes: 120,
    meetingNumber: '89876543210',
    passcode: 'python',
    status: 'scheduled',
  },
];

export function mockCourseSummary(course: Course): CourseSummary {
  const { modules: _modules, ...summary } = course;
  return summary;
}

export function findMockCourse(slug: string): Course | undefined {
  return MOCK_COURSES.find((course) => course.slug === slug);
}
