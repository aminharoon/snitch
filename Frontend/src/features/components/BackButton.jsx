import React from "react";
import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
      <button
        onClick={() => navigate("/")}
        className="group flex items-center gap-3 text-gray-500 hover:text-white transition-all"
      >
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 border border-white/5 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h16.5"
            />
          </svg>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] mb-0.5">
            Back to collection
          </span>
        </div>
      </button>
    </div>
  );
};

export default BackButton;
