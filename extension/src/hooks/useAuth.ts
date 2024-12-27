import { getCurrentUserData } from "@/lib/api";
import { storage } from "@/lib/storage";
import { IUser } from "@/types";
import { useEffect, useState } from "react";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    storage.get("token").then((savedToken) => {
      if (savedToken) {
        setToken(savedToken);
      }
    });
  }, []);

  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          const userData = await getCurrentUserData(token);
          setUser(userData);
        } catch (error) {
          console.error(error);
          handleLogout();
        }
      }
    }

    fetchUser();
  }, [token]);

  const handleLogin = async (newToken: string) => {
    await storage.set("token", newToken);
    setToken(newToken);
  };

  const handleLogout = async () => {
    await storage.remove("token");
    setToken(null);
    setUser(null);
  };
  return {
    token,
    user,
    handleLogin,
    handleLogout,
  };
}
