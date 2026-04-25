import React, { useEffect } from 'react';
import { useProduct } from '../Hooks/useProducts';
import { useSelector } from 'react-redux';
import ProductCard from '../Componts/ProductCard';

const Home = () => {
  const { handleGetAllProducts } = useProduct();
  const { allProducts, loading } = useSelector((state) => state.product);

  useEffect(() => {
    handleGetAllProducts();
  }, []);
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Hero / Header Section */}
      <header className="relative py-20 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Discover Excellence.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Curated collection of premium products designed for the modern lifestyle. 
            Experience quality and minimalism in every detail.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
       

        {loading ? (
          /* Loading State Skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-white/5 rounded-2xl mb-4" />
                <div className="h-4 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/5 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : allProducts && allProducts.length > 0 ? (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product}
                onClick={(p) => console.log('Navigate to details:', p._id)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-xs">
              We couldn't find any products in our collection right now. Check back soon!
            </p>
          </div>
        )}
      </main>

      {/* Footer / Minimal Bottom Section */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <p className="text-gray-600 text-sm font-medium tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Snitch Store. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
