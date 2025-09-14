import api from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "patient" | "doctor";
  gender: "male" | "female";
  profilePicture?: string;
  field?: string;
  rating?: number;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const loadUser = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const res = await api.get("/api/auth/me");
      setState({ user: res.data.data, loading: false, error: null });
    } catch (err: any) {
      setState({ user: null, loading: false, error: err.response?.data?.message || err.message });
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      await loadUser();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ user: null, loading: false, error: null });
  };

  return {
    ...state,
    login,
    logout,
    refresh: loadUser,
  };
};