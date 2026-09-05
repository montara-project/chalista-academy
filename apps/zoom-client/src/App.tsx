import { createApiClient } from '@chalista/api-client'
import type { ZoomSignatureResponse } from '@chalista/types'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from '@chalista/ui'
import { ZoomMtg } from '@zoom/meetingsdk'
import { useCallback, useEffect, useState, type FormEvent } from 'react'

type MeetingView = 'client' | 'component'

const TOKEN_KEY = 'chalista_token'

function api() {
  return createApiClient({
    baseUrl: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8787',
    getToken: () => localStorage.getItem(TOKEN_KEY),
  })
}

function initialParam(name: string): string {
  return new URLSearchParams(window.location.search).get(name) ?? ''
}

export function App() {
  const [meetingNumber, setMeetingNumber] = useState(initialParam('meetingNumber'))
  const [passcode, setPasscode] = useState(initialParam('passcode'))
  const [userName, setUserName] = useState(initialParam('name') || 'Sandbox User')
  const [role, setRole] = useState<0 | 1>(0)
  const [view, setView] = useState<MeetingView>('client')

  const [email, setEmail] = useState('siswa@chalista.id')
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)

  const [joining, setJoining] = useState(false)
  const [signature, setSignature] = useState<ZoomSignatureResponse | null>(null)
  const [logs, setLogs] = useState<string[]>([])

  const log = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString('id-ID')
    setLogs((previous) => [...previous, `[${timestamp}] ${message}`])
  }, [])

  useEffect(() => {
    setAuthed(Boolean(localStorage.getItem(TOKEN_KEY)))
  }, [])

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    try {
      const response = await api().auth.login({ email, password })
      localStorage.setItem(TOKEN_KEY, response.token)
      setAuthed(true)
      log(`Login berhasil sebagai ${response.user.name}`)
    } catch {
      log('Login gagal — periksa kredensial / server API.')
    }
  }

  async function handleJoin() {
    setJoining(true)
    setSignature(null)
    try {
      log(`Meminta signature untuk meeting ${meetingNumber} (role ${role})…`)
      const response = await api().zoom.signature({
        meetingNumber: meetingNumber.replaceAll(/\s+/g, ''),
        role,
        expirationSeconds: 3600,
      })
      setSignature(response)
      log('Signature diterima dari server. Menyiapkan SDK…')
      joinMeeting(response)
    } catch (error) {
      const message =
        (error as { status?: number }).status === 503
          ? 'Kredensial Zoom belum disetel di server (ZOOM_SDK_KEY / ZOOM_SDK_SECRET).'
          : (error as { status?: number }).status === 401
            ? 'Sesi tidak valid — login dulu di bagian autentikasi.'
            : 'Gagal meminta signature dari server API.'
      log(message)
    } finally {
      setJoining(false)
    }
  }

  function joinMeeting(data: ZoomSignatureResponse) {
    const meetingContainer = document.getElementById('meetingSDKElement')

    ZoomMtg.preLoadWasm()
    ZoomMtg.prepareWebSDK()

    ZoomMtg.init({
      leaveUrl: window.location.href,
      zoomRoot: view === 'component' ? (meetingContainer ?? undefined) : undefined,
      success: () => {
        log(`SDK siap. Bergabung ke ${data.meetingNumber} (view: ${view})…`)
        ZoomMtg.joinMeeting({
          signature: data.signature,
          sdkKey: data.sdkKey,
          meetingNumber: data.meetingNumber,
          passcode,
          userName,
          role,
          success: () => log('joinMeeting sukses — meeting terbuka.'),
          error: (joinError: unknown) => log(`joinMeeting error: ${JSON.stringify(joinError)}`),
        })
      },
      error: (initError: unknown) => log(`init error: ${JSON.stringify(initError)}`),
    })
  }

  const inputClass =
    'flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-100'

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-6 px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Zoom Meeting SDK Sandbox</h1>
          <p className="text-sm text-zinc-500">
            Testbed integrasi Zoom untuk ChalistA Academy — signature diambil dari{' '}
            <code>apps/server</code>.
          </p>
        </div>
        <Badge variant={authed ? 'success' : 'secondary'}>
          {authed ? 'Token siap' : 'Belum login'}
        </Badge>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>1. Autentikasi</CardTitle>
            <CardDescription>
              Endpoint signature butuh JWT. Akun demo: siswa@chalista.id / siswa12345.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                required
              />
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
                minLength={8}
              />
              <Button type="submit" variant="outline">
                {authed ? 'Login ulang' : 'Login & simpan token'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Detail Meeting</CardTitle>
            <CardDescription>
              Bisa terisi otomatis dari query string (?meetingNumber=&passcode=&name=).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-xs font-medium">
                Meeting Number
                <Input
                  value={meetingNumber}
                  onChange={(event) => setMeetingNumber(event.target.value)}
                  placeholder="82345678901"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium">
                Passcode
                <Input
                  value={passcode}
                  onChange={(event) => setPasscode(event.target.value)}
                  placeholder="chalista"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium">
                Nama
                <Input value={userName} onChange={(event) => setUserName(event.target.value)} />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium">
                Role
                <select
                  value={role}
                  onChange={(event) => setRole(Number(event.target.value) as 0 | 1)}
                  className={inputClass}
                >
                  <option value={0}>Attendee (0)</option>
                  <option value={1}>Host (1)</option>
                </select>
              </label>
            </div>
            <div className="flex gap-2 text-xs font-medium">
              {(['client', 'component'] as const).map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setView(option)}
                  className={`rounded-md border px-3 py-1.5 transition-colors ${
                    view === option
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  {option === 'client' ? 'Client View (fullscreen)' : 'Component View (embed)'}
                </button>
              ))}
            </div>
            <Button onClick={handleJoin} disabled={joining || !meetingNumber || !passcode}>
              {joining ? 'Menghubungkan…' : 'Join Meeting'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log</CardTitle>
          <CardDescription>Status join/leave/error untuk debugging.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="max-h-48 overflow-auto rounded-lg bg-zinc-950 p-3 text-xs leading-5 text-zinc-100">
            {logs.length === 0 ? 'Belum ada aktivitas.' : logs.join('\n')}
          </pre>
        </CardContent>
      </Card>

      {/* Client View merender fullscreen; Component View merender di elemen ini. */}
      <div id="meetingSDKElement" className={view === 'component' ? 'min-h-96' : 'hidden'} />
    </div>
  )
}
