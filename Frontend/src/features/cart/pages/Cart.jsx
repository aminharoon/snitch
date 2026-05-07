import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../hook/useCart";
import CartProduct from "../components/CartProduct";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router";

const Cart = () => {
  const {
    handleGetCartItems,
    handleDeleteCartIem,
    handleIncrementCartItem,
    handleDecrementCartItem,
    handleCreateOrder,
    handleverifyPayment,
  } = useCart();

  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const currency = useSelector((state) => state.cart.currency);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCartItems();
  }, []);

  const cartItems = items || [];

  const subtotal = totalPrice || 0;

  // Determine global currency symbol
  const globalCurrency = currency || "INR";
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

  const handleCreatepaymentOrder = async () => {
    const order = await handleCreateOrder();

    // Check if Razorpay script is loaded
    if (!window.Razorpay) {
      console.error("Razorpay script not loaded");
      return;
    }

    const options = {
      key: "rzp_test_SkqyGN8uA7EnFM",
      amount: order.amount * 100, // Amount in paise
      currency: order.currency,
      name: "SNITCH",
      description: "something ",
      order_id: order.id, // Generate order_id on server
      handler: async (response) => {
        const isValid = await handleverifyPayment(response);
        if (isValid) {
          navigate(`/order-success?order_id=${response?.razorpay_order_id}`);
        }
      },
      prefill: {
        name: user.fullName,
        email: user.email,
        contact: user.phoneNumber,
      },
      theme: {
        color: "#000000",
      },
    };
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black pt-10 pb-16 selection:bg-black selection:text-white">
      <div className="max-w-6xl mx-auto px-6 relative">
        <h1 className="text-4xl xl:text-5xl font-black tracking-tighter leading-[0.95] text-black uppercase italic mb-12">
          Shopping Cart
        </h1>
        <BackButton />

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center border border-black/5 rounded-4xl bg-white shadow-sm">
            <h2 className="text-3xl font-black mb-4 tracking-tighter text-black uppercase">
              Vault Empty
            </h2>
            <p className="text-gray-600 max-w-sm font-bold leading-relaxed mb-8 uppercase tracking-widest text-[10px]">
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
              <div className="bg-white p-8 rounded-4xl border border-black/5 sticky top-24 shadow-xl">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-8 border-b border-black/5 pb-4">
                  Order Summary
                </h2>

                <div className="space-y-6 mb-10 text-gray-600">
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                      Subtotal
                    </span>
                    <span className="text-2xl font-light text-black">
                      {globalCurrencySymbol}
                      {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-end pt-6 border-t border-black/5 text-black">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black">
                      Total
                    </span>
                    <span className="text-4xl font-light tracking-tighter">
                      {globalCurrencySymbol}

                      {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCreatepaymentOrder}
                  className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-gray-800 transition-all duration-500 shadow-xl active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-8 pt-8 border-t border-black/5 grid grid-cols-2 gap-4">
                  <div className="text-center space-y-1">
                    <p className="text-[8px] font-black text-black uppercase tracking-[0.3em]">
                      Complimentary Delivery
                    </p>
                    <p className="text-[7px] font-black text-gray-600 uppercase tracking-[0.2em]">
                      Global Logistics
                    </p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-[8px] font-black text-black uppercase tracking-[0.3em]">
                      Secure Checkout
                    </p>
                    <p className="text-[7px] font-black text-gray-600 uppercase tracking-[0.2em]">
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
