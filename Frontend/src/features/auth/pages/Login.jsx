import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { GoogleAuthButton } from "../components";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await handleLogin(formData);
    setFormData({
      email: "",
      password: "",
    });
    navigate("/");
  };

  return (
    <div className="h-screen w-full bg-[#FAF9F6] flex overflow-hidden selection:bg-black selection:text-white">
      {/* Image Section - Hidden on mobile */}
      <div className="hidden lg:block lg:w-1/2 relative h-full overflow-hidden">
        <img
          src="/images/auth/login.png"
          alt="Premium Fashion"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
        <div className="absolute bottom-20 left-20 z-10">
          <h1 className="text-white text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">
            The <br /> Collection <br /> Awaits.
          </h1>
          <p className="text-white/80 text-xs font-black uppercase tracking-[0.4em] mt-8">
            Minimalist Excellence / 2026
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 h-full">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000  max-h-full scrollbar-hide py-12">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-black text-4xl font-black mb-2 tracking-tighter uppercase italic">
              Welcome Back
            </h2>
            <p className="text-gray-600 mb-6 text-[10px] font-black uppercase tracking-[0.3em]">
              Access your digital wardrobe
            </p>
          </div>

          {/* Google Login Button */}
          <div className="mb-8">
            <GoogleAuthButton />
          </div>

          <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="px-6 bg-[#FAF9F6] text-gray-800">
                Or authenticate via email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-3">
              <label
                className="block text-gray-800 text-[9px] font-black uppercase tracking-[0.2em] ml-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                required
                id="email"
                name="email"
                type="email"
                placeholder="NAME@EXAMPLE.COM"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white text-black px-6 py-4 rounded-2xl border border-black/5 focus:border-black/20 focus:outline-none transition-all placeholder:text-gray-900 font-medium shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="relative space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label
                  className="block text-gray-800 text-[9px] font-black uppercase tracking-[0.2em]"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-black text-[9px] font-black uppercase tracking-[0.2em] hover:underline transition-colors"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  required
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white text-black px-6 py-4 rounded-2xl border border-black/5 focus:border-black/20 focus:outline-none transition-all placeholder:text-gray-900 font-medium pr-14 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors p-2"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] py-5 rounded-2xl hover:bg-gray-800 transition-all duration-500 transform active:scale-[0.98] mt-6 shadow-2xl ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-gray-500 text-center mt-10 text-[9px] font-black uppercase tracking-[0.2em]">
            New to Snitch?{" "}
            <Link
              to="/register"
              className="text-black hover:underline transition-colors ml-1 font-black"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
