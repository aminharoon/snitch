import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../Hooks/useProducts";

const SingleProductDet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleProductDet } = useProduct();
  const { singleProduct, loading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [matchingVariant, setMatchingVariant] = useState(null);

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

  // Handle variant selection
  useEffect(() => {
    if (singleProduct?.variants && Object.keys(selectedAttributes).length > 0) {
      const match = singleProduct.variants.find((v) => {
        return Object.entries(selectedAttributes).every(([key, value]) => {
          const vVal = v.attributes?.[key];
          if (typeof vVal === "string") {
            return vVal.split(",").map((s) => s.trim()).includes(value);
          }
          return vVal === value;
        });
      });

      if (match && match._id !== matchingVariant?._id) {
        if (match.images?.length > 0) {
          setActiveImage(0);
        }
      }
      setMatchingVariant(match || null);
    } else {
      setMatchingVariant(null);
    }
  }, [selectedAttributes, singleProduct, matchingVariant?._id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  if (!singleProduct) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-500 max-w-md">
          The product you're looking for might have been removed or is
          temporarily unavailable.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { title, description, price, images, variants } = singleProduct;

  // Derive display data based on matching variant or fallback
  const displayPrice = matchingVariant?.price || price;
  const displayImages =
    matchingVariant?.images?.length > 0 ? matchingVariant.images : images;
  const displayStock = matchingVariant?.stock;
  const isOutOfStock = matchingVariant && matchingVariant.stock === 0;

  // Group all possible attributes and their values
  const attributeGroups = {};
  variants?.forEach((v) => {
    Object.entries(v.attributes || {}).forEach(([key, value]) => {
      if (!attributeGroups[key]) attributeGroups[key] = new Set();
      if (typeof value === "string") {
        value
          .split(",")
          .map((s) => s.trim())
          .forEach((val) => attributeGroups[key].add(val));
      } else {
        attributeGroups[key].add(value);
      }
    });
  });

  const handleAttributeSelect = (key, value) => {
    setSelectedAttributes((prev) => {
      const newState = { ...prev };
      if (newState[key] === value) {
        delete newState[key];
      } else {
        newState[key] = value;
      }
      return newState;
    });
  };

  // Check if a specific attribute option is available given current selections
  const isOptionAvailable = (key, value) => {
    if (!variants) return true;

    return variants.some((v) => {
      const matchesOthers = Object.entries(selectedAttributes).every(
        ([sKey, sVal]) => {
          if (sKey === key) return true;
          const vVal = v.attributes?.[sKey];
          if (typeof vVal === "string") {
            return vVal.split(",").map((s) => s.trim()).includes(sVal);
          }
          return vVal === sVal;
        },
      );

      if (!matchesOthers) return false;

      const vVal = v.attributes?.[key];
      if (typeof vVal === "string") {
        return vVal.split(",").map((s) => s.trim()).includes(value);
      }
      return vVal === value;
    });
  };

  const hasVariants = variants?.length > 0;
  const isSelectionComplete = !hasVariants || !!matchingVariant;

  const handleAddToKart = () => {
    if (!user) {
      navigate("/login");
    }
  };
  const handleAddBuy = () => {
    if (!user) {
      navigate("/login");
    }
  };

  const handleAddVariants = () => {
    if (user?.role !== "seller") return;
    navigate(`/seller/product/${singleProduct._id}`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h16.5"
              />
            </svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">
            Back to Collection
          </span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Product Images */}
          <div className="space-y-6 lg:col-span-5 w-full max-sm:mx-auto lg:max-w-full">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#111] border border-white/5 group">
              {displayImages && displayImages.length > 0 ? (
                <img
                  src={displayImages[activeImage]?.url}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-24 h-24 opacity-20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {displayImages && displayImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {displayImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-16 sm:w-20 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                      activeImage === index
                        ? "border-white"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${title} ${index}`}
                      className="w-full h-full object-cover"
                    />
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
                  {displayPrice?.currency === "USD" ? "$" : "₹"}
                  {displayPrice?.amount?.toLocaleString()}
                </span>
                {matchingVariant ? (
                  <span
                    className={`px-2 py-1 ${isOutOfStock ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"} text-[10px] font-bold rounded uppercase tracking-wider`}
                  >
                    {isOutOfStock ? "Out of Stock" : `In Stock (${displayStock})`}
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-white/5 text-gray-400 text-[10px] font-bold rounded uppercase tracking-wider border border-white/5">
                    Select Options
                  </span>
                )}
              </div>

              {/* Variant Selectors */}
              {Object.keys(attributeGroups).length > 0 && (
                <div className="space-y-6 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {Object.entries(attributeGroups).map(([key, values]) => (
                    <div key={key} className="space-y-3">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                        Select {key}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(values).map((value) => {
                          const isSelected = selectedAttributes[key] === value;
                          const isAvailable = isOptionAvailable(key, value);
                          return (
                            <button
                              key={value}
                              onClick={() =>
                                isAvailable && handleAttributeSelect(key, value)
                              }
                              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                                isSelected
                                  ? "bg-white text-black border-white shadow-lg shadow-white/10"
                                  : isAvailable
                                    ? "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                                    : "bg-transparent text-gray-800 border-white/5 cursor-not-allowed opacity-30"
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="h-[1px] w-full bg-white/5 mb-8" />
              <div className="prose prose-invert max-w-none">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                  Description
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed font-normal">
                  {description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className={`mt-auto space-y-4 `}>
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${user?.role === "seller" ? "hidden" : "block"}`}
              >
                <button
                  onClick={handleAddToKart}
                  disabled={isOutOfStock || (hasVariants && !matchingVariant)}
                  className="flex-grow py-4 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {isOutOfStock
                    ? "Out of Stock"
                    : !isSelectionComplete
                      ? "Select Options"
                      : "Add to Cart"}
                  {isSelectionComplete && !isOutOfStock && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.119-1.243l1.263-12c.07-.665.656-1.119 1.243-1.119h12.5a1.125 1.125 0 0 1 1.243 1.119Z"
                      />
                    </svg>
                  )}
                </button>
                <button
                  onClick={handleAddBuy}
                  disabled={isOutOfStock || (hasVariants && !matchingVariant)}
                  className="flex-grow py-4 disabled:opacity-20 disabled:cursor-not-allowed bg-[#111] border border-white/10 text-white font-bold rounded-2xl hover:bg-white hover:text-black transition-all duration-300"
                >
                  Buy Now
                </button>
              </div>

              {user && user.role === "seller" && (
                <div className="mt-auto space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleAddVariants}
                      className="flex-grow py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      Add Variants
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.119-1.243l1.263-12c.07-.665.656-1.119 1.243-1.119h12.5a1.125 1.125 0 0 1 1.243 1.119Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

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
