"use client";
import React, { useEffect, useState } from "react";
import { items } from "@/utils/productData";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/store/store";
import Sidebar from "@/components/Sidebar";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
}

const Products = () => {
  const { categories, priceRange, searchQuery, addToCart } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const productsPerPage = 9;

  const typedItems = items as Product[];

  // Filter products based on state
  const filteredProducts = typedItems.filter((item) => {
    const categoryMatch =
      categories.length === 0 ||
      categories.includes('all') ||
      categories.includes(item.category.toLowerCase());
    const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];
    const searchMatch = searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && priceMatch && searchMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categories, priceRange, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          {isMobileMenuOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row container mx-auto w-full px-2 sm:px-4">
        {/* Sidebar - Hidden on mobile when menu is closed */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 xl:w-1/5 p-2`}>
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-grow p-2">

          {/* Product Count */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {currentProducts.length} of {filteredProducts.length} products
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 place-items-center">
            {currentProducts.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                image={item.images[0]}
                title={item.name}
                price={item.price}
                onAddToCart={() => addToCart({
                  id: item.id.toString(),
                  name: item.name,
                  price: item.price,
                  image: item.images[0],
                  quantity: 1
                })}
              />
            ))}
          </div>

          {/* Pagination Controls - Bottom on all screens */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 flex items-center justify-center gap-1"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-full ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <span className="px-2">...</span>
                )}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 flex items-center justify-center gap-1"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;