"use client";
import React from 'react'

const users = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">👥 Users</h2>
        <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 border border-blue-200 rounded-lg">
            <img src="https://i.pravatar.cc/40?img=1" alt="user" className="w-10 h-10 rounded-full" />
            <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-gray-600">john@example.com</p>
            </div>
        </div>
        <div className="flex items-center gap-3 p-3 border border-blue-200 rounded-lg">
            <img src="https://i.pravatar.cc/40?img=2" alt="user" className="w-10 h-10 rounded-full" />
            <div>
            <h3 className="font-semibold">Jane Smith</h3>
            <p className="text-gray-600">jane@example.com</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default users