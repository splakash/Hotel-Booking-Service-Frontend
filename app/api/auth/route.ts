
import { cookies } from "next/headers";
import { getUser } from "@/api/authApis";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get("jwt"); 
    

    if (!jwtCookie) {
      return Response.json({ ok: false, user: null });
    }

    // Build the Cookie header string to forward to Spring Boot
    const cookieHeader = `jwt=${jwtCookie.value}`;
    const user = await getUser(cookieHeader);

    if (!user || !user.username) {
      return Response.json({ ok: false, user: null });
    }

    return Response.json({ ok: true, user });

  } catch (error: any) {
    if (error.status === 401) {
      return Response.json({ ok: false, user: null });
    }
    console.error("Auth check error:", error);
    return Response.json({ ok: false, user: null });
  }
}