"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const username = formData.get("username")
  const password = formData.get("password")
  const role = formData.get("role")

  const res = await fetch("https://hotel-booking-service-rgs2.onrender.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
  })

  if (!res.ok) {
    throw new Error("Invalid username or password")
  }

  const data = await res.json()

  // ✅ STORE JWT IN COOKIE (SERVER SIDE)
  cookies().set("token", data.token, {
    httpOnly: true,
    secure: true,
    path: "/",
  })

  // ✅ Redirect after login
  redirect("/")
}
