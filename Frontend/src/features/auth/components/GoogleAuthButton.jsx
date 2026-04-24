import React from 'react'

const GoogleAuthButton = () => {
  return (
    <button
         onClick={()=>window.location.href = "/api/auth/google"}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-semibold py-3 rounded-lg transition-all duration-300 transform active:scale-[0.98] mb-6 shadow-md"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-5 h-5"
          />
          Continue with Google
        </button>
  )
}

export default GoogleAuthButton