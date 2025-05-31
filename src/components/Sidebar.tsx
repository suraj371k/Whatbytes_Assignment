import React from "react";

const Sidebar = () => {
  const checkboxStyle = `appearance-none h-4 w-4 border border-white rounded-full 
                        checked:bg-blue-500 checked:border-transparent
                        focus:outline-none focus:ring-2 focus:ring-blue-300
                        cursor-pointer transition-colors duration-200`;

  return (
    <div className="max-w-[12vw] text-white">
      <div className="bg-blue-800 p-4 rounded-md">
        <h3 className="text-2xl">Filters</h3>

        {/* Categories */}
        <div className="flex flex-col gap-2 mt-3">
          <h2 className="text-xl">Categories</h2>
          <div className="mt-2 flex items-center gap-2">
            <input type="checkbox" id="all" className={`${checkboxStyle}`} />
            <label htmlFor="all" className="cursor-pointer">
              All
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="electronics"
              className={`${checkboxStyle}`}
            />
            <label htmlFor="electronics" className="cursor-pointer">
              Electronics
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="clothing"
              className={`${checkboxStyle}`}
            />
            <label htmlFor="clothing" className="cursor-pointer">
              Clothing
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="home" className={`${checkboxStyle}`} />
            <label htmlFor="home" className="cursor-pointer">
              Home
            </label>
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-4">
          <h3 className="text-xl mb-3">Price</h3>
          <input
            type="range"
            min={0}
            max={1000}
            className="w-full h-1.5 bg-white rounded-full appearance-none cursor-pointer range-slider"
          />
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm">0</span>
            <span className="text-sm">1000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
