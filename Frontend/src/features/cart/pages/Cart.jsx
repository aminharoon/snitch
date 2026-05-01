import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../hook/useCart";
import CartProduct from "../components/CartProduct";
import BackButton from "../../components/BackButton";

const Cart = () => {
  const {
    handleGetCartItems,
    handleDeleteCartIem,
    handleIncrementCartItem,
    handleDecrementCartItem,
  } = useCart();
  const items = useSelector((state) => state.cart.items);
  console.log(items);
  useEffect(() => {
    handleGetCartItems();
  }, []);

  const cartItems = items || [];

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const price = item?.price?.amount || 0;
      const quantity = item?.quantity || 1;
      return acc + price * quantity;
    }, 0);
  }, [cartItems]);

  // Determine global currency symbol from first item if available
  const globalCurrency =
    cartItems.length > 0 ? cartItems[0]?.price?.currency || "INR" : "INR";
  const globalCurrencySymbol = globalCurrency === "USD" ? "$" : "₹";

  const handleIncrementQuantity = async (productId, variantId) => {
    await handleIncrementCartItem({ productId, variantId });
  };
  const handleDecrementQuantity = async (productId, variantId) => {
    await handleDecrementCartItem({ productId, variantId });
  };

  const handleRemoveItem = async (productId, variantId) => {
    await handleDeleteCartIem({ productId, variantId });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-10 pb-16 selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto px-6 relative">
        <h1 className="text-4xl xl:text-5xl font-black tracking-tighter leading-[0.95] text-white uppercase italic mb-12">
          Shopping Cart
        </h1>
        <BackButton />

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center border border-white/5 rounded-4xl bg-[#0a0a0a]">
            <h2 className="text-3xl font-black mb-4 tracking-tighter text-white">
              Vault Empty
            </h2>
            <p className="text-gray-500 max-w-sm font-light leading-relaxed mb-8">
              Your cart is currently devoid of any items. Explore our collection
              to find your next piece.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
            {/* Left Side: Cart Items */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {cartItems.map((item, index) => (
                <CartProduct
                  key={item._id || index}
                  item={item}
                  handleIncrementQuantity={handleIncrementQuantity}
                  handleDecrementQuantity={handleDecrementQuantity}
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
            </div>

            {/* Right Side: Cart Summary */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-22">
              <div className="bg-[#0a0a0a] p-8 rounded-4xl border border-white/5 sticky top-24 shadow-2xl">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-8 border-b border-white/5 pb-4">
                  Order Summary
                </h2>

                <div className="space-y-6 mb-10 text-gray-400">
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                      Subtotal
                    </span>
                    <span className="text-2xl font-light text-white">
                      {globalCurrencySymbol}
                      {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-end pt-6 border-t border-white/5 text-white">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                      Total
                    </span>
                    <span className="text-4xl font-light tracking-tighter">
                      {globalCurrencySymbol}
                      {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-gray-200 transition-all duration-500 shadow-2xl active:scale-[0.98]">
                  Proceed to Checkout
                </button>

                <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div className="text-center space-y-1">
                    <p className="text-[8px] font-black text-white uppercase tracking-[0.3em]">
                      Complimentary Delivery
                    </p>
                    <p className="text-[7px] font-bold text-gray-700 uppercase tracking-[0.2em]">
                      Global Logistics
                    </p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-[8px] font-black text-white uppercase tracking-[0.3em]">
                      Secure Checkout
                    </p>
                    <p className="text-[7px] font-bold text-gray-700 uppercase tracking-[0.2em]">
                      SSL Encrypted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
