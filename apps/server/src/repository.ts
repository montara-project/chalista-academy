import type { Course, CourseSummary, Enrollment, LiveSession, User } from '@chalista/types';

export interface StoredUser extends User {
  password: string;
}

type NewCourse = Omit<Course, 'id' | 'createdAt'>;

function id(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replaceAll('-', '').slice(0, 12)}`;
}

function iso(daysFromNow: number, hour = 9): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setUTCHours(hour, 0, 0, 0);
  return date.toISOString();
}

/**
 * Store in-memory untuk MVP (PRD §4.2). Data hilang saat Workers restart —
 * interface ini sengaja dibuat mudah ditukar ke Cloudflare D1 nantinya.
 */
export class Repository {
  private users: StoredUser[] = [];
  private courses: Course[] = [];
  private enrollments: Enrollment[] = [];
  private liveSessions: LiveSession[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    this.users = [
      {
        id: id('usr'),
        name: 'Admin Chalista',
        email: 'admin@chalista.id',
        role: 'admin',
        password: 'admin12345',
      },
      {
        id: id('usr'),
        name: 'Sinta Siswa',
        email: 'siswa@chalista.id',
        role: 'student',
        password: 'siswa12345',
      },
    ];

    this.courses = [
      {
        id: id('crs'),
        slug: 'react-modern',
        title: 'React Modern dari Nol',
        description:
          'Bangun antarmuka web interaktif dengan React 19: komponen, state, hooks, sampai server components.',
        instructor: 'Raka Pratama',
        level: 'beginner',
        published: true,
        createdAt: iso(-30),
        modules: [
          {
            id: id('mod'),
            title: 'Pengenalan React',
            lessons: [
              { id: id('lsn'), title: 'Apa itu React?', durationMinutes: 12 },
              { id: id('lsn'), title: 'Komponen & Props', durationMinutes: 25 },
            ],
          },
          {
            id: id('mod'),
            title: 'State & Hooks',
            lessons: [
              { id: id('lsn'), title: 'useState & useEffect', durationMinutes: 30 },
              { id: id('lsn'), title: 'Custom Hooks', durationMinutes: 20 },
            ],
          },
        ],
      },
      {
        id: id('crs'),
        slug: 'data-analysis-python',
        title: 'Analisis Data dengan Python',
        description:
          'Dari nol sampai mahir mengolah data: pandas, visualisasi, dan studi kasus nyata.',
        instructor: 'Dewi Anggraini',
        level: 'intermediate',
        published: true,
        createdAt: iso(-20),
        modules: [
          {
            id: id('mod'),
            title: 'Dasar Python untuk Data',
            lessons: [
              { id: id('lsn'), title: 'NumPy 101', durationMinutes: 18 },
              { id: id('lsn'), title: 'Pandas DataFrame', durationMinutes: 28 },
            ],
          },
        ],
      },
    ];

    const reactCourse = this.courses[0];
    const pythonCourse = this.courses[1];
    if (reactCourse) {
      this.liveSessions.push({
        id: id('liv'),
        courseId: reactCourse.id,
        title: 'Live Q&A: Memahami Hooks',
        startsAt: iso(3, 14),
        durationMinutes: 90,
        meetingNumber: '82345678901',
        passcode: 'chalista',
        status: 'scheduled',
      });
    }
    if (pythonCourse) {
      this.liveSessions.push({
        id: id('liv'),
        courseId: pythonCourse.id,
        title: 'Live Mentoring: Studi Kasus Dataset Penjualan',
        startsAt: iso(5, 10),
        durationMinutes: 120,
        meetingNumber: '89876543210',
        passcode: 'python',
        status: 'scheduled',
      });
    }
  }

  // --- Users -----------------------------------------------------------------

  findUserByEmail(email: string): StoredUser | undefined {
    return this.users.find((user) => user.email === email);
  }

  findUserById(userId: string): StoredUser | undefined {
    return this.users.find((user) => user.id === userId);
  }

  // --- Courses ---------------------------------------------------------------

  listCourses(): CourseSummary[] {
    return this.courses
      .filter((course) => course.published)
      .map(({ modules: _modules, ...summary }) => summary);
  }

  findCourseBySlug(slug: string): Course | undefined {
    return this.courses.find((course) => course.slug === slug && course.published);
  }

  createCourse(data: NewCourse): Course {
    const course: Course = {
      ...data,
      modules: data.modules ?? [],
      id: id('crs'),
      createdAt: new Date().toISOString(),
    };
    this.courses.push(course);
    return course;
  }

  updateCourse(slug: string, patch: Partial<NewCourse>): Course | undefined {
    const course = this.courses.find((item) => item.slug === slug);
    if (!course) {
      return undefined;
    }
    Object.assign(course, patch);
    return course;
  }

  deleteCourse(slug: string): boolean {
    const before = this.courses.length;
    this.courses = this.courses.filter((item) => item.slug !== slug);
    return this.courses.length < before;
  }

  // --- Enrollments -----------------------------------------------------------

  listEnrollmentsByUser(userId: string): Enrollment[] {
    return this.enrollments.filter((item) => item.userId === userId);
  }

  createEnrollment(userId: string, courseId: string): Enrollment | 'exists' | 'course_not_found' {
    const course = this.courses.find((item) => item.id === courseId);
    if (!course) {
      return 'course_not_found';
    }
    const exists = this.enrollments.some(
      (item) => item.userId === userId && item.courseId === courseId,
    );
    if (exists) {
      return 'exists';
    }
    const enrollment: Enrollment = {
      id: id('enr'),
      userId,
      courseId,
      createdAt: new Date().toISOString(),
    };
    this.enrollments.push(enrollment);
    return enrollment;
  }

  // --- Live sessions -----------------------------------------------------------

  listLiveSessions(courseId?: string): LiveSession[] {
    return courseId
      ? this.liveSessions.filter((item) => item.courseId === courseId)
      : this.liveSessions;
  }

  findLiveSession(sessionId: string): LiveSession | undefined {
    return this.liveSessions.find((item) => item.id === sessionId);
  }

  createLiveSession(data: Omit<LiveSession, 'id' | 'status'>): LiveSession {
    const session: LiveSession = { ...data, id: id('liv'), status: 'scheduled' };
    this.liveSessions.push(session);
    return session;
  }

  updateLiveSession(
    sessionId: string,
    patch: Partial<Omit<LiveSession, 'id' | 'status'>>,
  ): LiveSession | undefined {
    const session = this.findLiveSession(sessionId);
    if (!session) {
      return undefined;
    }
    Object.assign(session, patch);
    return session;
  }

  deleteLiveSession(sessionId: string): boolean {
    const before = this.liveSessions.length;
    this.liveSessions = this.liveSessions.filter((item) => item.id !== sessionId);
    return this.liveSessions.length < before;
  }
}

/** Singleton per isolate Workers — di-backup oleh module-level state. */
export const repository = new Repository();
