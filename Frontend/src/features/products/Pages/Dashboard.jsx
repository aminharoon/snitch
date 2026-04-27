import React, { useEffect } from 'react';
import { useProduct } from '../Hooks/useProducts';
import { useSelector } from 'react-redux';
import { ProductCard } from '../Componts';
import { Link, useNavigate } from 'react-router';



const Dashboard = () => {
  const navigate = useNavigate()
  const { handleGetSellerProducts } = useProduct();
  const { sellerProducts, loading } = useSelector((state) => state.product);


  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  const handleEdit = (product) => {
    console.log('Edit product:', product);
    // Navigate to edit page or open modal
  };

  const handleDelete = (product) => {
    console.log('Delete product:', product);
    // Call delete service
  };

  const handleCardClick = (product) => {
     navigate(`/product/${product._id}`)
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-4 md:p-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 mt-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Seller Dashboard</h1>
            <p className="text-gray-400">Manage and track your listed products</p>
          </div>
          <Link 
            to="/seller/create-products"
            className="flex items-center justify-center gap-2 bg-[#F5C518] hover:bg-[#e0b415] text-black font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-[#F5C518]/10 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Product
          </Link>
        </div>

        {/* Stats Summary (Optional Enhancement) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-[#333]">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Total Products</p>
            <p className="text-2xl font-bold text-[#F5C518]">{sellerProducts?.length || 0}</p>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-[#333]">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Live Listings</p>
            <p className="text-2xl font-bold text-green-500">{sellerProducts?.length || 0}</p>
          </div>
          {/* Add more stats if needed */}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#F5C518] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium">Fetching your products...</p>
          </div>
        ) : sellerProducts && sellerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sellerProducts.map((product) => (
              <ProductCard 
                key={product._id || product.id} 
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#1a1a1a] rounded-3xl border-2 border-dashed border-[#333] py-20 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-[#0f0f0f] rounded-full flex items-center justify-center mb-6 text-gray-600 border border-[#333]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No products found</h2>
            <p className="text-gray-400 max-w-md mb-8">
              You haven't listed any products yet. Start selling by adding your first product to the marketplace.
            </p>
            <Link 
              to="/seller/create-products"
              className="bg-[#F5C518] hover:bg-[#e0b415] text-black font-bold px-8 py-3 rounded-xl transition-all duration-300 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
