/**
 * Generator signature untuk Zoom Meeting SDK Web.
 * Format: base64url(header).base64url(payload).base64url(HMAC-SHA256)
 * https://developers.zoom.us/docs/meeting-sdk/web/signature/
 */

const encoder = new TextEncoder();

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

export interface ZoomSignatureInput {
  sdkKey: string;
  sdkSecret: string;
  meetingNumber: string;
  /** Unix epoch (detik) masa berlaku. */
  expirationSeconds: number;
  /** 1 = host, 0 = attendee. */
  role: 0 | 1;
}

export async function createMeetingSignature(input: ZoomSignatureInput): Promise<string> {
  const iat = Math.floor(Date.now() / 1000) - 30;
  const exp = iat + input.expirationSeconds;

  const header = base64UrlEncode(encoder.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
  const payload = base64UrlEncode(
    encoder.encode(
      JSON.stringify({
        appKey: input.sdkKey,
        iat,
        exp,
        tpc: input.meetingNumber,
        verb: 'meet',
        role: input.role,
      }),
    ),
  );

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(input.sdkSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`${header}.${payload}`));

  return `${header}.${payload}.${base64UrlEncode(new Uint8Array(signature))}`;
}
