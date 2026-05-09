import React from "react";

export const Footer = () => {
  return (
    <div>
      {" "}
      <footer className="bg-white border-t border-black/5 py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <span className="text-3xl font-black tracking-tighter uppercase mb-6 block">
              SNITCH
            </span>
            <p className="text-gray-600 text-[10px] leading-relaxed font-bold uppercase tracking-widest">
              Defining the future of streetwear through minimalist excellence
              and premium craftsmanship.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-6">
                Shop
              </h4>
              <ul className="space-y-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                <li className="hover:text-black cursor-pointer">
                  New Arrivals
                </li>
                <li className="hover:text-black cursor-pointer">
                  Best Sellers
                </li>
                <li className="hover:text-black cursor-pointer">Collections</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-6">
                Help
              </h4>
              <ul className="space-y-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                <li className="hover:text-black cursor-pointer">Shipping</li>
                <li className="hover:text-black cursor-pointer">Returns</li>
                <li className="hover:text-black cursor-pointer">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-6">
                Social
              </h4>
              <ul className="space-y-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                <li className="hover:text-black cursor-pointer">Instagram</li>
                <li className="hover:text-black cursor-pointer">Twitter</li>
                <li className="hover:text-black cursor-pointer">TikTok</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} SNITCH ARCHIVE. ALL RIGHTS
            RESERVED.
          </p>
          <div className="flex gap-8 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">
            <span className="hover:text-black cursor-pointer">Privacy</span>
            <span className="hover:text-black cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
