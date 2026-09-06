import type {
  CourseDto,
  CourseSummaryDto,
  CreateCourseRequestDto,
  CreateEnrollmentRequestDto,
  CreateLiveSessionRequestDto,
  EnrollmentFormDto,
  LiveSessionFormDto,
  SignInRequestDto,
  SignInResponseDto,
  UpdateCourseRequestDto,
  UpdateLiveSessionRequestDto,
  UserFormDto,
  ZoomSignatureRequestDto,
  ZoomSignatureResponseDto,
} from '@chalista/types'

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly payload: unknown,
    message = `Permintaan API gagal dengan status ${status}`
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export interface ApiClientOptions {
  /** Base URL server, contoh: http://127.0.0.1:8787 */
  baseUrl: string
  /** Mengembalikan JWT untuk header Authorization (boleh null saat anonim). */
  getToken?: () => string | null | undefined
  fetchImpl?: typeof fetch
}

export interface ApiClient {
  health(): Promise<{ status: string }>
  auth: {
    login(body: SignInRequestDto): Promise<SignInResponseDto>
    me(): Promise<UserFormDto>
  }
  courses: {
    list(): Promise<CourseSummaryDto[]>
    bySlug(slug: string): Promise<CourseDto>
    create(body: CreateCourseRequestDto): Promise<CourseDto>
    update(slug: string, body: UpdateCourseRequestDto): Promise<CourseDto>
    remove(slug: string): Promise<void>
  }
  enrollments: {
    list(): Promise<EnrollmentFormDto[]>
    create(body: CreateEnrollmentRequestDto): Promise<EnrollmentFormDto>
  }
  liveSessions: {
    list(): Promise<LiveSessionFormDto[]>
    byCourse(courseId: string): Promise<LiveSessionFormDto[]>
    create(body: CreateLiveSessionRequestDto): Promise<LiveSessionFormDto>
    update(id: string, body: UpdateLiveSessionRequestDto): Promise<LiveSessionFormDto>
    remove(id: string): Promise<void>
  }
  zoom: {
    signature(body: ZoomSignatureRequestDto): Promise<ZoomSignatureResponseDto>
  }
}

export function createApiClient(options: ApiClientOptions): ApiClient {
  const baseUrl = options.baseUrl.replace(/\/+$/, '')
  const doFetch = options.fetchImpl ?? globalThis.fetch
  const getToken = options.getToken

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers)
    if (init?.body !== undefined && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
    const token = getToken?.()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    const response = await doFetch(`${baseUrl}${path}`, {
      ...init,
      headers,
    })

    if (!response.ok) {
      let payload: unknown = null
      try {
        payload = await response.json()
      } catch {
        payload = null
      }
      throw new ApiError(response.status, payload)
    }

    if (response.status === 204) {
      return undefined as T
    }
    return (await response.json()) as T
  }

  function jsonBody(body: unknown): RequestInit {
    return { method: 'POST', body: JSON.stringify(body) }
  }

  return {
    health: () => request('/api/health'),
    auth: {
      login: (body) => request('/api/auth/login', jsonBody(body)),
      me: () => request('/api/auth/me'),
    },
    courses: {
      list: () => request('/api/courses'),
      bySlug: (slug) => request(`/api/courses/${encodeURIComponent(slug)}`),
      create: (body) => request('/api/courses', jsonBody(body)),
      update: (slug, body) =>
        request(`/api/courses/${encodeURIComponent(slug)}`, {
          method: 'PATCH',
          body: JSON.stringify(body),
        }),
      remove: (slug) => request(`/api/courses/${encodeURIComponent(slug)}`, { method: 'DELETE' }),
    },
    enrollments: {
      list: () => request('/api/enrollments'),
      create: (body) => request('/api/enrollments', jsonBody(body)),
    },
    liveSessions: {
      list: () => request('/api/live-sessions'),
      byCourse: (courseId) =>
        request(`/api/live-sessions?courseId=${encodeURIComponent(courseId)}`),
      create: (body) => request('/api/live-sessions', jsonBody(body)),
      update: (id, body) =>
        request(`/api/live-sessions/${encodeURIComponent(id)}`, {
          method: 'PATCH',
          body: JSON.stringify(body),
        }),
      remove: (id) => request(`/api/live-sessions/${encodeURIComponent(id)}`, { method: 'DELETE' }),
    },
    zoom: {
      signature: (body) => request('/api/zoom/signature', jsonBody(body)),
    },
  }
}
