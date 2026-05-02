import React, { useEffect } from "react";
import { useProduct } from "../Hooks/useProducts";
import { useSelector } from "react-redux";
import ProductCard from "../Componts/ProductCard";
import { useNavigate } from "react-router";

const Home = () => {
  const { handleGetAllProducts } = useProduct();
  const { allProducts, loading } = useSelector((state) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const handleGetSingleProductDetail = (product) => {
    navigate(`/product/${product._id}`);
  };

  const categories = [
    { title: "Men", image: "/images/home/men.png", path: "/category/men" },
    {
      title: "Women",
      image: "/images/home/women.png",
      path: "/category/women",
    },
    {
      title: "Accessories",
      image: "/images/home/accessories.png",
      path: "/category/accessories",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img
          src="/images/home/hero.png"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white mb-6 block">
              New Collection 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              THE NEW <br /> STANDARD.
            </h1>
            <p className="text-white/90 text-sm md:text-base max-w-lg mx-auto mb-10 font-medium uppercase tracking-widest">
              Explore the intersection of luxury and streetwear. Curated for the
              modern individual.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("trending")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-all active:scale-95 shadow-2xl"
            >
              Shop Collection
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-2 block">
              Browse by
            </span>
            <h2 className="text-4xl font-black tracking-tighter uppercase">
              Categories
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl cursor-pointer bg-white"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {cat.title}
                </h3>
                <button className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 hover:text-white">
                  Discover Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section id="trending" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-2 block">
                Selected for you
              </span>
              <h2 className="text-4xl font-black tracking-tighter uppercase">
                Trending Now
              </h2>
            </div>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 hover:opacity-50 transition-all">
              View All Products
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-gray-100 rounded-3xl mb-4" />
                  <div className="h-4 bg-gray-100 rounded-full w-3/4 mb-2" />
                  <div className="h-4 bg-gray-100 rounded-full w-1/2" />
                </div>
              ))}
            </div>
          ) : allProducts && allProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={() => handleGetSingleProductDetail(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#FAF9F6] rounded-3xl border border-black/5">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                No trending products at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="px-6 py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-black rounded-[3rem] overflow-hidden py-24 px-12 text-center">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/70 mb-6 block">
                Limited Time Offer
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 uppercase leading-[0.9]">
                Spring Sale <br /> Up to 40% Off
              </h2>
              <p className="text-white/90 text-xs md:text-sm uppercase tracking-[0.2em] mb-12 font-medium">
                Use code{" "}
                <span className="text-white font-black">SNITCH2026</span> at
                checkout.
              </p>
              <button className="px-12 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-gray-200 transition-all active:scale-95">
                Explore Sale
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black/5 py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <span className="text-3xl font-black tracking-tighter uppercase mb-6 block">
              SNITCH
            </span>
            <p className="text-gray-600 text-[10px] leading-relaxed font-bold uppercase tracking-widest">
              Defining the future of streetwear through minimalist excellence
              and premium craftsmanship.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-6">
                Shop
              </h4>
              <ul className="space-y-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                <li className="hover:text-black cursor-pointer">
                  New Arrivals
                </li>
                <li className="hover:text-black cursor-pointer">
                  Best Sellers
                </li>
                <li className="hover:text-black cursor-pointer">Collections</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-6">
                Help
              </h4>
              <ul className="space-y-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                <li className="hover:text-black cursor-pointer">Shipping</li>
                <li className="hover:text-black cursor-pointer">Returns</li>
                <li className="hover:text-black cursor-pointer">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-6">
                Social
              </h4>
              <ul className="space-y-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                <li className="hover:text-black cursor-pointer">Instagram</li>
                <li className="hover:text-black cursor-pointer">Twitter</li>
                <li className="hover:text-black cursor-pointer">TikTok</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} SNITCH ARCHIVE. ALL RIGHTS
            RESERVED.
          </p>
          <div className="flex gap-8 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">
            <span className="hover:text-black cursor-pointer">Privacy</span>
            <span className="hover:text-black cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
