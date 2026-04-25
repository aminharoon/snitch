import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { GoogleAuthButton } from '../components';
import { useNavigate } from 'react-router';



const Login = () => {

  
  const navigate = useNavigate()


  const { handleLogin,handleGetMe } = useAuth();



  const {loading} = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
   
  };

  const handleSubmit =async (e) => {
         e.preventDefault();
         const user = await handleLogin(formData);
           setFormData({
                 email:"",
                 password:""
          })
     if(user.role !== "seller"){
           navigate("/")
       }
       else{
             navigate("/seller/dashboard")
        }
  };


 
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl p-8 border border-[#333]">
        <h2 className="text-[#F5C518] text-3xl font-bold mb-6 text-center">Welcome Back</h2>
        
        {/* Google Login Button */}
        <GoogleAuthButton />

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#333]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1a1a1a] text-gray-500">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-400 text-sm mb-1 ml-1" htmlFor="email">Email Address</label>
            <input
              required
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-lg border border-[#333] focus:border-[#F5C518] focus:outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="flex justify-between items-center mb-1 ml-1">
              <label className="block text-gray-400 text-sm" htmlFor="password">Password</label>
              <a href="#" className="text-[#F5C518] text-xs hover:underline transition-colors">Forgot password?</a>
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
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-lg border border-[#333] focus:border-[#F5C518] focus:outline-none transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F5C518] transition-colors p-1"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center bg-[#F5C518] hover:bg-[#e0b415] text-black font-bold py-3 rounded-lg transition-all duration-300 transform active:scale-[0.98] mt-2 shadow-lg shadow-[#F5C518]/10 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-8 text-sm">
          Don't have an account? <Link to="/register" className="text-[#F5C518] hover:underline transition-colors font-medium">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

