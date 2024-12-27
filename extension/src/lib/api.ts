import { AuthResponse, IUser } from "@/types";

const API_URL = "http://localhost:8080";

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  return data;
}

export async function getCurrentUserData(token: string): Promise<IUser> {
  const response = await fetch(`${API_URL}/links/details`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}
