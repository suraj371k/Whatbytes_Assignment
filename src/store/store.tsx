import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  searchQuery: string;
  cart: CartItem[];
  setCategories: (categories: string[]) => void;
  setPriceRange: (min: number, max: number) => void;
  setSearchQuery: (query: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const useStore = create<FilterState>()(
  persist(
    (set) => ({
      categories: [],
      priceRange: [0, 1000],
      searchQuery: '',
      cart: [],
      setCategories: (categories) => set({ categories }),
      setPriceRange: (min, max) => set({ priceRange: [min, max] }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      addToCart: (item) => 
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'app-store', // LocalStorage key
      partialize: (state) => ({ cart: state.cart }), // Only persist cart to localStorage
    }
  )
);