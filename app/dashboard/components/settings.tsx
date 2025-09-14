"use client";
import React, { useState } from "react";

const Settings = () => {
  // Profile states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    bio: "Software Developer with 5 years of experience",
  });
  const [tempProfileData, setTempProfileData] = useState({ ...profileData });

  // Account settings states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [password, setPassword] = useState("");
  const [privacyOptions, setPrivacyOptions] = useState({
    email: true,
    sms: false,
    push: true,
  });

  // Handlers
  const handleEditProfile = () => setIsEditingProfile(true);
  const handleSaveProfile = () => {
    setProfileData({ ...tempProfileData });
    setIsEditingProfile(false);
  };
  const handleCancelEdit = () => {
    setTempProfileData({ ...profileData });
    setIsEditingProfile(false);
  };
  const handleInputChange = (field, value) => {
    setTempProfileData(prev => ({ ...prev, [field]: value }));
  };
  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      console.log("Account deleted");
      // Add backend call here
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">⚙️ Settings</h2>
      <div className="space-y-4">

        {/* Profile Settings */}
        <div className="border border-blue-200 p-4 rounded-lg">
          <h3 className="font-semibold mb-4">Profile Settings</h3>
          {!isEditingProfile ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://i.pravatar.cc/40" alt="Profile" className="w-16 h-16 rounded-full" />
                <div>
                  <h4 className="font-semibold text-lg">{profileData.name}</h4>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <p className="text-gray-800">{profileData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <p className="text-gray-800">{profileData.phone}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <p className="text-gray-800">{profileData.bio}</p>
              </div>
              <button onClick={handleEditProfile} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://i.pravatar.cc/60" alt="Profile" className="w-16 h-16 rounded-full" />
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-200">Change Photo</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={tempProfileData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" value={tempProfileData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" value={tempProfileData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea value={tempProfileData.bio} onChange={(e) => handleInputChange('bio', e.target.value)} rows="3" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none"/>
              </div>
              <div className="flex gap-3">
                <button onClick={handleSaveProfile} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">Save Changes</button>
                <button onClick={handleCancelEdit} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors">Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="border border-blue-200 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Account Settings</h3>
          <div className="space-y-3">
            <button onClick={() => setShowChangePassword(true)} className="w-full text-left bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">Change Password</button>
            <button onClick={() => setShowPrivacySettings(true)} className="w-full text-left bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">Privacy Settings</button>
            <button onClick={handleDeleteAccount} className="w-full text-left bg-red-50 hover:bg-red-100 text-red-600 p-3 rounded-md transition-colors">Delete Account</button>
          </div>
        </div>

        {/* Change Password Modal */}
        {showChangePassword && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h4 className="text-lg font-semibold mb-3">Change Password</h4>
              <input type="password" placeholder="New Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border px-3 py-2 rounded-md mb-4"/>
              <div className="flex justify-end gap-3">
                <button onClick={()=>setShowChangePassword(false)} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
                <button onClick={()=>{
                  console.log("Password changed:", password);
                  setShowChangePassword(false);
                  setPassword("");
                }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Settings Modal */}
        {showPrivacySettings && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h4 className="text-lg font-semibold mb-3">Privacy Settings</h4>
              <label className="flex items-center gap-2 mb-2">
                <input type="checkbox" checked={privacyOptions.email} onChange={()=>setPrivacyOptions(prev=>({...prev,email:!prev.email}))} className="h-4 w-4"/>
                Email notifications
              </label>
              <label className="flex items-center gap-2 mb-2">
                <input type="checkbox" checked={privacyOptions.sms} onChange={()=>setPrivacyOptions(prev=>({...prev,sms:!prev.sms}))} className="h-4 w-4"/>
                SMS notifications
              </label>
              <label className="flex items-center gap-2 mb-2">
                <input type="checkbox" checked={privacyOptions.push} onChange={()=>setPrivacyOptions(prev=>({...prev,push:!prev.push}))} className="h-4 w-4"/>
                Push notifications
              </label>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={()=>setShowPrivacySettings(false)} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">Close</button>
                <button onClick={()=>{ console.log("Privacy settings updated:", privacyOptions); setShowPrivacySettings(false); }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;