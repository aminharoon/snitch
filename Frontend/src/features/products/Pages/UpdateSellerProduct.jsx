import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../Hooks/useProducts";
import { useSelector } from "react-redux";

const UpdateSellerProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getSingleProductDet } = useProduct();

  useEffect(() => {
    if (id) {
      getSingleProductDet(id);
    }
  }, [id]);

  const { singleProduct, loading } = useSelector((state) => state.product);
  const fileInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    description: "",
    price: { amount: 0, currency: "INR" },
  });

  const [newVariant, setNewVariant] = useState({
    price: {
      amount: singleProduct?.price?.amount,
      currency: singleProduct?.price?.currency,
    },
    stock: 0,
    attributes: [{ key: "", value: "" }],
    images: [], // Array of { file, preview }
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewVariant((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (index) => {
    setNewVariant((prev) => {
      const updatedImages = [...prev.images];
      URL.revokeObjectURL(updatedImages[index].preview);
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
    });
  };

  useEffect(() => {
    if (singleProduct) {
      setNewVariant((prev) => ({
        ...prev,
        price: {
          amount: singleProduct.price?.amount || 0,
          currency: singleProduct.price?.currency || "INR",
        },
      }));
      setEditedProduct({
        title: singleProduct.title || "",
        description: singleProduct.description || "",
        price: {
          amount: singleProduct.price?.amount || 0,
          currency: singleProduct.price?.currency || "INR",
        },
      });
    }
  }, [singleProduct]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  if (!singleProduct) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-500 max-w-md">
          The product you're looking for might have been removed or is
          temporarily unavailable.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    title,
    description,
    price,
    images,
    variants: actualVariants,
  } = singleProduct;

  // Temporary dummy variants to showcase the UI design
  const dummyVariants = [
    {
      images: [
        {
          url: "http://res.cloudinary.com/dk1sbmxz9/image/upload/v1777284070/Snitch/products/byv226ddbjmqqupjoogh.jpg",
        },
      ],
      stock: 12,
      attributes: { Size: "L", Color: "Navy" },
      price: { amount: 335, currency: "INR" },
    },
  ];

  const variants = actualVariants?.length > 0 ? actualVariants : dummyVariants;

  const handleAddAttribute = () => {
    setNewVariant({
      ...newVariant,
      attributes: [...newVariant.attributes, { key: "", value: "" }],
    });
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = newVariant.attributes.filter(
      (_, i) => i !== index,
    );
    setNewVariant({ ...newVariant, attributes: updatedAttributes });
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...newVariant.attributes];
    updatedAttributes[index][field] = value;
    setNewVariant({ ...newVariant, attributes: updatedAttributes });
  };

  const handleSaveVariant = () => {
    // Here we'll dispatch the action to save the variant
    console.log("Saving variant...", newVariant);
    console.log(newVariant);
    console.log(newVariant);
  };

  return (
    <div className="h-screen bg-[#050505] text-white pt-4 pb-4 px-4 sm:px-10 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-4 h-full flex flex-col">
        {/* Product Info Card */}
        <div className="bg-[#1a1a1a] rounded-3xl p-5 border border-[#333] flex flex-col md:flex-row gap-8 relative flex-shrink-0">
          {!isEditingProduct ? (
            <button
              onClick={() => setIsEditingProduct(true)}
              className="absolute top-3 right-3 text-gray-400 hover:text-[#F5C518] transition-colors p-1.5 bg-[#0f0f0f] rounded-lg border border-[#333]"
              title="Edit Product"
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          ) : null}

          <div className="w-full md:w-[220px] aspect-square rounded-2xl overflow-hidden bg-[#111] border border-[#333] flex-shrink-0">
            {images && images.length > 0 ? (
              <img
                src={images[0].url}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1 space-y-4 pr-10">
            {isEditingProduct ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedProduct.title}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      title: e.target.value,
                    })
                  }
                  className="w-full bg-[#0f0f0f] border border-[#333] rounded-xl px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-[#F5C518] transition-colors"
                  placeholder="Product Title"
                />
                <textarea
                  value={editedProduct.description}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-[#0f0f0f] border border-[#333] rounded-xl px-4 py-3 text-white h-32 text-sm resize-none focus:outline-none focus:border-[#F5C518] transition-colors"
                  placeholder="Product Description"
                />
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={editedProduct.price.amount}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: {
                          ...editedProduct.price,
                          amount: Number(e.target.value),
                        },
                      })
                    }
                    className="w-32 bg-[#0f0f0f] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F5C518] transition-colors"
                    placeholder="Price"
                  />
                  <span className="text-gray-400 font-bold">
                    {editedProduct.price.currency}
                  </span>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      // Save action would go here
                      setIsEditingProduct(false);
                    }}
                    className="bg-[#F5C518] text-black font-bold px-6 py-2 rounded-xl transition-all hover:bg-[#e0b415]"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditedProduct({
                        title: singleProduct.title || "",
                        description: singleProduct.description || "",
                        price: {
                          amount: singleProduct.price?.amount || 0,
                          currency: singleProduct.price?.currency || "INR",
                        },
                      });
                      setIsEditingProduct(false);
                    }}
                    className="px-6 py-2 rounded-xl font-bold text-gray-300 hover:bg-[#333] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="text-gray-400 leading-relaxed text-sm line-clamp-3">
                  {description}
                </p>
                <div className="text-2xl font-bold text-[#F5C518]">
                  {price?.currency === "USD" ? "$" : "₹"}
                  {price?.amount?.toLocaleString()}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Variants Section */}
        <div className="space-y-2 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Product Variants</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#F5C518] hover:bg-[#e0b415] text-black font-bold px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-2"
            >
              Add New Variant
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto pr-1 md:[scrollbar-width:none]">
            {(!variants || variants.length === 0) && (
              <div className="col-span-full bg-[#1a1a1a] rounded-2xl border border-dashed border-[#333] p-8 text-center text-gray-500">
                No variants added yet. Click "Add New Variant" to get started.
              </div>
            )}
            {variants &&
              variants.map((variant, index) => (
                <div
                  key={index}
                  className="bg-[#1a1a1a] rounded-xl p-3.5 border border-[#333] flex flex-col gap-3 [scrollbar-width:none]"
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#111] border border-[#333] flex-shrink-0">
                      {variant.images && variant.images.length > 0 ? (
                        <img
                          src={variant.images[0].url}
                          alt={`Variant ${index}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">
                          No Img
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-[#F5C518] font-bold text-lg mb-0.5">
                        {variant.price?.currency === "USD" ? "$" : "₹"}
                        {(
                          variant.price?.amount || price?.amount
                        )?.toLocaleString()}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {variant.attributes &&
                          Object.entries(variant.attributes).map(
                            ([key, val]) => (
                              <span
                                key={key}
                                className="px-2 py-1 bg-[#0f0f0f] border border-[#333] text-xs font-semibold uppercase tracking-wider text-gray-400 rounded-md"
                              >
                                {key}: {val}
                              </span>
                            ),
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-auto pt-4 border-t border-[#333]">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                        Stock
                      </label>
                      <div className="flex items-center gap-2 bg-[#0f0f0f] border border-[#333] rounded-lg px-2 py-1">
                        <button className="text-gray-400 hover:text-white px-2">
                          -
                        </button>
                        <span className="text-white font-bold min-w-[2rem] text-center">
                          {variant.stock}
                        </span>
                        <button className="text-gray-400 hover:text-white px-2">
                          +
                        </button>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-lg transition-colors border border-white/10">
                      Update
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Add Variant Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#333] px-6 py-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-white">
                Create New Variant
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Pricing & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Price (INR)
                  </label>
                  <input
                    type="number"
                    value={newVariant.price.amount}
                    onChange={(e) =>
                      setNewVariant({
                        ...newVariant,
                        price: {
                          ...newVariant.price,
                          amount: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full bg-[#0f0f0f] border border-[#333] rounded-xl px-4 py-3 text-white text-lg font-medium focus:outline-none focus:border-[#F5C518] transition-colors no-spinner"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Stock Available
                  </label>
                  <input
                    type="number"
                    value={newVariant.stock}
                    onChange={(e) =>
                      setNewVariant({
                        ...newVariant,
                        stock: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#0f0f0f] border border-[#333] rounded-xl px-4 py-3 text-white text-lg font-medium focus:outline-none focus:border-[#F5C518] transition-colors no-spinner"
                  />
                </div>
              </div>

              {/* Dynamic Attributes */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Attributes
                  </label>
                  <button
                    onClick={handleAddAttribute}
                    className="text-xs font-bold text-[#F5C518] hover:text-[#e0b415] flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Add Attribute
                  </button>
                </div>

                <div className="space-y-3">
                  {newVariant.attributes.map((attr, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Key (e.g. Size)"
                          value={attr.key}
                          onChange={(e) =>
                            handleAttributeChange(index, "key", e.target.value)
                          }
                          className="w-full bg-[#0f0f0f] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F5C518] transition-colors text-base"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Value (e.g. XL)"
                          value={attr.value}
                          onChange={(e) =>
                            handleAttributeChange(
                              index,
                              "value",
                              e.target.value,
                            )
                          }
                          className="w-full bg-[#0f0f0f] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F5C518] transition-colors text-base"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveAttribute(index)}
                        className="p-1.5 text-gray-500 hover:text-red-400 bg-[#0f0f0f] border border-[#333] rounded-lg transition-colors"
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
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {newVariant.attributes.length === 0 && (
                    <div className="text-sm text-gray-500 italic px-2">
                      No attributes added yet.
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Variant Images
                </label>
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-full h-20 bg-[#0f0f0f] border border-dashed border-[#333] rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-[#F5C518] hover:text-[#F5C518] transition-colors cursor-pointer"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mb-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <span className="text-xs font-semibold">Upload Images</span>
                </div>

                {/* Previews */}
                {newVariant.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {newVariant.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden border border-[#333]"
                      >
                        <img
                          src={img.preview}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-3 h-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#1a1a1a] border-t border-[#333] px-4 py-3 flex justify-end gap-2 z-10 rounded-b-3xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-gray-300 hover:bg-[#333] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVariant}
                className="bg-[#F5C518] hover:bg-[#e0b415] text-black font-bold px-8 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#F5C518]/10 active:scale-95"
              >
                Save Variant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateSellerProduct;
