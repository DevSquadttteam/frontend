import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_URL
    : "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

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