"use client";
import React, { useState } from "react";
import { items } from "@/utils/productData";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Changed to 9 products per page
  const totalPages = Math.ceil(items.length / productsPerPage);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = items.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center">
      {/* Product Grid - Changed to 3 columns for better 9-item display (3x3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8 p-4 w-full">
        {currentProducts.map((item) => ( // Changed from items to currentProducts
          <ProductCard
            key={item.id}
            image={item.image}
            title={item.name}
            price={item.price}
            onClick={() => console.log(`Clicked on ${item.name}`)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded-md ${
              currentPage === number
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } transition`}
          >
            {number}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;