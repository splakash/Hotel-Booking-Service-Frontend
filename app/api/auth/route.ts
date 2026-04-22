import { getUser } from "@/api/authApis";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ ok: false, user: null });
    }

    const user = await getUser(token);

    if (!user || !user.userName) {
      return Response.json({ ok: false, user: null });
    }

    return Response.json({ ok: true, user });

  } catch (error: any) {
    // ✅ 401 means expired/invalid token — treat as logged out, not a crash
    if (error.status === 401) {
      return Response.json({ ok: false, user: null });
    }

    console.error("Auth check failed:", error);
    return Response.json({ ok: false, user: null });
  }
}