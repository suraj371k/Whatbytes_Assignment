"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { Rating } from '@mui/material';

type ProductCardProps = {
  id: number;
  image: StaticImageData | string;
  title: string;
  price: number;
  onAddToCart: (quantity: number) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
  onAddToCart,
}) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  // Generate a random rating between 3.5 and 5
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(quantity);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full w-80 cursor-pointer"
      onClick={() => router.push(`/products/${id}`)}
    >
      {/* Image Container - Larger */}
      <div className="relative aspect-square w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
          priority
        />
      </div>

      {/* Product Info */}
      <div className="p-5 flex-grow space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{title}</h3>
        
        {/* Rating Display */}
        <div className="flex items-center gap-2">
          <Rating 
            value={Number(rating)} 
            readOnly 
            precision={0.5} 
            size="small"
          />
          <span className="text-sm text-gray-600">({rating})</span>
        </div>

        <p className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</p>
        
        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor={`quantity-${id}`} className="text-sm text-gray-600">
            Quantity:
          </label>
          <div className="flex items-center border rounded-lg">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(prev => Math.max(1, prev - 1));
              }}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              id={`quantity-${id}`}
              min="1"
              value={quantity}
              onChange={(e) => {
                e.stopPropagation();
                setQuantity(Math.max(1, parseInt(e.target.value) || 1));
              }}
              className="w-12 text-center border-x py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(prev => prev + 1);
              }}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Button - Larger */}
      <div className="px-5 pb-5">
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium text-lg"
          onClick={handleAddToCart}
        >
          Add to Cart ({quantity})
        </button>
      </div>
    </div>
  );
};

export default ProductCard;