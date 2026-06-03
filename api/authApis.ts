const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const loginApi = async (
  username: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
  role: FormDataEntryValue | null
) => {

  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Login Failed");
  }

  return response.json();
};

export const getUser = async (cookieHeader: string) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookieHeader,   // forward the browser cookie to the backend
    },
  });

  if (!response.ok) {
    const error: any = new Error(`Auth check failed: ${response.statusText}`);
    error.status = response.status;
    throw error;
  }

  return response.json();  // returns { username, role }
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

