import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../features/auth/hooks/useAuth';

const Navbar = ({user, isLoggedIn = false, userName  }) => {
  const navigate = useNavigate();

  const [hidden, setHidden] = useState(true)
  const {handleLogout} = useAuth()

  const handleGetProfile = () => {
    setHidden((pre) => !pre)
  }

  const handleNavigate =()=>{
    if(user.role !=="seller")return 
    navigate("/seller/dashboard")
  }

 
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 ">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        {/* Left: Logo */}
        <div 
          className="flex-shrink-0 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <span className="text-2xl font-bold tracking-tighter text-white group-hover:text-gray-300 transition-colors">
            SNITCH
          </span>
        </div>

        {/* Center: Search Bar */}
        <div className={`flex-1 max-w-2xl    ${!isLoggedIn ?"hidden":" hidden"} }`}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
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
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleGetProfile}
              className={`relative`}
            >
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center text-xs font-bold text-white border border-white/10 group-hover:border-white/30 transition-all">
                  {userName.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors hidden sm:block">
                  {userName}
                </span>
              </div>
              <div
                className={`absolute right-0 mt-2 w-44 bg-black/80 backdrop-blur-md rounded-lg shadow-lg border border-white/10 -left-1 ${
                  hidden ? "hidden" : "block"
                }`}
              >
                <ul className="flex flex-col py-2 text-sm text-white">
                  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer text-left">
                    Home
                  </li>
                  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer text-left">
                    Profile
                  </li>
                  <li
                  onClick={()=>handleNavigate()}
                    className={`px-4 py-2 hover:bg-white/10 cursor-pointer text-left ${user.role =="buyer"?"hidden":"block"}`}>
                    Dashboard
                  </li>
                  <li
                  onClick={()=>handleLogout()}
                  className="px-4 py-2 hover:bg-red-500/20 text-red-400 cursor-pointer text-left">
                    Logout
                  </li>
                </ul>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/login')}
                className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-all transform active:scale-95"
              >
                Register
              </button>
            </div>
          )}
          
          {/* Mobile Search Icon (visible only on small screens) */}
          <button className="md:hidden p-2 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
