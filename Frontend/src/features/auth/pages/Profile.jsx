import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  // Fallback data in case user isn't loaded completely
  const displayUser = user || {
    fullName: "Loading...",
    email: "loading@example.com",
    role: "buyer",
    createdAt: new Date().toISOString(),
    provider: "local",
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] flex items-center justify-center pt-10 pb-20 px-4 selection:bg-black selection:text-white">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-black mb-2 uppercase italic">
            Profile
          </h1>
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
            Identity & Preferences
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white border border-black/5 rounded-4xl p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
            {/* Left Col: Avatar & Quick Actions */}
            <div className="flex flex-col items-center gap-8 md:w-1/3">
              <div className="relative group cursor-pointer">
                <div className="w-48 h-48 rounded-full border border-black/5 bg-[#FAF9F6] p-1 flex items-center justify-center relative overflow-hidden transition-transform duration-700 group-hover:scale-105">
                  {displayUser.profilePic ? (
                    <img
                      src={displayUser.profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full bg-white"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#FAF9F6] rounded-full flex items-center justify-center text-6xl font-light text-black tracking-tighter">
                      {getInitials(displayUser.fullName)}
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
                      />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      Update
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <button className="w-full flex items-center justify-center bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] py-4 rounded-2xl hover:bg-gray-800 transition-all duration-500 transform active:scale-[0.98] shadow-xl">
                  Edit Profile
                </button>
                <button className="w-full py-4 bg-transparent border border-black/10 text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-black hover:text-white transition-all duration-500">
                  Password
                </button>
              </div>
            </div>

            {/* Right Col: User Details */}
            <div className="flex-1 w-full space-y-10">
              {/* Info Group */}
              <div className="space-y-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 border-b border-black/5 pb-4">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Field */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-1">
                      Full Name
                    </label>
                    <div className="text-base text-black font-medium bg-[#FAF9F6] px-6 py-4 rounded-2xl border border-black/5 capitalize">
                      {displayUser.fullName}
                    </div>
                  </div>
                  {/* Field */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-1">
                      Email Address
                    </label>
                    <div className="text-base text-black font-medium bg-[#FAF9F6] px-6 py-4 rounded-2xl border border-black/5 truncate">
                      {displayUser.email}
                    </div>
                  </div>
                  {/* Field */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-1">
                      Account Type
                    </label>
                    <div className="flex items-center gap-3 text-base text-black font-medium bg-[#FAF9F6] px-6 py-4 rounded-2xl border border-black/5 capitalize">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          displayUser.role === "seller"
                            ? "bg-black"
                            : "bg-green-500"
                        }`}
                      ></span>
                      {displayUser.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Meta */}
              <div className="space-y-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 border-b border-black/5 pb-4">
                  Account Integrity
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Field */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-1">
                      Member Since
                    </label>
                    <div className="text-sm text-gray-700 flex items-center gap-3 font-bold bg-[#FAF9F6] px-6 py-4 rounded-2xl border border-black/5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-black/20"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      {formatDate(displayUser.createdAt)}
                    </div>
                  </div>
                  {/* Field */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-1">
                      Verification
                    </label>
                    <div className="text-sm text-gray-700 capitalize flex items-center gap-3 font-bold bg-[#FAF9F6] px-6 py-4 rounded-2xl border border-black/5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-black/20"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                        />
                      </svg>
                      {displayUser.provider} Verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
