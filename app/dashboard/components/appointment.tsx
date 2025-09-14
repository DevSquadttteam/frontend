"use client";
import React from "react";
import { useAppointments } from "../../context/appointment-context";

export default function AppointmentDashboard() {
  const { appointments } = useAppointments(); // contextdan olish

  return (
    <div className="flex min-h-screen bg-blue-900 text-gray-900">
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded border border-gray-300"
          />
        </div>

        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-gray-500">Hozircha yozilishlar mavjud emas.</p>
          ) : (
            appointments.map((appt) => (
              <div
                key={`${appt._id}`} // noyob key
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {appt.patient.name}
                  </div>
                  <div>
                    <p className="font-semibold">{appt.status}</p>
                    <p className="text-gray-500">{appt.patient.name}</p>
                    <p className="text-gray-400 text-sm">{appt.dateTime}</p>
                  </div>
                </div>
                <div className="text-gray-400 cursor-pointer">⋮</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}