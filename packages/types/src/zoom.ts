import { z } from 'zod';

/**
 * Zoom Meeting SDK: role "1" = host, "0" = attendee.
 * Lihat https://developers.zoom.us/docs/meeting-sdk/web/signature/
 */
export const zoomSignatureRequestSchema = z.object({
  meetingNumber: z.string().regex(/^\d{9,11}$/),
  /** Unix epoch (detik) saat signature kedaluwarsa. */
  expirationSeconds: z.number().int().positive().default(3600),
  role: z.union([z.literal(0), z.literal(1)]).default(0),
});
export type ZoomSignatureRequest = z.infer<typeof zoomSignatureRequestSchema>;

export const zoomSignatureResponseSchema = z.object({
  signature: z.string(),
  sdkKey: z.string(),
  meetingNumber: z.string(),
});
export type ZoomSignatureResponse = z.infer<typeof zoomSignatureResponseSchema>;
