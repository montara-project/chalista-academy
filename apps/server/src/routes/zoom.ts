import { zoomSignatureRequestSchema } from "@chalista/types";
import { Hono } from "hono";
import type { AppEnv } from "../env.ts";
import { parseJsonBody } from "../lib/parse.ts";
import { createMeetingSignature } from "../lib/zoom-signature.ts";
import { requireAuth } from "../middleware/auth.ts";

export const zoomRoutes = new Hono<AppEnv>()
  .use("*", requireAuth)
  .post("/signature", async (c) => {
    const parsed = await parseJsonBody(c, zoomSignatureRequestSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const { ZOOM_SDK_KEY, ZOOM_SDK_SECRET } = c.env;
    if (!ZOOM_SDK_KEY || !ZOOM_SDK_SECRET) {
      return c.json(
        {
          error: "zoom_credentials_missing",
          message:
            "Kredensial Zoom Meeting SDK belum disetel. Isi ZOOM_SDK_KEY dan ZOOM_SDK_SECRET di .env.",
        },
        503,
      );
    }

    const meetingNumber = parsed.data.meetingNumber.replaceAll(/\s+/g, "");
    const signature = await createMeetingSignature({
      sdkKey: ZOOM_SDK_KEY,
      sdkSecret: ZOOM_SDK_SECRET,
      meetingNumber,
      expirationSeconds: parsed.data.expirationSeconds,
      role: parsed.data.role,
    });

    return c.json({
      signature,
      sdkKey: ZOOM_SDK_KEY,
      meetingNumber,
    });
  });
