"use client";
import React, { useEffect } from "react";
import { useStore } from "../store/store";
import { useRouter, useSearchParams } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    categories,
    priceRange,
    setCategories,
    setPriceRange,
  } = useStore();

  // Sync URL with state on mount
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Categories from URL
    const urlCategories = params.get('categories')?.split(',') || [];
    if (urlCategories.length > 0) {
      setCategories(urlCategories);
    }

    // Price range from URL
    const priceParam = params.get('price');
    if (priceParam) {
      const [min, max] = priceParam.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setPriceRange(min, max);
      }
    }
  }, [searchParams, setCategories, setPriceRange]);

  const handleCategoryChange = (category: string) => {
    const newCategories = categories.includes(category)
      ? categories.filter((c) => c !== category)
      : [...categories, category];

    setCategories(newCategories);
    updateUrlParams({ categories: newCategories.join(',') });
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange(min, max);
    updateUrlParams({ price: `${min}-${max}` });
  };

  const updateUrlParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const checkboxStyle = `appearance-none h-4 w-4 border border-white rounded-full 
                        checked:bg-blue-500 checked:border-transparent
                        focus:outline-none focus:ring-2 focus:ring-blue-300
                        cursor-pointer transition-colors duration-200`;

  return (
    <div className="w-full lg:w-[250px] xl:w-[300px] p-4 lg:p-6">
      <div className="bg-blue-800 rounded-xl p-4 lg:p-6 shadow-lg">
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">Filters</h3>

        {/* Categories */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg lg:text-xl font-semibold text-white">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
            {['all', 'electronics', 'clothing', 'home'].map((category) => (
              <div key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={category}
                  checked={categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className={checkboxStyle}
                />
                <label 
                  htmlFor={category} 
                  className="cursor-pointer capitalize text-white text-sm lg:text-base hover:text-blue-200 transition-colors"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="text-lg lg:text-xl font-semibold text-white">Price Range</h3>
          <div className="space-y-4">
            <input
              type="range"
              min={0}
              max={1000}
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
              className="w-full h-2 bg-white rounded-full appearance-none cursor-pointer range-slider"
            />
            <div className="flex items-center justify-between text-white">
              <span className="text-sm lg:text-base">${priceRange[0]}</span>
              <span className="text-sm lg:text-base">${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;