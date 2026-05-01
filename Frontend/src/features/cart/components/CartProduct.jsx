import React from "react";

const CartProduct = ({ item, handleUpdateQuantity, handleRemoveItem }) => {
  const variant = item.variants;
  const product = item.product;
  const attributes = item.attributes || {};

  let imageUrl = "";
  if (variant?.images?.length > 0) {
    imageUrl = variant.images[0].url;
  } else if (product?.images?.length > 0) {
    imageUrl = product.images[0].url;
  }

  const currency = item?.price?.currency || "INR";
  const currencySymbol = currency === "USD" ? "$" : "₹";

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 border border-white/5 rounded-4xl bg-[#0a0a0a] shadow-2xl group transition-all hover:border-white/10 relative h-35">
      {/* Delete Icon */}
      <button
        onClick={() => handleRemoveItem(item._id, product._id)}
        className="absolute top-6 right-6 text-white/20 hover:text-red-500 transition-colors"
        title="Remove from cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>

      <div className="w-full sm:w-32 aspect-[4/5] sm:aspect-square flex-shrink-0 bg-[#111] rounded-2xl overflow-hidden border border-white/5 relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product?.title || "Product"}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none" />
      </div>

      <div className="flex-1 flex flex-col justify-center pr-8">
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-black tracking-tighter text-white uppercase italic pr-4">
            {product?.title || "Unknown Product"}
          </h3>

          {/* Attributes (Size, Color, etc) */}
          {Object.keys(attributes).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {Object.entries(attributes).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center gap-1 px-3 py-1 rounded-full border border-white/10 bg-white/5"
                >
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">
                    {key}:
                  </span>
                  <span className="text-[10px] font-bold text-gray-300">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-8 items-end mt-2">
          <div>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] block mb-1.5">
              Price
            </span>
            <span className="text-2xl font-light tracking-tighter text-white">
              {currencySymbol}
              {(item?.price?.amount ?? 0).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[5px] font-black text-gray-500 uppercase tracking-[0.3em] block mb-1.5">
              Quantity
            </span>
            <div className="flex items-center gap-4 bg-[#111] rounded-full px-4 py-1.5 border border-white/5">
              <button
                onClick={() =>
                  handleUpdateQuantity(
                    item._id,
                    Math.max(1, (item?.quantity || 1) - 1),
                  )
                }
                disabled={item?.quantity <= 1}
                className="text-white/40 hover:text-white transition-colors disabled:opacity-20 disabled:hover:text-white/40"
              >
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
                    d="M19.5 12h-15"
                  />
                </svg>
              </button>
              <span className="text-SM font-light text-white w-6 text-center">
                {item?.quantity}
              </span>
              <button
                onClick={() =>
                  handleUpdateQuantity(item._id, (item?.quantity || 1) + 1)
                }
                className="text-white/40 hover:text-white transition-colors"
              >
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
