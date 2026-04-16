"use server"

import { redirect } from "next/navigation"
import { signupApi } from "@/api/authApis"


export async function signupAction(formData: FormData) {
  const username = formData.get("email")?.toString() || ""
  const password = formData.get("password")?.toString() || ""
  const role = 'USER'

  


  const data = await signupApi(username, password, role)
  
  // ✅ Redirect after successfull creation of account
  
  redirect("/login")
}