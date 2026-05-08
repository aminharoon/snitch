import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  CheckCircle2,
  ShoppingBag,
  ClipboardList,
  CalendarDays,
  CreditCard,
  Hash,
} from "lucide-react";
import BackButton from "../../components/BackButton";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

/**
 * Returns an estimated delivery date N business days from today.
 */
function getEstimatedDelivery(businessDays = 5) {
  const date = new Date();
  let added = 0;
  while (added < businessDays) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/** Animated success checkmark */
const SuccessIcon = () => (
  <div className="relative flex items-center justify-center mb-6">
    <span className="absolute inline-flex h-24 w-24 rounded-full bg-black opacity-5 animate-ping" />
    <CheckCircle2
      size={72}
      strokeWidth={1.4}
      className="relative text-black drop-shadow-sm
                 animate-[scaleIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_both]"
    />
  </div>
);

/** A single info row inside the order-details block */
const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-black/5 last:border-0">
    <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-600">
      <Icon size={13} className="text-gray-500 shrink-0" />
      {label}
    </span>
    <span className="text-sm font-black text-black text-right max-w-[55%] leading-snug">
      {value}
    </span>
  </div>
);

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  // Trigger card entrance animation after mount
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const estimatedDelivery = getEstimatedDelivery(5);

  return (
    <>
      {/* Keyframes */}
      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {/* Page background – matches Cart: bg-[#FAF9F6] */}
      <div className="min-h-screen bg-[#FAF9F6] text-black selection:bg-black selection:text-white flex items-center justify-center px-4 py-16n relative">
        <div className="absolute top-5 left-20">
          {" "}
          <BackButton />
        </div>
        {/* Card – matches Cart summary card */}

        <div
          className={`
            w-full max-w-md bg-white rounded-4xl border border-black/5 shadow-xl
            overflow-hidden transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
          style={{ animation: visible ? "slideUp 0.55s ease both" : "none" }}
        >
          <div className="px-8 py-12 flex flex-col items-center text-center">
            {/* Icon */}
            <SuccessIcon />

            {/* Section label – same micro-label style as "ORDER SUMMARY" */}
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 mb-3">
              Payment Confirmed
            </p>

            {/* Heading – same editorial style as "Shopping Cart" */}
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter leading-[0.95] text-black uppercase italic">
              Order Placed!
            </h1>

            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 leading-relaxed max-w-xs">
              Thank you for your purchase. We've received your order and will
              begin processing it right away.
            </p>

            {/* ── Order detail rows ── */}
            <div className="mt-10 w-full bg-[#FAF9F6] rounded-2xl border border-black/5 px-5 py-1">
              <DetailRow
                icon={Hash}
                label="Order ID"
                value={
                  orderId ? (
                    <span className="font-mono text-black text-xs">
                      #{orderId}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs italic font-normal">
                      Not available
                    </span>
                  )
                }
              />

              <DetailRow
                icon={CreditCard}
                label="Payment Status"
                value={
                  <span className="flex items-center justify-end gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Paid
                  </span>
                }
              />

              <DetailRow
                icon={CalendarDays}
                label="Est. Delivery"
                value={estimatedDelivery}
              />
            </div>

            {/* ── Buttons – same style as Cart's "Proceed to Checkout" ── */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full">
              {/* Primary – solid black */}
              <button
                id="btn-continue-shopping"
                onClick={() => navigate("/")}
                className="flex-1 flex items-center justify-center gap-2 py-4 
                           bg-black text-white text-[8px] font-black uppercase tracking-[0.3em]
                           rounded-2xl hover:bg-gray-800 transition-all duration-500
                           shadow-xl active:scale-[0.98]"
              >
                <ShoppingBag size={14} />
                Continue Shopping
              </button>

              {/* Secondary – outlined black */}
              <Link
                to="/order"
                id="btn-view-orders"
                className="flex-1 flex items-center justify-center gap-2 py-4
                           bg-[#FAF9F6] border border-black/10
                           hover:border-black hover:bg-white
                           text-[10px] font-black uppercase tracking-[0.3em] text-black
                           rounded-2xl transition-all duration-300
                           active:scale-[0.98]"
              >
                <ClipboardList size={14} />
                View Orders
              </Link>
            </div>

            {/* Footer note */}
            <p className="mt-8 text-[8px] font-black uppercase tracking-[0.2em] text-gray-600">
              A confirmation email has been sent to your registered address.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
