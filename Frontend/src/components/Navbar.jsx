import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useSelector } from "react-redux";
import { useProduct } from "../features/products/Hooks/useProducts";
import { useDispatch } from "react-redux";
import { setSearchTerm as setSearchTermRedux } from "../features/products/State/state.product.js";

const Navbar = ({ user, isLoggedIn = false, userName, pathname }) => {
  const { handleSearch, handleGetAllProducts } = useProduct();
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [hidden, setHidden] = useState(true);
  const { handleGetMe, handleLogout } = useAuth();

  // Sync search input with URL params (e.g. when navigating back/forward or clearing)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
      Dispatch(setSearchTermRedux(urlSearch));
    }
  }, [searchParams]);

  // Debounced search logic for live search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Only navigate if the searchTerm has changed and is different from current URL param
      const currentSearch = searchParams.get("search") || "";
      if (searchTerm.trim() !== currentSearch) {
        if (searchTerm.trim()) {
          navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`, {
            replace: true,
          });
        } else if (currentSearch) {
          navigate("/", { replace: true });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, navigate, searchParams]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    Dispatch(setSearchTermRedux(value));
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if any
      const value = searchTerm.trim();
      if (value) {
        navigate(`/?search=${encodeURIComponent(value)}`);
      } else {
        navigate("/");
      }
    }
  };

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
      className={`sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-black/5 py-3`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-8">
        {/* Left: Logo */}
        <div
          className="flex-shrink-0 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-black tracking-tighter text-black uppercase group-hover:opacity-60 transition-opacity">
            SNITCH
          </span>
        </div>

        {/* Center: Search Bar */}
        <div
          className={`flex-1 max-w-2xl ${pathname == "/cart" ? "hidden" : "block"}`}
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-600 group-focus-within:text-black transition-colors">
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
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              placeholder="SEARCH PRODUCTS..."
              className="w-full bg-gray-50 border border-black/5 rounded-full py-2.5 pl-12 pr-6 text-[10px] font-bold uppercase tracking-[0.2em] text-black placeholder-gray-500 focus:outline-none focus:border-black/10 focus:bg-white transition-all"
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
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-[10px] font-black text-white border border-black/5 group-hover:opacity-80 transition-all">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 group-hover:text-black transition-colors hidden sm:block">
                  {userName}
                </span>
              </div>
              <div
                className={`absolute right-0 mt-4 w-56 bg-white/95 backdrop-blur-3xl rounded-2xl shadow-2xl border border-black/5 z-[999] overflow-hidden transition-all duration-300 origin-top-right ${
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
                    className="px-6 py-3 hover:bg-black/5 cursor-pointer text-left text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-black transition-colors"
                  >
                    Home
                  </li>
                  <li
                    onClick={() => {
                      handleProfile();
                      setHidden(true);
                    }}
                    className="px-6 py-3 hover:bg-black/5 cursor-pointer text-left text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-black transition-colors"
                  >
                    Profile
                  </li>
                  <li
                    onClick={() => {
                      handledashboard();
                      setHidden(true);
                    }}
                    className={`px-6 py-3 hover:bg-black/5 cursor-pointer text-left text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-black transition-colors ${user?.role == "buyer" ? "hidden" : "block"}`}
                  >
                    Dashboard
                  </li>
                  <div className="h-px w-full bg-black/5 my-1"></div>
                  <li
                    onClick={() => {
                      handleLogout();
                      setHidden(true);
                    }}
                    className="px-6 py-3 hover:bg-red-50 cursor-pointer text-left text-[9px] font-black uppercase tracking-[0.3em] text-red-500/70 hover:text-red-600 transition-colors"
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
                className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-black transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] bg-black text-white rounded-full hover:bg-gray-800 transition-all active:scale-95"
              >
                Register
              </button>
            </div>
          )}

          <div className="relative group">
            <button
              onClick={() => navigate("/cart")}
              className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-black/5 transition-all relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {(items?.length || 0) > 0 && (
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white rounded-full flex items-center justify-center text-[8px] font-black">
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
