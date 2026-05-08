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
  User,
  Mail,
  Phone,
  TrendingUp,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  ExternalLink,
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
      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
        styles[status] || styles.pending
      }`}
    >
      {icons[status] || icons.pending}
      {status}
    </span>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-3 rounded-2xl ${color} bg-opacity-10 transition-colors duration-300 group-hover:bg-opacity-20`}
      >
        <Icon size={20} className={color.replace("bg-", "text-")} />
      </div>
      {trend && (
        <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
        {title}
      </p>
      <h3 className="text-2xl font-black text-black tracking-tighter">
        {value}
      </h3>
    </div>
  </div>
);

const ProductItem = ({ item }) => {
  const currencySymbol = item.price?.currency === "USD" ? "$" : "₹";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b last:border-0 border-black/5 group/product">
      <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-black/5">
        <img
          src={item.images?.[0]?.url}
          alt={item.title}
          className="w-full h-full object-cover group-hover/product:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-lg shadow-sm border border-black/5">
          <span className="text-[8px] font-black text-black">
            x{item.quantity}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col mb-1">
          <h4 className="text-[10px] font-black text-black uppercase tracking-wider mb-0.5 truncate">
            {item.title}
          </h4>
          <p className="text-[9px] text-gray-400 font-medium line-clamp-1 uppercase tracking-tight">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {item.attributes &&
            Object.entries(item.attributes).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-gray-50 border border-black/5 text-[7px] font-bold text-gray-500 uppercase tracking-tighter"
              >
                {key}: {value}
              </span>
            ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">
              Unit Price
            </span>
            <span className="text-[10px] font-black text-black">
              {currencySymbol}
              {item.price?.amount?.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">
              Subtotal
            </span>
            <span className="text-[11px] font-black text-black">
              {currencySymbol}
              {(item.price?.amount * item.quantity).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currencySymbol = order.price?.currency === "USD" ? "$" : "₹";
  const date = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm hover:shadow-xl hover:border-black/10 transition-all duration-500 group full ">
      {/* Compact Header */}
      <div
        className="p-8 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                #{order._id?.slice(-10).toUpperCase()}
              </span>
              <StatusBadge status={order.status} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-black/5">
                  <User size={12} className="text-black" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                    Customer
                  </span>
                  <span className="text-[10px] font-black text-black uppercase">
                    {order.userDetails?.fullName}
                  </span>
                </div>
              </div>
              <div className="h-6 w-px bg-black/5"></div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                  Revenue
                </span>
                <span className="text-sm font-black text-black">
                  {currencySymbol}
                  {order.price?.amount?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar size={10} /> {date}
              </span>
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-1">
                {order.orderItems?.length}{" "}
                {order.orderItems?.length === 1 ? "Product" : "Products"}
              </span>
            </div>
            <div
              className={`p-3 rounded-full bg-gray-50 border border-black/5 transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
            >
              <ChevronDown size={14} className="text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 pb-8 space-y-8">
          <div className="h-px bg-black/5 w-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Products */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                  <ShoppingBag size={12} /> Ordered Items
                </h5>
              </div>
              <div className="max-h-[400px] overflow-y-auto pr-4 custom-scrollbar space-y-2">
                {order.orderItems?.map((item, idx) => (
                  <ProductItem key={item._id || idx} item={item} />
                ))}
              </div>
            </div>

            {/* Right: Buyer & Payment Details */}
            <div className="lg:col-span-5 space-y-8">
              {/* Buyer Info */}
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-black/5 space-y-4">
                <h5 className="text-[10px] font-black text-black uppercase tracking-widest mb-4">
                  Buyer Intelligence
                </h5>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-black/5 flex items-center justify-center shadow-sm">
                      <Mail size={12} className="text-gray-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">
                        Email Address
                      </span>
                      <span className="text-[10px] font-bold text-black lowercase">
                        {order.userDetails?.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-black/5 flex items-center justify-center shadow-sm">
                      <Phone size={12} className="text-gray-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">
                        Phone Number
                      </span>
                      <span className="text-[10px] font-bold text-black">
                        {order.userDetails?.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white p-6 rounded-3xl border border-black/5 space-y-4 shadow-sm">
                <h5 className="text-[10px] font-black text-black uppercase tracking-widest mb-4">
                  Transaction Details
                </h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <CreditCard size={10} /> Razorpay ID
                    </span>
                    <span className="font-black text-black uppercase">
                      {order.razorpayDetails?.orderId || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-black text-gray-400 uppercase tracking-widest">
                      Status
                    </span>
                    <span className="font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      PAID
                    </span>
                  </div>
                  <div className="h-px bg-black/5 my-2"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Settlement Amount
                    </span>
                    <span className="text-xl font-black text-black">
                      {currencySymbol}
                      {order.price?.amount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SellerOrderSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] border border-black/5 p-8 animate-pulse mb-6 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-4 items-center">
        <div className="w-24 h-4 bg-gray-100 rounded-full"></div>
        <div className="w-16 h-6 bg-gray-100 rounded-full"></div>
      </div>
      <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
    </div>
    <div className="flex gap-6">
      <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
      <div className="flex-1 space-y-3">
        <div className="h-3 w-32 bg-gray-100 rounded-full"></div>
        <div className="h-4 w-48 bg-gray-100 rounded-full"></div>
      </div>
      <div className="w-32 h-10 bg-gray-100 rounded-2xl"></div>
    </div>
  </div>
);

const SellerOrder = () => {
  const { handleSeeSellerOrders } = useOrder();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const { items } = useSelector((state) => state.order);
  const orders = useMemo(() => items || [], [items]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      await handleSeeSellerOrders();
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.userDetails?.fullName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order.razorpayDetails?.orderId
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "all" || order.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [orders, searchQuery, activeFilter]);

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.price?.amount || 0),
      0,
    );
    return [
      {
        title: "Total Orders",
        value: orders.length,
        icon: ShoppingBag,
        color: "bg-black",
        trend: "+12%",
      },
      {
        title: "Total Revenue",
        value: `₹${totalRevenue.toLocaleString()}`,
        icon: TrendingUp,
        color: "bg-emerald-500",
        trend: "+8.4%",
      },
      {
        title: "Pending Vaults",
        value: orders.filter((o) => o.status === "pending").length,
        icon: Clock,
        color: "bg-amber-500",
        trend: null,
      },
      {
        title: "Completed",
        value: orders.filter((o) => o.status === "completed").length,
        icon: CheckCircle2,
        color: "bg-blue-500",
        trend: null,
      },
    ];
  }, [orders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
            <div className="h-12 w-64 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-14 w-96 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 rounded-[2rem] animate-pulse"
              ></div>
            ))}
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <SellerOrderSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black pt-10 pb-20 selection:bg-black selection:text-white">
      <div className="max-w-7xl mx-auto px-6 relative">
        <BackButton />
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg">
                <LayoutDashboard size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                Seller Control Panel
              </span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-black tracking-tighter leading-[0.95] text-black uppercase italic">
              Orders <br /> <span className="text-gray-300">Management</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
            {/* Search */}
            <div className="relative flex-1 group">
              <Search
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
              />
              <input
                type="text"
                placeholder="SEARCH ORDER ID OR BUYER..."
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
        {/* grid grid-cols-1 xl:grid-cols-12 gap-12 */}
        <div className="flex  items-start  ">
          {/* Main Orders List */}
          <div className="xl:col-span-8 space-y-2 w-full">
            {filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 px-6 text-center border border-black/5 rounded-4xl bg-white shadow-sm">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-black/5">
                  <Package size={40} className="text-gray-300" />
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tighter text-black uppercase">
                  No Signals Found
                </h2>
                <p className="text-gray-500 max-w-sm font-bold leading-relaxed mb-10 uppercase tracking-[0.2em] text-[10px]">
                  We couldn't find any orders matching your criteria. Keep your
                  listings fresh to attract more buyers.
                </p>
                <button
                  onClick={() => navigate("/seller/dashboard")}
                  className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-gray-800 transition-all shadow-xl active:scale-95 flex items-center gap-3"
                >
                  Back to Dashboard <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="space-y-2  w-full">
                <div className="flex items-center justify-between mb-2 px-2 ">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Showing {filteredOrders.length} Intelligence Reports
                  </span>
                </div>
                {filteredOrders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            )}
          </div>

          {/* Sticky Sidebar Info */}
        </div>
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

export default SellerOrder;
