"use client";

import { useEffect, useState } from "react";
import { AppointmentsProvider } from "../context/appointment-context";
import Content from "./content";
import api from "@/lib/utils"; // your axios instance

interface User {
    _id: string;
    name: string;
    role: string;
}

export default function Page() {
    const [doctors, setDoctors] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await api.get("/api/users");
                const doctorsList = res.data.data.filter((u: User) => u.role === "doctor");
                setDoctors(doctorsList);
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);


    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <AppointmentsProvider>
            <Content doctors={doctors} />
        </AppointmentsProvider>
    );
}
