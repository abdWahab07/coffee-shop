import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  // Cart state
  cart: [],
  isLoading: false,
  error: null,
  isCartOpen: false,

  // Product data (managed locally for now)
  products: [
    {
      id: 1,
      title: 'Hot Coffee',
      price: 740.00,
      image: 'https://images.unsplash.com/photo-1565252556328-92ee4a9a0983?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'hot-beverages'
    },
    {
      id: 2,
      title: 'Iced Coffee',
      price: 680.00,
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'cold-beverages'
    },
    {
      id: 3,
      title: 'Cappuccino',
      price: 820.00,
      image: 'https://img.freepik.com/free-photo/aromatic-frappuccino-table_23-2148900665.jpg?t=st=1770554899~exp=1770558499~hmac=268489d9f3bf7b48a14e42bd8be3685732cedb2dfc0e020543098259b163513a',
      category: 'hot-beverages'
    },
    {
      id: 4,
      title: 'Latte',
      price: 890.00,
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'hot-beverages'
    },
    {
      id: 5,
      title: 'Donut',
      price: 450.00,
      image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'desserts'
    },
    {
      id: 6,
      title: 'Croissant',
      price: 380.00,
      image: 'https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?q=80&w=1155&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'savories'
    }
  ],

  // Cart actions
  addToCart: (product, quantity = 1) => {
    set({ isLoading: true, error: null });
    
    try {
      const { cart } = get();
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item exists
        const updatedCart = cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        set({ cart: updatedCart, isLoading: false });
      } else {
        // Add new item to cart
        const newItem = { ...product, quantity };
        set({ cart: [...cart, newItem], isLoading: false });
      }
    } catch (error) {
      set({ error: 'Failed to add item to cart', isLoading: false });
    }
  },

  removeFromCart: (productId) => {
    set({ isLoading: true, error: null });
    
    try {
      const { cart } = get();
      const updatedCart = cart.filter(item => item.id !== productId);
      set({ cart: updatedCart, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to remove item from cart', isLoading: false });
    }
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    set({ isLoading: true, error: null });
    
    try {
      const { cart } = get();
      const updatedCart = cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
      set({ cart: updatedCart, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to update quantity', isLoading: false });
    }
  },

  clearCart: () => {
    set({ cart: [], isLoading: false, error: null });
  },

  // UI state actions
  toggleCart: () => {
    set(state => ({ isCartOpen: !state.isCartOpen }));
  },

  openCart: () => {
    set({ isCartOpen: true });
  },

  closeCart: () => {
    set({ isCartOpen: false });
  },

  clearError: () => {
    set({ error: null });
  },

  // Computed values
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCartItemCount: () => {
    const { cart } = get();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Product actions
  getProductsByCategory: (category) => {
    const { products } = get();
    return products.filter(product => product.category === category);
  },

  getProductById: (id) => {
    const { products } = get();
    return products.find(product => product.id === id);
  }
}));

export default useCartStore;
