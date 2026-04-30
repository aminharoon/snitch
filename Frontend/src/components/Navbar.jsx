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
      className={`sticky top-0  z-50 bg-black backdrop-blur-md border-b border-white/5 py-5`}
    >
      <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between gap-8 ">
        {/* Left: Logo */}
        <div
          className="flex-shrink-0 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-bold tracking-tighter text-white group-hover:text-gray-300 transition-colors">
            SNITCH
          </span>
        </div>

        {/* Center: Search Bar */}
        <div
          className={`flex-1 max-w-2xl ${pathname == "/cart" ? "hidden" : "block"}`}
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
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
              placeholder="Search for products, brands and more..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        {/* Right: Auth Section */}
        <div className="flex items-center gap-7">
          {isLoggedIn ? (
            <div className="relative">
              <div
                className="flex items-center gap-3 group cursor-pointer"
                onClick={handleGetProfile}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center text-xs font-bold text-white border border-white/10 group-hover:border-white/30 transition-all">
                  {userName.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors hidden sm:block">
                  {userName}
                </span>
              </div>
              <div
                className={`absolute right-0 mt-2 w-44 bg-black/80 backdrop-blur-md rounded-lg shadow-lg border border-white/10 -left-1 z-[999] ${
                  hidden ? "hidden" : "block"
                }`}
              >
                <ul className="flex flex-col py-2 text-sm text-white">
                  <li
                    onClick={() => {
                      navigate("/");
                      setHidden(true);
                    }}
                    className="px-4 py-2 hover:bg-white/10 cursor-pointer text-left"
                  >
                    Home
                  </li>
                  <li
                    onClick={() => {
                      handleProfile();
                      setHidden(true);
                    }}
                    className="px-4 py-2 hover:bg-white/10 cursor-pointer text-left"
                  >
                    Profile
                  </li>
                  <li
                    onClick={() => {
                      handledashboard();
                      setHidden(true);
                    }}
                    className={`px-4 py-2 hover:bg-white/10 cursor-pointer text-left ${user.role == "buyer" ? "hidden" : "block"}`}
                  >
                    Dashboard
                  </li>
                  <li
                    onClick={() => {
                      handleLogout();
                      setHidden(true);
                    }}
                    className="px-4 py-2 hover:bg-red-500/20 text-red-400 cursor-pointer text-left"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-all transform active:scale-95"
              >
                Register
              </button>
            </div>
          )}
          <div className="relative">
            <span className="text-white absolute -top-3    right-1">
              {items[0]?.length}
            </span>
            <button onClick={() => navigate("/cart")}>
              <i className="cursor-pointer ri-shopping-cart-line text-white text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
