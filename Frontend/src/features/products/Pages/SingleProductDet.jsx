import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { useProduct } from '../Hooks/useProducts';

const SingleProductDet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleProductDet } = useProduct();
  const { singleProduct, loading } = useSelector((state) => state.product);
  const {user} = useSelector((state)=>state.auth)
  const [activeImage, setActiveImage] = useState(0);


  

  useEffect(() => {
    if (id) {
      getSingleProductDet(id);
    }
  }, [id]);
  

  useEffect(() => {
    
    if (singleProduct?.images?.length > 0) {
      setActiveImage(0);
    }
  }, [singleProduct]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (!singleProduct) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-500 max-w-md">The product you're looking for might have been removed or is temporarily unavailable.</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  
  const { title, description, price, images } = singleProduct;


  const handleAddToKart = ()=>{
    if(!user){
      navigate("/login")
    }
    else{
  
    }
  }
  const handleAddBuy=()=>{
   if(!user){
      navigate("/login")
    }
    else{
     
    }
  }
  
  const handleAddVariants =()=>{
    if(user?.role !=="seller") return
    navigate("/seller/addVariants")
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h16.5" />
            </svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Product Images */}
          <div className="space-y-6 lg:col-span-5 w-full max-w-sm mx-auto lg:max-w-full">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#111] border border-white/5 group">
              {images && images.length > 0 ? (
                <img 
                  src={images[activeImage]?.url} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 opacity-20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images && images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-16 sm:w-20 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                      activeImage === index ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={`${title} ${index}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col h-full lg:col-span-7">
            <div className="mb-8">
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">
                Premium Collection
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight text-white">
                {title}
              </h1>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl font-bold tracking-tighter text-white">
                  {price?.currency === "USD" ? "$" : "₹"}{price?.amount?.toLocaleString()}
                </span>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded uppercase tracking-wider">
                  In Stock
                </span>
              </div>
              <div className="h-[1px] w-full bg-white/5 mb-8" />
              <div className="prose prose-invert max-w-none">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Description</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-normal">
                  {description}
                </p>
              </div>
            </div>

            {/* Actions */}
          
               <div className={`mt-auto space-y-4 `}>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${user?.role === "seller" ? "hidden" : "block"}`}>
                <button
                 onClick={handleAddToKart}
                className="flex-grow py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Add to Cart
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.119-1.243l1.263-12c.07-.665.656-1.119 1.243-1.119h12.5a1.125 1.125 0 0 1 1.243 1.119Z" />
                  </svg>
                </button>
                <button
                onClick={handleAddBuy}
                className="flex-grow py-4 bg-[#111] border border-white/10 text-white font-bold rounded-2xl hover:bg-white hover:text-black transition-all duration-300">
                  Buy Now
                </button>
                  </div>
                  
                   {user && user.role =="seller"? <div className={`mt-auto space-y-4`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                         onClick={handleAddVariants}
                         className="flex-grow py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 group">
                          Add Variants 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.119-1.243l1.263-12c.07-.665.656-1.119 1.243-1.119h12.5a1.125 1.125 0 0 1 1.243 1.119Z" />
                         </svg>
                       </button>
               
                      </div>
          
                     </div>:null}

                  <p className="text-[11px] text-gray-600 text-center uppercase tracking-widest font-medium">
                    Free Shipping & 30-Day Easy Returns
                  </p>
             
               </div>

            </div>
        

        </div>
      </div>
    </div>
  );
};

export default SingleProductDet;