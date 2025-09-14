"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import api from "@/lib/utils"; // your axios instance

export interface User {
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor";
  gender: "male" | "female";
  createdAt: Date;
  updatedAt: Date;

  rating?: number;
  appointments?: Types.ObjectId[];
  field?: string;

  profilePicture?: string;
}

export interface Appointment {
  _id?: string;               // MongoDB _id
  doctor: User;             // doctor ObjectId as string
  patient: User;            // patient ObjectId as string
  dateTime: string;           // ISO string for Date
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appt: Appointment) => Promise<void>;
  refreshAppointments: () => Promise<void>;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export const AppointmentsProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load appointments from server
  const refreshAppointments = async () => {
    try {
      const res = await api.get("/api/appointments");
      setAppointments(res.data); // assuming backend returns an array
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    }
  };

  useEffect(() => {
    refreshAppointments();
  }, []);

  // Add new appointment
  const addAppointment = async (appt: Appointment) => {
    try {
      const res = await api.post("/api/appointments", appt);
      setAppointments((prev) => [...prev, res.data]); // assuming backend returns created appointment
    } catch (err) {
      console.error("Failed to add appointment:", err);
      throw err;
    }
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, refreshAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) throw new Error("useAppointments must be used within AppointmentsProvider");
  return context;
};
