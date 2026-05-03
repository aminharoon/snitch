import React, { useEffect } from "react";

const CartProduct = ({
  item,
  handleIncrementQuantity,
  handleDecrementQuantity,
  handleRemoveItem,
}) => {
  const product = item.product;
  const variant = product?.variants;
  const variantId = item.variants;
  const attributes = item.attributes || {};

  const getImageUrl = (img) => {
    if (!img) return "";
    return typeof img === "string" ? img : img.url || "";
  };

  let imageUrl = "";
  if (variant?.images?.length > 0) {
    imageUrl = getImageUrl(variant.images[0]);
  } else if (product?.images?.length > 0) {
    imageUrl = getImageUrl(product.images[0]);
  }

  const currency = item?.price?.currency || "INR";
  const currencySymbol = currency === "USD" ? "$" : "₹";
  console.log("Item ", item);
  return (
    <div className="flex flex-col sm:flex-row gap-8 p-8 border border-black/5 rounded-4xl bg-white shadow-sm group transition-all hover:border-black/20 relative">
      {/* Delete Icon */}
      <button
        onClick={() => handleRemoveItem(item.product._id, item.variants)}
        className="absolute top-8 right-8 text-gray-500 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-xl"
        title="Remove from cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="w-full sm:w-32 aspect-[4/5] sm:aspect-square flex-shrink-0 bg-[#FAF9F6] rounded-3xl overflow-hidden border border-black/5 relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product?.title || "Product"}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.5}
              stroke="currentColor"
              className="w-12 h-12 mb-2"
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

      <div className="flex-1 flex flex-col justify-center pr-12">
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-black tracking-tighter text-black uppercase italic pr-4">
            {product?.title || "Unknown Product"}
          </h3>

          {/* Attributes (Size, Color, etc) */}
          {Object.keys(attributes).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(attributes).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/5 bg-[#FAF9F6]"
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">
                    {key}:
                  </span>
                  <span className="text-[10px] font-black text-black">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-12 items-end mt-8">
          <div>
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] block mb-2">
              Unit Price
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-light tracking-tighter text-black">
                {currencySymbol}
                {(item?.price?.amount ?? 0).toLocaleString()}
              </span>
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${(variant?.stock || product?.stock) > 0 ? "bg-green-500" : "bg-red-500"} animate-pulse`}
                />
                <span className="text-[8px] font-black uppercase tracking-[0.1em] text-gray-600">
                  {(variant?.stock || product?.stock) > 0
                    ? `In Stock`
                    : "Unavailable"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] block mb-2 ml-1">
              Quantity
            </span>
            <div className="flex items-center gap-6 bg-[#FAF9F6] rounded-2xl px-5 py-2.5 border border-black/5">
              <button
                onClick={() =>
                  handleDecrementQuantity(item.product._id, item.variants)
                }
                disabled={item?.quantity <= 1}
                className="text-gray-600 hover:text-black transition-colors disabled:opacity-20 disabled:cursor-not-allowed font-black"
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
                    d="M19.5 12h-15"
                  />
                </svg>
              </button>
              <span className="text-lg font-black text-black w-6 text-center italic">
                {item?.quantity}
              </span>
              <button
                onClick={() =>
                  handleIncrementQuantity(item.product._id, item.variants)
                }
                className="text-gray-600 hover:text-black transition-colors font-black"
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
