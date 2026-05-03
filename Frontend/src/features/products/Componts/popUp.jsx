import React from "react";

const popUp = () => {
  return (
    <div>
      {" "}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
          <div className="bg-white border border-black/5 rounded-4xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-white border-b border-black/5 px-10 py-6 flex justify-between items-center flex-shrink-0">
              <div className="space-y-7">
                <h3 className="text-2xl font-black text-red-400 uppercase  italic ">
                  Please add at least one variant with size and stock.
                </h3>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]  bg-black w-fit">
                  Configure Specifications
                </p>
              </div>
              <button
                onClick={() => setisModalOpen((pre) => !pre)}
                className="text-gray-400 hover:text-black transition-colors p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default popUp;
