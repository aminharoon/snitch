import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../Hooks/useProducts";
import { useCart } from "../../cart/hook/useCart";
import BackButton from "../../components/BackButton";

// NOTE: Premium Product Detail Page with advanced variant selection and modern e-commerce UI.
const SingleProductDet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleProductDet } = useProduct();

  const { singleProduct, loading } = useSelector((state) => state.product);
  const addKartLoading = useSelector((state) => state.cart.loading);
  const { user } = useSelector((state) => state.auth);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [matchingVariant, setMatchingVariant] = useState(null);
  const { handleAddToCart } = useCart();

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

  // Handle variant selection logic
  useEffect(() => {
    if (singleProduct?.variants && Object.keys(selectedAttributes).length > 0) {
      const match = singleProduct.variants.find((v) => {
        return Object.entries(selectedAttributes).every(([key, value]) => {
          const vVal = v.attributes?.[key];
          if (typeof vVal === "string") {
            return vVal
              .split(",")
              .map((s) => s.trim())
              .includes(value);
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
          <div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin mb-6" />
          <p className="text-gray-500 font-black tracking-[0.3em] uppercase text-[10px]">
            Synchronizing...
          </p>
        </div>
      </div>
    );
  }

  if (!singleProduct) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-black mb-4 tracking-tighter">
          Lost in Space
        </h2>
        <p className="text-gray-500 max-w-sm font-medium leading-relaxed mb-10">
          The product you seek has vanished from our collection.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
        >
          Return Home
        </button>
      </div>
    );
  }

  const { title, description, price, images, variants } = singleProduct;

  // Derived display data
  const displayPrice = matchingVariant?.price || price;
  const displayImages =
    matchingVariant?.images?.length > 0 ? matchingVariant.images : images;
  const displayStock = matchingVariant
    ? matchingVariant.stock
    : variants?.length > 0
      ? variants.reduce((acc, v) => acc + (v.stock || 0), 0)
      : 0;
  const isOutOfStock = displayStock === 0;

  // Group variant attributes
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

  const isOptionEnabled = (key, value) => {
    if (!variants) return true;
    return variants.some((v) => {
      if (v.stock <= 0) return false;
      const matchesOthers = Object.entries(selectedAttributes).every(
        ([sKey, sVal]) => {
          if (sKey === key) return true;
          const vVal = v.attributes?.[sKey];
          if (typeof vVal === "string") {
            return vVal
              .split(",")
              .map((s) => s.trim())
              .includes(sVal);
          }
          return vVal === sVal;
        },
      );
      if (!matchesOthers) return false;
      const vVal = v.attributes?.[key];
      if (typeof vVal === "string") {
        return vVal
          .split(",")
          .map((s) => s.trim())
          .includes(value);
      }
      return vVal === value;
    });
  };

  const handleAddToKart = async () => {
    if (!user) return navigate("/login");

    if (hasVariants && !matchingVariant) {
      alert("Please select the size ");
      return;
    }

    const payload = {
      productId: singleProduct._id,
      quantity: 1,
      variantId: matchingVariant?._id || null,
      attributes: selectedAttributes,
    };

    const respnse = await handleAddToCart({
      productId: singleProduct._id,
      variantId: matchingVariant?._id || null,
      attributes: selectedAttributes,
    });
    console.log(respnse);
  };

  const handleAddBuy = () => {
    // if (!user) return navigate("/login");
    // Logic for buy now goes here
  };
  const handleAddVariants = () =>
    navigate(`/seller/product/${singleProduct._id}`);

  const hasVariants = variants?.length > 0;

  return (
    <div className="h-[calc(100vh-81px)] bg-[#050505] text-white pt-2 selection:bg-white selection:text-black flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col min-h-0">
        {/* Navigation */}
        <div className="flex-shrink-0">
          <BackButton />
        </div>

        <div className="flex-1 flex gap-8 xl:gap-12 min-h-0 overflow-hidden pb-8">
          {/* Left Column: Media Gallery (Thumbnails + Main Image) */}
          <div className="flex-1 flex gap-6 h-full min-h-0">
            {/* Thumbnails */}
            {displayImages?.length > 1 && (
              <div className="w-20 xl:w-24 flex-shrink-0 flex flex-col gap-4 overflow-y-auto scrollbar-hide snap-y pb-10">
                {displayImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 transition-all duration-700 flex-shrink-0 snap-start ${
                      activeImage === index
                        ? "border-white scale-95 shadow-xl shadow-white/5"
                        : "border-white/5 opacity-40 hover:opacity-100 hover:border-white/20"
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

            {/* Main Image */}
            <div className="flex-1 rounded-4xl overflow-hidden bg-[#0a0a0a] border border-white/5 group shadow-2xl relative h-full">
              {displayImages?.length > 0 ? (
                <img
                  src={displayImages[activeImage]?.url}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center opacity-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={0.5}
                    stroke="currentColor"
                    className="w-32 h-32 mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black">
                    Archive Empty
                  </p>
                </div>
              )}
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Information & Selection */}
          <div className="w-full lg:w-[450px] xl:w-[500px] flex-shrink-0 h-full overflow-y-auto scrollbar-hide flex flex-col py-2 pr-4">
            <div className="flex-grow space-y-6 animate-in fade-in slide-in-from-right-8 duration-1000">
              {/* Core Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-4 py-1.5 bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] rounded-full">
                    Limited Edition
                  </span>
                  {(matchingVariant || !hasVariants) && (
                    <span
                      className={`px-4 py-1.5 ${isOutOfStock ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-green-500/10 text-green-500 border-green-500/20"} text-[9px] font-black border rounded-full uppercase tracking-[0.3em]`}
                    >
                      {isOutOfStock ? "Unavailable" : "In Stock"}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl xl:text-5xl font-black tracking-tighter leading-[0.95] text-white uppercase italic">
                  {title}
                </h1>

                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-light tracking-tighter text-white">
                    {(displayPrice?.currency || "INR") === "USD" ? "$" : "₹"}
                    {(
                      displayPrice?.amount ?? displayPrice
                    )?.toLocaleString?.() ||
                      (displayPrice?.amount ?? displayPrice)}
                  </span>
                  <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">
                    Global Shipping Ready
                  </span>
                </div>
              </div>

              {/* Description Block */}
              <div className="space-y-3">
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">
                  The Narrative
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed font-light italic">
                  "{description}"
                </p>
              </div>

              {/* Dynamic Variants */}
              {Object.keys(attributeGroups).length > 0 && (
                <div className="space-y-8 py-6 border-y border-white/5">
                  {Object.entries(attributeGroups).map(([key, values]) => (
                    <div key={key} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">
                          Select {key}
                        </h3>
                        {selectedAttributes[key] && (
                          <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">
                            {selectedAttributes[key]}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {Array.from(values).map((val) => {
                          const active = selectedAttributes[key] === val;
                          const enabled = isOptionEnabled(key, val);
                          return (
                            <button
                              key={val}
                              onClick={() =>
                                enabled && handleAttributeSelect(key, val)
                              }
                              disabled={!enabled}
                              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black transition-all duration-500 border-2 ${
                                active
                                  ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-105"
                                  : enabled
                                    ? "bg-transparent text-gray-600 border-white/10 hover:border-white/40 hover:text-white"
                                    : "bg-transparent text-gray-800 border-white/5 cursor-not-allowed opacity-10"
                              }`}
                            >
                              {key.toLowerCase() === "color" && (
                                <span
                                  className={`w-3 h-3 rounded-full border ${active ? "border-black/20" : "border-white/20"}`}
                                  style={{
                                    backgroundColor: val
                                      .toLowerCase()
                                      .replace(/\s+/g, ""),
                                  }}
                                />
                              )}
                              {val}
                              {active && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-4 border-[#050505]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Status & Availability */}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${isOutOfStock ? "bg-red-600" : "bg-green-600"} animate-pulse shadow-[0_0_10px_rgba(0,255,0,0.2)]`}
                  />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    {isOutOfStock
                      ? "Stock Depleted"
                      : `${displayStock} Units In Vault`}
                  </span>
                </div>
                <span className="text-[10px] font-black text-gray-800 uppercase tracking-[0.3em]">
                  REF: {singleProduct._id.slice(-12).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Action Matrix */}
            <div className="mt-2 space-y-5 pt-10">
              <div
                className={`flex flex-col sm:flex-row gap-4 ${user?.role === "seller" ? "hidden" : "flex"}`}
              >
                <button
                  onClick={handleAddToKart}
                  disabled={isOutOfStock}
                  className="flex-[2] py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-gray-200 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-500 shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
                >
                  {addKartLoading ? (
                    <svg
                      className="animate-spin h-6 w-6 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                      ADD TO CART...
                    </svg>
                  ) : (
                    "ADD TO CART"
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleAddBuy}
                  disabled={isOutOfStock}
                  className="flex-1 py-5 bg-transparent border-2 border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-black hover:border-white disabled:opacity-20 transition-all duration-500 active:scale-[0.98]"
                >
                  BUY NOW
                </button>
              </div>

              {user?.role === "seller" && (
                <button
                  onClick={handleAddVariants}
                  className="w-full py-5 bg-[#111] border-2 border-white/5 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3 shadow-xl shadow-black"
                >
                  Engineer Variants
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
                {[
                  { label: "Complimentary Delivery", sub: "Global Logistics" },
                  { label: "Verified Heritage", sub: "100% Authentic" },
                  { label: "Curated Return", sub: "30-Day Window" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="text-center space-y-2 group cursor-default"
                  >
                    <p className="text-[8px] font-black text-white uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                      {badge.label}
                    </p>
                    <p className="text-[7px] font-bold text-gray-700 uppercase tracking-[0.2em] leading-tight">
                      {badge.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDet;
