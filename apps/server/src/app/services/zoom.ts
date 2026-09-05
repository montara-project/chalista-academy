/**
 * Generator signature untuk Zoom Meeting SDK Web. Format:
 * base64url(header).base64url(payload).base64url(HMAC-SHA256)
 * https://developers.zoom.us/docs/meeting-sdk/web/signature/
 */

import type { ZoomSignatureInput } from '../../types/zoom'

const encoder = new TextEncoder()

/**
 * Encode bytes to base64url string.
 *
 * @param bytes - The bytes to encode.
 * @returns The base64url encoded string.
 */
function base64UrlEncode(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

/**
 * Create a Zoom meeting signature.
 *
 * @param input - The input parameters for the signature.
 * @returns The base64url encoded signature.
 */
async function createMeetingSignature(input: ZoomSignatureInput): Promise<string> {
  const iat = Math.floor(Date.now() / 1000) - 30
  const exp = iat + input.expirationSeconds

  const header = base64UrlEncode(encoder.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })))
  const payload = base64UrlEncode(
    encoder.encode(
      JSON.stringify({
        appKey: input.sdkKey,
        iat,
        exp,
        tpc: input.meetingNumber,
        verb: 'meet',
        role: input.role,
      })
    )
  )

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(input.sdkSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`${header}.${payload}`))

  return `${header}.${payload}.${base64UrlEncode(new Uint8Array(signature))}`
}

export const zoomServices = {
  createMeetingSignature,
}
