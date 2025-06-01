import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  searchQuery: string;
  cart: CartItem[];
  setCategories: (categories: string[]) => void;
  setPriceRange: (min: number, max: number) => void;
  setSearchQuery: (query: string) => void;
  addToCart: (item: CartItem) => void;
  addToCartWithQuantity: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useStore = create<FilterState>()(
  persist(
    (set, get) => ({
      categories: [],
      priceRange: [0, 1000],
      searchQuery: '',
      cart: [],
      
      // Filter actions
      setCategories: (categories) => set({ categories }),
      setPriceRange: (min, max) => set({ priceRange: [min, max] }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      
      // Cart actions
      addToCart: (item) => 
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      
      addToCartWithQuantity: (item, quantity) => {
        get().addToCart({ ...item, quantity });
      },
      
      updateCartItemQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),
      
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);