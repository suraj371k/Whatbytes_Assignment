"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

type ProductCardProps = {
  image: StaticImageData | string;
  title: string;
  price: number;
  onClick?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  onClick,
}) => {
  const handleAddToCart = () => {
    console.log("Added to cart:", title);
    if (onClick) onClick();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full w-80">
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
        <p className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</p>
      </div>

      {/* Button - Larger */}
      <div className="px-5 pb-5">
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium text-lg"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;