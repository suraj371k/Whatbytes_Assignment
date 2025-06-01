"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { items } from "@/utils/productData";
import { useStore } from "@/store/store";
import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";
import Review from '@/components/Review';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = items.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold">Product not found</h1>
        <Link href="/products" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link 
          href="/products" 
          className="inline-flex items-center text-blue-600 hover:underline mb-6 sm:mb-8"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Products
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Product Image Carousel */}
            <ImageCarousel images={product.images} alt={product.name} />

            {/* Product Info */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>

              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Description</h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Category</h2>
                <p className="text-base sm:text-lg text-gray-600 capitalize">
                  {product.category}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-4">
                <label htmlFor="quantity" className="text-base sm:text-lg font-semibold text-gray-900">
                  Quantity:
                </label>
                <div className="flex items-center border rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 sm:w-16 text-center border-x py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>

              {/* Product Description */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Reviews Section */}
              <Review productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 