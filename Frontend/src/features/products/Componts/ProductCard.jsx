import React from 'react';

const ProductCard = ({ product, onEdit, onDelete, onClick }) => {
  const { title, description, price, images, createdAt } = product;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(createdAt));

  const mainImage = images && images.length > 0 ? images[0] : null;
  const extraImagesCount = images && images.length > 1 ? images.length - 1 : 0;

  return (
    <div 
      onClick={() => onClick && onClick(product)}
      className="group bg-[#1a1a1a] rounded-2xl border border-[#333] overflow-hidden hover:border-gray-500 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 cursor-pointer flex flex-col h-full"
    >
      {/* Product Image Section */}
      <div className="relative aspect-video overflow-hidden bg-[#0f0f0f]">
        {mainImage ? (
          <img 
            src={mainImage.url} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 opacity-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
        )}
        
        {extraImagesCount > 0 && (
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-full border border-white/5">
            +{extraImagesCount}
          </div>
        )}

        {/* Action Buttons Overlay - Minimalist Style */}
        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit(product);
            }}
            className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-lg transition-colors border border-[#444] shadow-xl"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete(product);
            }}
            className="p-2 bg-[#2a2a2a] hover:bg-red-900/40 hover:text-red-400 text-white rounded-lg transition-colors border border-[#444] shadow-xl"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-white font-medium text-lg leading-tight line-clamp-1 group-hover:text-gray-200 transition-colors">
            {title}
          </h3>
          <span className="text-white font-bold text-lg whitespace-nowrap">
            {price.currency === "USD" ? "$" : "₹"}{price.amount}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#333]">
          <div className="flex items-center text-[10px] text-gray-500 uppercase tracking-widest font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-1.5 opacity-40">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            {formattedDate}
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-md border border-[#444] bg-[#2a2a2a] flex items-center justify-center">
               <span className="text-[10px] font-bold text-gray-400">S</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

