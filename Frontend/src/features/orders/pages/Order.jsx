import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useOrder } from "../hooks/useOrder";
import {
  Package,
  Search,
  Filter,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  CreditCard,
  Calendar,
  ShoppingBag,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router";
import BackButton from "../../components/BackButton";

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-600 border-rose-100",
  };

  const icons = {
    pending: <Clock size={12} className="mr-1.5" />,
    completed: <CheckCircle2 size={12} className="mr-1.5" />,
    cancelled: <XCircle size={12} className="mr-1.5" />,
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status] || styles.pending}`}
    >
      {icons[status] || icons.pending}
      {status}
    </span>
  );
};

const OrderItem = ({ item }) => {
  const currencySymbol = item.price?.currency === "USD" ? "$" : "₹";
  console.log(item);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6 first:pt-0 last:pb-0 border-b last:border-0 border-black/5 group">
      <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-50 border border-black/5">
        <img
          src={item.images?.[0]?.url}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm border border-black/5">
          <span className="text-[8px] font-black text-black">
            x{item.quantity}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0 py-1">
        <div className="flex flex-col mb-1">
          <h4 className="text-[11px] font-black text-black uppercase tracking-wider mb-1 truncate">
            {item.title}
          </h4>
          <p className="text-[9px] text-gray-500 font-medium line-clamp-1 uppercase tracking-tight">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {item.attributes &&
            Object.entries(item.attributes).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-50 border border-black/5 text-[8px] font-bold text-gray-600 uppercase tracking-tighter"
              >
                {key}: {value}
              </span>
            ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
              Unit Price
            </span>
            <span className="text-xs font-black text-black">
              {currencySymbol}
              {item.price?.amount?.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
              Subtotal
            </span>
            <span className="text-sm font-black text-black">
              {currencySymbol}
              {(item.price?.amount * item.quantity).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSkeleton = () => (
  <div className="bg-white rounded-4xl border border-black/5 p-6 animate-pulse mb-6 shadow-sm">
    <div className="flex justify-between items-start mb-8 pb-6 border-b border-black/5">
      <div className="space-y-3">
        <div className="h-3 w-32 bg-gray-100 rounded-full"></div>
        <div className="h-4 w-48 bg-gray-100 rounded-full"></div>
      </div>
      <div className="h-8 w-24 bg-gray-100 rounded-full"></div>
    </div>
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div key={i} className="flex gap-4">
          <div className="w-20 h-24 bg-gray-100 rounded-2xl"></div>
          <div className="flex-1 space-y-3 py-2">
            <div className="h-3 w-3/4 bg-gray-100 rounded-full"></div>
            <div className="h-2 w-1/2 bg-gray-100 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-100 rounded-full mt-auto"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const Order = () => {
  const { hnadleGetOrder } = useOrder();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const { items } = useSelector((state) => state.order);
  const orders = items || [];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      await hnadleGetOrder();
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.razorpayDetails?.orderId
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "all" || order.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [orders, searchQuery, activeFilter]);

  const orderStats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      completed: orders.filter((o) => o.status === "completed").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    };
  }, [orders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-10 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="h-12 w-64 bg-gray-200 rounded-full mb-12 animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-6">
              {[1, 2, 3].map((i) => (
                <OrderSkeleton key={i} />
              ))}
            </div>
            <div className="lg:col-span-4">
              <div className="h-96 bg-gray-200 rounded-4xl animate-pulse sticky top-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black pt-10 pb-20 selection:bg-black selection:text-white">
      <div className="max-w-6xl mx-auto px-6 relative">
        <BackButton />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl xl:text-5xl font-black tracking-tighter leading-[0.95] text-black uppercase italic">
              Order <br /> History
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[...Array(Math.min(3, orderStats.total))].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-black border-2 border-[#FAF9F6] flex items-center justify-center text-[8px] text-white font-black"
                  >
                    {i === 2 ? "+" : ""}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                {orderStats.total} Total Vaults Secured
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-xl">
            {/* Search */}
            <div className="relative flex-1 group">
              <Search
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
              />
              <input
                type="text"
                placeholder="SEARCH  ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-black/20 transition-all shadow-sm"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex bg-white p-1.5 rounded-2xl border border-black/5 shadow-sm">
              {["all", "pending", "completed"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                    activeFilter === filter
                      ? "bg-black text-white shadow-lg"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 px-6 text-center border border-black/5 rounded-4xl bg-white shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-black/5">
              <Package size={40} className="text-gray-300" />
            </div>
            <h2 className="text-3xl font-black mb-4 tracking-tighter text-black uppercase">
              No Orders Found
            </h2>
            <p className="text-gray-500 max-w-sm font-bold leading-relaxed mb-10 uppercase tracking-[0.2em] text-[10px]">
              We couldn't find any orders matching your current filters. Start
              exploring our latest collections today.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-gray-800 transition-all shadow-xl active:scale-95 flex items-center gap-3"
            >
              Discover Collections <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Orders List */}
            <div className="lg:col-span-8 space-y-8">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm hover:shadow-xl hover:border-black/10 transition-all duration-500 group"
                >
                  {/* Order Header */}
                  <div className="p-8 pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-black/5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Order ID
                          </span>
                          <StatusBadge status={order.status} />
                        </div>
                        <h3 className="text-sm font-black text-black tracking-tight uppercase">
                          #{order._id?.slice(-12).toUpperCase()}
                        </h3>
                        {order.razorpayDetails?.orderId && (
                          <div className="flex items-center gap-2 mt-1">
                            <CreditCard size={10} className="text-gray-400" />
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                              RP: {order.razorpayDetails.orderId}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-10">
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                            <Calendar size={10} /> Date
                          </span>
                          <span className="text-xs font-black text-black">
                            {new Date().toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                            Total
                          </span>
                          <span className="text-lg font-black text-black">
                            {order.price?.currency === "USD" ? "$" : "₹"}
                            {order.price?.amount?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-8 max-h-[500px] overflow-y-auto custom-scrollbar">
                    <div className="space-y-6">
                      {order.orderItems?.map((item, idx) => (
                        <OrderItem key={item._id || idx} item={item} />
                      ))}
                    </div>
                  </div>

                  {/* Order Footer Actions */}
                  <div className="px-8 py-6 bg-gray-50/50 border-t border-black/5 flex items-center justify-between">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      {order.orderItems?.length}{" "}
                      {order.orderItems?.length === 1 ? "Item" : "Items"} in
                      this order
                    </span>
                    <button className="flex items-center gap-2 text-[9px] font-black text-black uppercase tracking-[0.2em] hover:gap-4 transition-all">
                      Track Order <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4 sticky top-24">
              <div className=" text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group border border-black ">
                {/* Decorative background element */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>

                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 mb-10 border-b border-white/10 pb-6">
                  Account Insights
                </h2>

                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-800">
                      Total Orders
                    </span>
                    <span className="text-3xl font-light italic">
                      {orderStats.total}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-5 rounded-3xl border border-black/20">
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-800 mb-2">
                        Pending
                      </p>
                      <p className="text-xl text-gray-800">
                        {orderStats.pending}
                      </p>
                    </div>
                    <div className="bg-white/10 p-5 rounded-3xl border border-black/20">
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-800 mb-2">
                        Fulfilled
                      </p>
                      <p className="text-xl text-gray-800">
                        {orderStats.completed}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <div className="bg-white/20 rounded-3xl p-6 mb-8 border border-white/20">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-black">
                          <ShoppingBag size={18} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest">
                            Active Cart
                          </p>
                          <p className="text-[8px] text-white/40 font-bold uppercase">
                            Items waiting
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate("/cart")}
                        className="w-full py-3 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                      >
                        Checkout Now <ArrowRight size={12} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white/40">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[8px] font-black uppercase tracking-widest">
                          Verified Payments
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-white/40">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                        <span className="text-[8px] font-black uppercase tracking-widest">
                          Premium Logistics
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Order;
