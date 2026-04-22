"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginApi } from "@/api/authApis"
import { useAuth } from "@/authContext"




export async function loginAction(formData: FormData) {
  
  const username = formData.get("username")
  const password = formData.get("password")
  const role = formData.get("role")

  const data = await loginApi(username, password, role)
  
  

  // ✅ STORE JWT IN COOKIE (SERVER SIDE)
  cookies().set("token", data.token, {
    httpOnly: true,
    secure: true,
    path: "/",
  })
  
  // ✅ Redirect after login
  redirect("/")
}
