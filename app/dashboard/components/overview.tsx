"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// 1. Kasallar soni (kunlik)
const patientsData = [
  { day: "Dush", patients: 20 },
  { day: "Sesh", patients: 35 },
  { day: "Chor", patients: 50 },
  { day: "Pay", patients: 40 },
  { day: "Jum", patients: 30 },
  { day: "Shan", patients: 45 },
  { day: "Yak", patients: 25 },
];

// 2. Doktorlar bo‘sh/band vaqtlari
const doctorsData = [
  { time: "09:00", busy: 6, free: 4 },
  { time: "12:00", busy: 8, free: 2 },
  { time: "15:00", busy: 5, free: 5 },
  { time: "18:00", busy: 7, free: 3 },
];

// 3. Qo‘shimcha – tashxislar ulushi
const diagnosisData = [
  { name: "Gripp", value: 40 },
  { name: "Bosim", value: 25 },
  { name: "Diabet", value: 20 },
  { name: "Boshqalar", value: 15 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Overview() {
  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 space-y-8">
      <h2 className="text-4xl font-bold">📊 Overview</h2>

      <div className="flex w-full justify-between">
        {/* 1. Kasallar soni */}
          <div className="w-[800px] bg-white p-6 rounded-lg shadow-lg h-[400px]">
            <h3 className="text-xl font-semibold mb-4">Kunlik kasallar soni</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patientsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#2563eb"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 2. Doktorlar band/bo‘sh vaqti */}
          <div className="w-[800px] bg-white p-6 rounded-lg shadow-lg h-[400px]">
            <h3 className="text-xl font-semibold mb-4">
              Doktorlar band va bo‘sh vaqtlar
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doctorsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="busy" fill="#ef4444" name="Band" />
                <Bar dataKey="free" fill="#22c55e" name="Bo‘sh" />
              </BarChart>
            </ResponsiveContainer>
          </div>
      </div>

      {/* 3. Qo‘shimcha (tashxis ulushi) */}
      <div className="bg-white p-6 rounded-lg shadow-lg h-[400px] flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-4">
          Tashxislar ulushi (foizda)
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={diagnosisData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {diagnosisData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}