import React from "react";
import { useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-[#FAF9F6] text-black px-6">
      <div className="relative animate-in fade-in duration-1000">
        {/* Large Background 404 */}
        <h1 className="text-[15rem] md:text-[20rem] font-black tracking-tighter text-black/5 select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none">
          404
        </h1>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-8 block">
            ERROR CODE: 404
          </span>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-tight italic">
            Lost in the <br />
            <span className="text-gray-400">Collection.</span>
          </h2>

          <p className="max-w-md text-gray-600 text-sm md:text-base font-medium uppercase tracking-widest leading-relaxed mb-12">
            The page you are looking for has been archived or never existed in
            our catalog.
          </p>

          <button
            onClick={() => navigate("/")}
            className="group relative px-12 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full overflow-hidden hover:scale-105 transition-all duration-500 active:scale-95 shadow-2xl shadow-black/20"
          >
            <span className="relative z-10">Back to Home</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Subtle bottom detail */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-20">
        <div className="h-px w-8 bg-black" />
        <span className="text-[8px] font-black tracking-[0.4em] uppercase">
          SNITCH HERITAGE
        </span>
        <div className="h-px w-8 bg-black" />
      </div>
    </div>
  );
};

export default PageNotFound;
