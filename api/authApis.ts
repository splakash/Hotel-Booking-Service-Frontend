
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const loginApi = async (
  username: FormDataEntryValue | null ,
  password: FormDataEntryValue | null ,
  role: FormDataEntryValue | null
) => {
  const response = await fetch(
    `${API_URL}/auth/login`,
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

export const getUser = async (token: string) => {
  const response = await fetch(`${API_URL}/auth/extract-userName`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("getUser failed — status:", response.status, "body:", errorBody);

    // ✅ Attach status to the error so callers can distinguish 401 vs 500
    const error: any = new Error(`Token validation failed: ${response.statusText}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export const signupApi = async (
  username: FormDataEntryValue ,
  password: FormDataEntryValue  ,
  role: String
) => {
  const response = await fetch(
    `${API_URL}/auth/create-user`,
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


function checkAuth() {
  throw new Error("Function not implemented.");
}

