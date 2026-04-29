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
    <div className="min-h-[calc(100vh-4rem)] bg-[#0f0f0f] flex items-center justify-center pt-10 pb-20 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#F5C518] mb-2">
            My Profile
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Decorative Blob */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-[#F5C518]/5 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
            {/* Left Col: Avatar & Quick Actions */}
            <div className="flex flex-col items-center gap-6 md:w-1/3">
              <div className="relative group cursor-pointer">
                <div className="w-40 h-40 rounded-full border border-[#333] bg-[#0f0f0f] p-1 flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  {displayUser.profilePic ? (
                    <img
                      src={displayUser.profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full bg-[#1a1a1a]"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0f0f0f] rounded-full flex items-center justify-center text-5xl font-bold text-[#F5C518] shadow-inner">
                      {getInitials(displayUser.fullName)}
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-[#F5C518]"
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
                    <span className="text-xs font-medium text-white">
                      Update Photo
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-3">
                <button className="w-full flex items-center justify-center bg-[#F5C518] hover:bg-[#e0b415] text-black font-bold py-2.5 rounded-lg transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-[#F5C518]/10 text-sm">
                  Edit Profile
                </button>
                <button className="w-full py-2.5 bg-transparent border border-[#333] text-gray-300 text-sm font-semibold rounded-lg hover:bg-[#333]/50 transition-colors">
                  Change Password
                </button>
              </div>
            </div>

            {/* Right Col: User Details */}
            <div className="flex-1 w-full space-y-8">
              {/* Info Group */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-[#F5C518]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Field */}
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider ml-1">
                      Full Name
                    </label>
                    <div className="text-base text-gray-200 capitalize bg-[#0f0f0f] px-4 py-3 rounded-lg border border-[#333]">
                      {displayUser.fullName}
                    </div>
                  </div>
                  {/* Field */}
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider ml-1">
                      Email Address
                    </label>
                    <div className="text-base text-gray-200 bg-[#0f0f0f] px-4 py-3 rounded-lg border border-[#333] truncate">
                      {displayUser.email}
                    </div>
                  </div>
                  {/* Field */}
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider ml-1">
                      Account Type
                    </label>
                    <div className="flex items-center gap-2 text-base text-gray-200 bg-[#0f0f0f] px-4 py-3 rounded-lg border border-[#333] capitalize">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          displayUser.role === "seller"
                            ? "bg-[#F5C518]"
                            : "bg-emerald-500"
                        }`}
                      ></span>
                      {displayUser.role}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-[#333]" />

              {/* Account Meta */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-[#F5C518]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                  Account Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Field */}
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider ml-1">
                      Member Since
                    </label>
                    <div className="text-sm text-gray-300 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-500"
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
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider ml-1">
                      Sign In Provider
                    </label>
                    <div className="text-sm text-gray-300 capitalize flex items-center gap-2">
                      {displayUser.provider === "local" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                          />
                        </svg>
                      )}
                      {displayUser.provider}
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
