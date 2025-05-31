import React from 'react';

// Define the type for the component props
type ProductCardProps = {
  image: string;
  title: string;
  price: number;
  onClick?: () => void; // Optional click handler
};

const ProductCard: React.FC<ProductCardProps> = ({ 
  image, 
  title, 
  price,
  onClick 
}) => {
  const handleAddToCart = () => {
    console.log('Added to cart:', title);
    if (onClick) onClick(); // Call the provided onClick handler if it exists
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      {/* Product Image */}
      <div className="h-48 overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          src={image} 
          alt={title} 
          loading="lazy" // Add lazy loading for better performance
        />
      </div>
      
      {/* Product Info */}
      <div className="px-4 py-4">
        <h3 className="text-gray-900 font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-900 font-bold text-xl">${price.toFixed(2)}</p>
      </div>
      
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          onClick={handleAddToCart}
          aria-label={`Add ${title} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;