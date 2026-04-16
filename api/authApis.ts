export const loginApi = async (
  username: FormDataEntryValue | null ,
  password: FormDataEntryValue | null ,
  role: FormDataEntryValue | null
) => {
  const response = await fetch(
    "http://localhost:8081/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  username, password, role }),
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to log-in: ${response.statusText}`)
  }

  return response.json()
}


export const signupApi = async (
  username: FormDataEntryValue ,
  password: FormDataEntryValue  ,
  role: String
) => {
  const response = await fetch(
    "http://localhost:8081/auth/create-user",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  username, password, role }),
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to Sign up new user: ${response.statusText}`)
  }

  return response.json()
}


