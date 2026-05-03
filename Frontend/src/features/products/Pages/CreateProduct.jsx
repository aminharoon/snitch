import React, { useState, useRef } from "react";
import { useProduct } from "../Hooks/useProducts.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BackButton from "../../components/BackButton.jsx";
import popUp from "../Componts/popUp.jsx";

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const { loading } = useSelector((state) => state.product);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [isModalOpen, setisModalOpen] = useState(false);

  const initialSateOfFormData = {
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  };
  const [formData, setFormData] = useState(initialSateOfFormData);

  const [images, setImages] = useState([]); // Array of { file, preview }
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: null }));
    }
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.priceAmount || parseFloat(formData.priceAmount) <= 0)
      newErrors.priceAmount = "Valid price is required";
    if (images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("priceAmount", formData.priceAmount);
      data.append("priceCurrency", formData.priceCurrency);

      images.forEach((img) => {
        data.append("images", img.file);
      });

      alert("Please Add At Least One Variant Like Size And Stock ");
      const response = await handleCreateProduct(data);
      setFormData(initialSateOfFormData);
      setImages([]);
      navigate(`/seller/product/${response._id}`);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const isFormValid =
    formData.title.trim() &&
    formData.description.trim() &&
    formData.priceAmount &&
    parseFloat(formData.priceAmount) > 0 &&
    images.length > 0;

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-20 px-4 sm:px-6 lg:px-8 selection:bg-black selection:text-white">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header Section */}
        <BackButton />
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-black tracking-tighter mb-3 uppercase italic">
            Create Item
          </h1>
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
            Add to the collection
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded-4xl p-10 space-y-10 border border-black/5"
        >
          {/* Title Input */}
          <div className="space-y-3">
            <label
              htmlFor="title"
              className="block text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-1"
            >
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="E.G. OVERSIZED WOOL COAT"
              className={`w-full px-6 py-5 rounded-2xl bg-[#FAF9F6] text-black border ${errors.title ? "border-red-500" : "border-black/5"} focus:border-black/20 focus:outline-none transition-all placeholder:text-gray-400 font-medium`}
            />
            {errors.title && (
              <p className="mt-2 text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description Textarea */}
          <div className="space-y-3">
            <label
              htmlFor="description"
              className="block text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the silhouette, fabric, and fit..."
              rows="4"
              className={`w-full px-6 py-5 rounded-2xl bg-[#FAF9F6] text-black border ${errors.description ? "border-red-500" : "border-black/5"} focus:border-black/20 focus:outline-none transition-all placeholder:text-gray-400 font-medium leading-relaxed resize-none [scrollbar-width:none]`}
            ></textarea>
            {errors.description && (
              <p className="mt-2 text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">
                {errors.description}
              </p>
            )}
          </div>

          {/* Price & Currency Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label
                htmlFor="priceAmount"
                className="block text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-1"
              >
                Price Amount
              </label>
              <input
                type="number"
                id="priceAmount"
                name="priceAmount"
                step="0.01"
                min="0"
                value={formData.priceAmount}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full px-6 py-5 rounded-2xl bg-[#FAF9F6] text-black border ${errors.priceAmount ? "border-red-500" : "border-black/5"} focus:border-black/20 focus:outline-none transition-all placeholder:text-gray-400 font-medium no-spinner`}
              />
              {errors.priceAmount && (
                <p className="mt-2 text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">
                  {errors.priceAmount}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <label
                htmlFor="priceCurrency"
                className="block text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-1"
              >
                Currency
              </label>
              <div className="relative">
                <select
                  id="priceCurrency"
                  name="priceCurrency"
                  value={formData.priceCurrency}
                  onChange={handleChange}
                  className="w-full px-6 py-5 rounded-2xl bg-[#FAF9F6] text-black border border-black/5 focus:border-black/20 focus:outline-none transition-all appearance-none cursor-pointer font-medium"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-1">
              Visuals (Max 4)
            </label>

            <div
              onClick={() => images.length < 4 && fileInputRef.current.click()}
              className={`group relative border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-500 ${images.length >= 4 ? "bg-[#FAF9F6] border-black/5 cursor-not-allowed opacity-50" : "border-black/10 hover:border-black/40 hover:bg-[#FAF9F6] cursor-pointer"}`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-10 h-10 mb-4 text-black/20 group-hover:text-black/40 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <span className="text-black text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                  Upload Media
                </span>
                <span className="text-gray-500 text-[9px] uppercase tracking-widest font-bold">
                  Drop files or click to browse
                </span>
              </div>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-black/5 group shadow-sm"
                  >
                    <img
                      src={img.preview}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="bg-white text-black p-3 rounded-full hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {errors.images && (
              <p className="mt-3 text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">
                {errors.images}
              </p>
            )}
            <div className="mt-4 flex justify-between items-center px-1">
              <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em]">
                {images.length} / 4 Selected
              </p>
              {images.length > 0 && (
                <button
                  type="button"
                  onClick={() => setImages([])}
                  className="text-[9px] text-black font-black uppercase tracking-[0.2em] hover:underline transition-all"
                >
                  Remove All
                </button>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 transform active:scale-[0.98] flex items-center justify-center gap-4 shadow-xl ${!isFormValid || loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  </svg>
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <span>List Item</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        <p className="mt-16 text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
          Need assistance?{" "}
          <a
            href="#"
            className="text-black hover:underline transition-colors ml-1 font-black"
          >
            Contact Support
          </a>
        </p>
      </div>
      <popUp isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} />
    </div>
  );
};

export default CreateProduct;
