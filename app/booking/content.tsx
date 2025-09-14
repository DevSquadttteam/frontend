"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppointmentsProvider, useAppointments } from "../context/appointment-context";
import { useAuth } from "@/hooks/useAuth"; // assuming you have a user context

export default function BookingPage({ doctors }: { doctors: { _id: string; name: string }[] }) {
    const { addAppointment } = useAppointments();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        doctor: "",
        date: "",
        time: "",
        notes: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?._id) {
            alert("You must be logged in to book an appointment.");
            return;
        }

        const appointment = {
            doctor: formData.doctor,
            patient: user._id,
            dateTime: new Date(`${formData.date}T${formData.time}`).toDateString(),
            status: "pending" as const,
            notes: formData.notes || "",
        };

        try {
            await addAppointment(appointment);
            setSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
                setSubmitted(false);
                setFormData({ doctor: "", date: "", time: "", notes: "" });
            }, 2000);
        } catch (err) {
            console.error("Failed to book appointment", err);
            alert("❌ Failed to book appointment");
        }
    };

    return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-6">
                    🩺 Doktor qabuliga yoziling!
                </h1>

                <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    Yozilish
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 100 }}
                            >
                                <div className="hidden md:block md:w-1/2">
                                    <img
                                        src={"./doctor.png"}
                                        alt="Doctor"
                                        className="h-full w-full object-cover object-right"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 p-6 backdrop-blur-lg">
                                    <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">
                                        📝 Qabulga yozilish
                                    </h2>

                                    {submitted ? (
                                        <div className="text-green-600 font-semibold text-center animate-pulse">
                                            ✅ Yozilish muvaffaqiyatli yuborildi!
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block mb-1 font-medium">Doktor</label>
                                                <select
                                                    name="doctor"
                                                    value={formData.doctor}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                                >
                                                    <option value="">Doktorni tanlang</option>
                                                    {doctors.map((doc) => (
                                                        <option key={doc._id} value={doc._id}>
                                                            {doc.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <label className="block mb-1 font-medium">Sana</label>
                                                    <input
                                                        type="date"
                                                        name="date"
                                                        value={formData.date}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <label className="block mb-1 font-medium">Vaqt</label>
                                                    <input
                                                        type="time"
                                                        name="time"
                                                        value={formData.time}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block mb-1 font-medium">Qo'shimcha eslatma</label>
                                                <textarea
                                                    name="notes"
                                                    value={formData.notes}
                                                    onChange={handleChange}
                                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="mt-[10px] flex justify-between">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsOpen(false)}
                                                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                                                >
                                                    ❌ Bekor qilish
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                                >
                                                    ✅ Yozilish
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
    );
}
