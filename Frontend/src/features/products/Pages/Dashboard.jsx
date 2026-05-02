import React, { useEffect } from "react";
import { useProduct } from "../Hooks/useProducts";
import { useSelector } from "react-redux";
import { ProductCard } from "../Componts";
import { Link, useLocation, useNavigate } from "react-router";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleGetSellerProducts, handleDeleteProduct } = useProduct();
  const { sellerProducts, loading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  const handleEdit = (product) => {
    navigate(`/seller/product/${product._id}`);
  };

  const handleDelete = async (product) => {
    handleDeleteProduct(product._id);
  };

  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black pt-10 pb-20 px-4 md:px-10 selection:bg-black selection:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-black mb-3 uppercase italic">
              Dashboard
            </h1>
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
              Manage & Track Listings
            </p>
          </div>
          <Link
            to="/seller/create-products"
            className="flex items-center justify-center gap-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] px-10 py-5 rounded-2xl hover:bg-gray-800 transition-all duration-500 transform active:scale-[0.98] shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Product
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-4xl border border-black/5 shadow-sm">
            <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.3em] mb-2">
              Total Products
            </p>
            <p className="text-4xl font-black tracking-tighter text-black italic">
              {sellerProducts?.length || 0}
            </p>
          </div>
          <div className="bg-white p-8 rounded-4xl border border-black/5 shadow-sm">
            <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.3em] mb-2">
              Active Listings
            </p>
            <p className="text-4xl font-black tracking-tighter text-black italic">
              {sellerProducts?.length || 0}
            </p>
          </div>
          <div className="bg-white p-8 rounded-4xl border border-black/5 shadow-sm">
            <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.3em] mb-2">
              Total Views
            </p>
            <p className="text-4xl font-black tracking-tighter text-black italic">
              0
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {!sellerProducts && loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-4xl border border-black/5 shadow-sm">
            <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
              Synchronizing...
            </p>
          </div>
        ) : sellerProducts && sellerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
          <div className="bg-white rounded-4xl border border-dashed border-black/10 py-32 flex flex-col items-center justify-center text-center px-6">
            <div className="w-24 h-24 bg-[#FAF9F6] rounded-full flex items-center justify-center mb-8 text-black/10 border border-black/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-black mb-3 uppercase italic tracking-tight">
              Inventory Empty
            </h2>
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] max-w-xs mb-10 leading-loose">
              You haven't listed any items in the collection yet.
            </p>
            <Link
              to="/seller/create-products"
              className="bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] px-12 py-5 rounded-2xl hover:bg-gray-800 transition-all duration-500 transform active:scale-[0.98] shadow-xl"
            >
              Add First Item
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
