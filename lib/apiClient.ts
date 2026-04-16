const Base_URL = process.env.VITE_API_URL;

export async function apiClient(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${Base_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}