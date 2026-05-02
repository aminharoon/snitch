import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../Hooks/useProducts";
import { useSelector } from "react-redux";
import BackButton from "../../components/BackButton";

const UpdateSellerProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getSingleProductDet, handleAddVarients, handleDeleteVariant } =
    useProduct();

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
          amount: singleProduct.price?.amount,
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

  if (loading && !singleProduct) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-gray-600 font-black tracking-widest uppercase text-xs">
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
        <p className="text-gray-600 max-w-md font-bold uppercase tracking-widest text-[10px] leading-relaxed">
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

  const handleSaveVariant = async () => {
    // Transform attributes array into an object
    const formattedAttributes = newVariant.attributes.reduce((acc, attr) => {
      if (attr.key.trim()) {
        acc[attr.key.trim()] = attr.value;
      }
      return acc;
    }, {});

    const payload = {
      ...newVariant,
      attributes: formattedAttributes,
    };

    await handleAddVarients(singleProduct._id, payload);
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen bg-[#FAF9F6] text-black pt-6 pb-6 px-4 sm:px-10 overflow-hidden selection:bg-black selection:text-white">
      <div className="max-w-4xl mx-auto space-y-6 h-full flex flex-col">
        <BackButton />
        {/* Product Info Card */}
        <div className="bg-white rounded-4xl p-8 border border-black/5 shadow-sm flex flex-col md:flex-row gap-10 relative flex-shrink-0">
          {!isEditingProduct ? (
            <button
              onClick={() => setIsEditingProduct(true)}
              className="absolute top-6 right-6 text-gray-600 hover:text-black transition-colors p-3 bg-[#FAF9F6] rounded-2xl border border-black/10"
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

          <div className="w-full md:w-32 aspect-square rounded-3xl overflow-hidden bg-[#FAF9F6] border border-black/5 flex-shrink-0">
            {images && images.length > 0 ? (
              <img
                src={images[0].url}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-[10px] font-black uppercase tracking-widest">
                No Media
              </div>
            )}
          </div>
          <div className="flex-1 space-y-4 pr-10">
            {isEditingProduct ? (
              <div className="space-y-6">
                <input
                  type="text"
                  value={editedProduct.title}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      title: e.target.value,
                    })
                  }
                  className="w-full bg-[#FAF9F6] border border-black/5 rounded-2xl px-6 py-4 text-black text-xl font-black uppercase tracking-tight focus:outline-none focus:border-black/20 transition-all"
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
                  className="w-full bg-[#FAF9F6] border border-black/5 rounded-2xl px-6 py-4 text-black h-32 text-sm resize-none focus:outline-none focus:border-black/20 transition-all font-medium"
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
                    className="w-32 bg-[#FAF9F6] border border-black/5 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black/20 transition-all font-medium no-spinner"
                    placeholder="Price"
                  />
                  <span className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    {editedProduct.price.currency}
                  </span>
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => {
                      setIsEditingProduct(false);
                    }}
                    className="bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] px-8 py-4 rounded-2xl hover:bg-gray-800 transition-all shadow-xl"
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
                    className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border border-black/5 hover:bg-[#FAF9F6] transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-black text-black uppercase tracking-tighter italic">
                  {title}
                </h1>
                <p className="text-gray-600 leading-relaxed text-sm line-clamp-2 font-bold">
                  {description}
                </p>
                <div className="text-2xl font-black text-black italic tracking-tighter">
                  {price?.currency === "USD" ? "$" : "₹"}
                  {price?.amount?.toLocaleString()}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Variants Section */}
        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className="text-lg font-black text-black uppercase tracking-tighter italic">
                Variants
              </h2>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                Style Configurations
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-4 rounded-2xl hover:bg-gray-800 transition-all shadow-xl flex items-center gap-2"
            >
              Add Variant
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 md:[scrollbar-width:none] pb-10">
            {(!singleProduct.variants ||
              singleProduct.variants.length === 0) && (
              <div className="col-span-full bg-white rounded-4xl border border-dashed border-black/10 p-16 text-center">
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                  No variants detected
                </p>
              </div>
            )}
            {singleProduct.variants &&
              singleProduct.variants.map((variant, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 border border-black/5 flex flex-col gap-6 shadow-sm group hover:border-black/20 transition-all"
                >
                  <div className="flex gap-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#FAF9F6] border border-black/5 flex-shrink-0">
                      {variant.images && variant.images.length > 0 ? (
                        <img
                          src={variant.images[0].url}
                          alt={`Variant ${index}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-black uppercase tracking-widest">
                          No Img
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="text-black font-black text-xl italic tracking-tighter mb-2">
                        {variant.price?.currency === "USD" ? "$" : "₹"}
                        {(
                          variant.price?.amount || price?.amount
                        )?.toLocaleString()}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {variant.attributes &&
                          Object.entries(variant.attributes).map(
                            ([key, val]) => (
                              <span
                                key={key}
                                className="px-3 py-1.5 bg-[#FAF9F6] border border-black/5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 rounded-lg"
                              >
                                {key}: {val}
                              </span>
                            ),
                          )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteVariant(singleProduct._id, variant._id);
                      }}
                      className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-100 h-11 cursor-pointer"
                      title="Delete Variant"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-auto pt-6 border-t border-black/5">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">
                        Stock
                      </label>
                      <div className="flex items-center gap-3 bg-[#FAF9F6] border border-black/10 rounded-2xl px-3 py-1.5">
                        <button className="text-gray-600 hover:text-black px-2 transition-colors font-black">
                          -
                        </button>
                        <span className="text-black font-black text-sm min-w-[2.5rem] text-center">
                          {variant.stock}
                        </span>
                        <button className="text-gray-600 hover:text-black px-2 transition-colors font-black">
                          +
                        </button>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-gray-800 transition-all shadow-lg">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
          <div className="bg-white border border-black/5 rounded-4xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-white border-b border-black/5 px-10 py-6 flex justify-between items-center flex-shrink-0">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-black uppercase tracking-tighter italic">
                  New Variant
                </h3>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                  Configure Specifications
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-black transition-colors p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
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

            <div className="p-10 space-y-10 overflow-y-auto [scrollbar-width:none]">
              {/* Pricing & Stock */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 ml-1">
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
                    className="w-full bg-[#FAF9F6] border border-black/5 rounded-2xl px-6 py-5 text-black text-xl font-black tracking-tight focus:outline-none focus:border-black/20 transition-all no-spinner"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 ml-1">
                    Stock
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
                    className="w-full bg-[#FAF9F6] border border-black/5 rounded-2xl px-6 py-5 text-black text-xl font-black tracking-tight focus:outline-none focus:border-black/20 transition-all no-spinner"
                  />
                </div>
              </div>

              {/* Dynamic Attributes */}
              <div className="space-y-6">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
                    Attributes
                  </label>
                  <button
                    onClick={handleAddAttribute}
                    className="text-[10px] font-black text-black hover:underline flex items-center gap-2 uppercase tracking-[0.2em]"
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
                    Add Field
                  </button>
                </div>

                <div className="space-y-4">
                  {newVariant.attributes.map((attr, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="KEY (E.G. SIZE)"
                          value={attr.key}
                          onChange={(e) =>
                            handleAttributeChange(index, "key", e.target.value)
                          }
                          className="w-full bg-[#FAF9F6] border border-black/10 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black/20 transition-all text-sm font-black uppercase tracking-widest placeholder:text-gray-400"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="VALUE (E.G. XL)"
                          value={attr.value}
                          onChange={(e) =>
                            handleAttributeChange(
                              index,
                              "value",
                              e.target.value,
                            )
                          }
                          className="w-full bg-[#FAF9F6] border border-black/10 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-black/20 transition-all text-sm font-black uppercase tracking-widest placeholder:text-gray-400"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveAttribute(index)}
                        className="p-4 text-gray-400 hover:text-red-500 bg-[#FAF9F6] border border-black/5 rounded-2xl transition-all"
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
                    <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] text-center py-10 bg-[#FAF9F6] rounded-3xl border border-dashed border-black/10">
                      No attributes defined
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">
                  Media
                </label>
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-full h-32 bg-[#FAF9F6] border border-dashed border-black/10 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:border-black/40 hover:text-black transition-all duration-500 cursor-pointer group"
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
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-8 h-8 mb-3 opacity-20 group-hover:opacity-100 transition-opacity"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    Upload Variants
                  </span>
                </div>

                {/* Previews */}
                {newVariant.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    {newVariant.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-2xl overflow-hidden border border-black/5 shadow-sm group"
                      >
                        <img
                          src={img.preview}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="absolute top-2 right-2 bg-white/90 text-black p-2 rounded-xl hover:bg-red-500 hover:text-white transition-all backdrop-blur-sm shadow-xl"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
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

            <div className="bg-white border-t border-black/5 px-10 py-8 flex justify-end gap-4 flex-shrink-0">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 border border-black/10 hover:bg-[#FAF9F6] transition-all font-black"
              >
                Cancel
              </button>

              {loading ? (
                <button className="bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] px-10 py-4 rounded-2xl transition-all duration-500 opacity-70 cursor-not-allowed flex items-center gap-3">
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
                </button>
              ) : (
                <button
                  onClick={handleSaveVariant}
                  className="bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] px-10 py-4 rounded-2xl hover:bg-gray-800 transition-all shadow-xl"
                >
                  Confirm Variant
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateSellerProduct;
