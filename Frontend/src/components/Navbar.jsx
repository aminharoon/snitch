import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useSelector } from "react-redux";

const Navbar = ({ user, isLoggedIn = false, userName, pathname }) => {
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [hidden, setHidden] = useState(true);
  const { handleGetMe, handleLogout } = useAuth();

  const handleGetProfile = () => {
    setHidden((pre) => !pre);
  };

  const handledashboard = async () => {
    await handleGetMe();
    navigate("/seller/dashboard");
  };
  const handleProfile = () => {
    if (!user) {
      return;
    }
    navigate("/profile");
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4`}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between gap-8">
        {/* Left: Logo */}
        <div
          className="flex-shrink-0 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <span className="text-3xl font-black tracking-tighter text-white uppercase italic group-hover:opacity-70 transition-opacity">
            SNITCH
          </span>
        </div>

        {/* Center: Search Bar */}
        <div
          className={`flex-1 max-w-2xl ${pathname == "/cart" ? "hidden" : "block"}`}
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-600 group-focus-within:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="SEARCH THE ARCHIVE..."
              className="w-full bg-[#111] border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-[10px] font-black uppercase tracking-[0.3em] text-white placeholder-gray-600 focus:outline-none focus:border-white/20 focus:bg-white/5 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Right: Auth Section */}
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <div className="relative">
              <div
                className="flex items-center gap-3 group cursor-pointer"
                onClick={handleGetProfile}
              >
                <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-[10px] font-black text-white border border-white/5 group-hover:border-white/20 transition-all shadow-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors hidden sm:block">
                  {userName}
                </span>
              </div>
              <div
                className={`absolute right-0 mt-4 w-56 bg-[#0a0a0a] backdrop-blur-3xl rounded-[1.5rem] shadow-2xl border border-white/10 z-[999] overflow-hidden transition-all duration-300 origin-top-right ${
                  hidden
                    ? "opacity-0 scale-95 pointer-events-none"
                    : "opacity-100 scale-100"
                }`}
              >
                <ul className="flex flex-col py-2">
                  <li
                    onClick={() => {
                      navigate("/");
                      setHidden(true);
                    }}
                    className="px-6 py-3 hover:bg-white/5 cursor-pointer text-left text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </li>
                  <li
                    onClick={() => {
                      handleProfile();
                      setHidden(true);
                    }}
                    className="px-6 py-3 hover:bg-white/5 cursor-pointer text-left text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors"
                  >
                    Profile
                  </li>
                  <li
                    onClick={() => {
                      handledashboard();
                      setHidden(true);
                    }}
                    className={`px-6 py-3 hover:bg-white/5 cursor-pointer text-left text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors ${user?.role == "buyer" ? "hidden" : "block"}`}
                  >
                    Dashboard
                  </li>
                  <div className="h-px w-full bg-white/5 my-1"></div>
                  <li
                    onClick={() => {
                      handleLogout();
                      setHidden(true);
                    }}
                    className="px-6 py-3 hover:bg-red-500/10 cursor-pointer text-left text-[9px] font-black uppercase tracking-[0.3em] text-red-500/70 hover:text-red-500 transition-colors"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] bg-white text-black rounded-xl hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95"
              >
                Register
              </button>
            </div>
          )}

          <div className="relative group">
            <button
              onClick={() => navigate("/cart")}
              className="w-11 h-11 rounded-full bg-[#111] border border-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {(items?.length || 0) > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black rounded-full flex items-center justify-center text-[8px] font-black border border-[#050505]">
                  {items?.length}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
