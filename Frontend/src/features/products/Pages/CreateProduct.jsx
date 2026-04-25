import React, { useState, useRef } from "react";
import { useProduct } from "../Hooks/useProducts.js";

const CreateProduct = () => {
  const { handleCreateProduct, loading } = useProduct();
  const fileInputRef = useRef(null);


  const initialSateOfFormData={
      title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "",
  }
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
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.priceAmount || parseFloat(formData.priceAmount) <= 0) newErrors.priceAmount = "Valid price is required";
    if (images.length === 0) newErrors.images = "At least one image is required";

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

      await handleCreateProduct(data);
      setFormData(initialSateOfFormData)
      setImages([])
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
    <div className="min-h-screen bg-[#0f0f0f] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#F5C518] tracking-tight mb-3">
            Create New Product
          </h1>
          <p className="text-gray-400">
            Fill in the details below to list your item in the store.
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] shadow-2xl rounded-2xl p-8 md:p-10 space-y-8 border border-[#333]"
        >
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-400 mb-2 ml-1"
            >
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Premium Wireless Headphones"
              className={`w-full px-5 py-4 rounded-xl bg-[#0f0f0f] text-white border ${errors.title ? "border-red-500" : "border-[#333]"} focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-gray-600 font-medium`}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-500 ml-1">{errors.title}</p>
            )}
          </div>

          {/* Description Textarea */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-400 mb-2 ml-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product features, dimensions, and condition..."
              rows="5"
              className={`w-full px-5 py-4 rounded-xl bg-[#0f0f0f] text-white border ${errors.description ? "border-red-500" : "border-[#333]"} focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-gray-600 font-medium leading-relaxed resize-none`}
            ></textarea>
            {errors.description && (
              <p className="mt-2 text-sm text-red-500 ml-1">{errors.description}</p>
            )}
          </div>

          {/* Price & Currency Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="priceAmount"
                className="block text-sm font-medium text-gray-400 mb-2 ml-1"
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
                className={`w-full px-5 py-4 rounded-xl bg-[#0f0f0f] text-white border ${errors.priceAmount ? "border-red-500" : "border-[#333]"} focus:border-[#F5C518] focus:outline-none transition-colors placeholder:text-gray-600 font-medium`}
              />
              {errors.priceAmount && (
                <p className="mt-2 text-sm text-red-500 ml-1">{errors.priceAmount}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="priceCurrency"
                className="block text-sm font-medium text-gray-400 mb-2 ml-1"
              >
                Currency
              </label>
              <div className="relative">
                <select
                  id="priceCurrency"
                  name="priceCurrency"
                  value={formData.priceCurrency}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl bg-[#0f0f0f] text-white border border-[#333] focus:border-[#F5C518] focus:outline-none transition-colors appearance-none cursor-pointer font-medium"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3 ml-1">
              Product Images (Max 5)
            </label>

            <div
              onClick={() => images.length < 5 && fileInputRef.current.click()}
              className={`group relative border-2 border-dashed rounded-2xl p-10 text-center transition-all ${images.length >= 5 ? "bg-[#1a1a1a] border-[#333] cursor-not-allowed opacity-50" : "border-[#333] hover:border-[#F5C518] hover:bg-[#F5C518]/5 cursor-pointer"}`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#0f0f0f] text-[#F5C518] rounded-full flex items-center justify-center mb-4 border border-[#333] group-hover:border-[#F5C518] transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-gray-300 font-bold">Add Product Images</span>
                <span className="text-gray-500 text-sm mt-1">PNG, JPG or JPEG up to 10MB</span>
              </div>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden border border-[#333] group shadow-xl"
                  >
                    <img
                      src={img.preview}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="bg-white/10 hover:bg-red-500/20 text-white p-2 rounded-lg backdrop-blur-sm border border-white/20 transition-all"
                      >
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {errors.images && (
              <p className="mt-3 text-sm text-red-500 ml-1">{errors.images}</p>
            )}
            <div className="mt-3 flex justify-between items-center px-1">
              <p className="text-xs text-gray-500 font-medium">{images.length}/5 images selected</p>
              {images.length > 0 && (
                <button
                  type="button"
                  onClick={() => setImages([])}
                  className="text-xs text-red-500 hover:underline font-bold transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-4 rounded-xl font-bold text-lg text-black transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-[#F5C518]/10 ${!isFormValid || loading ? "bg-gray-700 text-gray-500 cursor-not-allowed opacity-50" : "bg-[#F5C518] hover:bg-[#e0b415]"}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Product...</span>
                </>
              ) : (
                <>
                  <span>List Product Now</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        <p className="mt-12 text-center text-gray-500 text-sm font-medium">
          Need help? <a href="#" className="text-[#F5C518] hover:underline transition-colors">Contact Merchant Support</a>
        </p>
      </div>
    </div>
  );
};

export default CreateProduct;
