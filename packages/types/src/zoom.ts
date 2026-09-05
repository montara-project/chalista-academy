import { z } from 'zod'

/**
 * Zoom Meeting SDK: role "1" = host, "0" = attendee. Lihat
 * https://developers.zoom.us/docs/meeting-sdk/web/signature/
 */
export const ZoomSignatureRequestSchema = z.object({
  meetingNumber: z.string().regex(/^\d{9,11}$/),
  expirationSeconds: z.number().int().positive().default(3600),
  role: z.union([z.literal(0), z.literal(1)]).default(0),
})

export const ZoomSignatureResponseSchema = z.object({
  signature: z.string(),
  sdkKey: z.string(),
  meetingNumber: z.string(),
})

export type ZoomSignatureRequestDto = z.infer<typeof ZoomSignatureRequestSchema>
export type ZoomSignatureResponseDto = z.infer<typeof ZoomSignatureResponseSchema>
