export interface ZoomSignatureInput {
  sdkKey: string
  sdkSecret: string
  meetingNumber: string

  /** Unix epoch (seconds) expiration time. */
  expirationSeconds: number

  /** 1 = host, 0 = attendee. */
  role: 0 | 1
}
