"use client";
import React, { useState } from "react";
import BookingPage from "../booking/page";
import Overview from "./components/overview";
import Appointmetn from './components/appointment';
import Users from './components/users';
import Setting from './components/settings';
import { AppointmentsProvider } from "../context/appointment-context";

const Logout = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-700">🚪 Logout</h2>
    <p className="text-gray-600 mb-4">Are you sure you want to logout?</p>
    <div className="flex gap-3">
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
        Yes, Logout
      </button>
      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
        Cancel
      </button>
    </div>
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: '📊 Overview', component: Overview },
    { id: 'appointment', label: '💬 Appointment', component: Appointmetn },
    { id: 'users', label: '👥 Users', component: Users },
    { id: 'settings', label: '⚙️ Settings', component: Setting },
    { id: 'logout', label: '🚪 Logout', component: Logout }
  ];

  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find(item => item.id === activeTab);
    return currentItem ? currentItem.label : 'Dashboard';
  };

  const renderActiveComponent = () => {
    const currentItem = menuItems.find(item => item.id === activeTab);
    if (currentItem) {
      const Component = currentItem.component;
      return <Component />;
    }
    return <Overview />;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 text-blue-700">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:block border-r border-blue-300">
        <div className="p-6 font-bold text-xl border-b border-blue-200">
          My Dashboard
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left block px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'hover:bg-blue-50 text-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white/90 backdrop-blur-sm px-6 py-4 shadow-md border-b border-blue-200">
          <h1 className="text-2xl font-bold">{getCurrentPageTitle()}</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="border border-blue-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition">
              🔔
            </button>
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Content */}
        <main className="p-6 flex-1">
          <AppointmentsProvider>
            {/* <BookingPage /> */}
            {/* <Appointmetn /> */}
          {renderActiveComponent()}
          </AppointmentsProvider>
        </main>
      </div>
    </div>
  );
}