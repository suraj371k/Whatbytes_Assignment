"use client";
import React from "react";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/store";

const Navbar = () => {
  const { searchQuery, setSearchQuery, cart } = useStore();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-blue-800">
      <div className="flex flex-col justify-between container mx-auto sm:flex-row  p-3 sm:p-5 text-white  items-center gap-3 sm:gap-0">
        <div>
          <Link href="/" className="text-2xl sm:text-3xl font-bold">Logo</Link>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-4 h-4" />
          <input
            type="search"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md w-full sm:w-[350px] border-white border-[1px] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white bg-blue-800"
          />
        </div>

        <div className="w-full sm:w-auto">
          <Link
            href={"/cart"}
            className="flex justify-center bg-blue-950 gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl relative"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <button className="text-sm sm:text-lg">Cart</button>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
