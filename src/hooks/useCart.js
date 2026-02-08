import { useEffect, useCallback, useMemo } from 'react';
import useCartStore from '../store/cartStore';

const useCart = () => {
  const {
    cart,
    products,
    isLoading,
    error,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    clearError,
    getCartTotal,
    getCartItemCount,
    getProductsByCategory,
    getProductById
  } = useCartStore();

  // Auto-save cart to localStorage - memoized to prevent unnecessary effects
  const saveCartToStorage = useCallback((cartItems) => {
    try {
      if (cartItems.length > 0) {
        localStorage.setItem('coffee-shop-cart', JSON.stringify(cartItems));
      } else {
        localStorage.removeItem('coffee-shop-cart');
      }
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, []);

  // Restore cart from localStorage - memoized
  const restoreCartFromStorage = useCallback(() => {
    try {
      const savedCart = localStorage.getItem('coffee-shop-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Restore cart state
        parsedCart.forEach(item => {
          addToCart(item, item.quantity);
        });
      }
    } catch (error) {
      console.error('Failed to restore cart from localStorage:', error);
    }
  }, [addToCart]);

  // Auto-save cart to localStorage
  useEffect(() => {
    restoreCartFromStorage();
  }, [restoreCartFromStorage]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart, saveCartToStorage]);

  // Format price helper - memoized
  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 2
    }).format(price);
  }, []);

  // Check if product is in cart - memoized
  const isInCart = useCallback((productId) => {
    return cart.some(item => item.id === productId);
  }, [cart]);

  // Get item quantity in cart - memoized
  const getItemQuantity = useCallback((productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [cart]);

  // Get item total price - memoized
  const getItemTotal = useCallback((productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.price * item.quantity : 0;
  }, [cart]);

  // Get cart items count - memoized
  const cartItemCount = useMemo(() => getCartItemCount(), [getCartItemCount]);
  
  // Get cart total - memoized
  const cartTotal = useMemo(() => getCartTotal(), [getCartTotal]);

  // Get cart subtotal, tax, and total - memoized
  const cartSummary = useMemo(() => {
    const subtotal = cartTotal;
    const taxRate = 0.1; // 10% tax
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    return {
      subtotal,
      tax,
      total,
      taxRate
    };
  }, [cartTotal]);

  // Get cart items with computed values - memoized
  const cartItemsWithDetails = useMemo(() => {
    return cart.map(item => ({
      ...item,
      total: item.price * item.quantity,
      formattedPrice: formatPrice(item.price),
      formattedTotal: formatPrice(item.price * item.quantity)
    }));
  }, [cart, formatPrice]);

  // Check if cart is empty - memoized
  const isCartEmpty = useMemo(() => cart.length === 0, [cart]);

  // Get unique product categories in cart - memoized
  const cartCategories = useMemo(() => {
    const categories = [...new Set(cart.map(item => item.category))];
    return categories.filter(Boolean);
  }, [cart]);

  // Optimized cart actions
  const optimizedAddToCart = useCallback((product, quantity = 1) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }
    addToCart(product, quantity);
  }, [addToCart]);

  const optimizedRemoveFromCart = useCallback((productId) => {
    if (!productId) {
      console.error('Invalid product ID:', productId);
      return;
    }
    removeFromCart(productId);
  }, [removeFromCart]);

  const optimizedUpdateQuantity = useCallback((productId, quantity) => {
    if (!productId || quantity < 0) {
      console.error('Invalid parameters:', { productId, quantity });
      return;
    }
    updateQuantity(productId, Math.max(0, quantity));
  }, [updateQuantity]);

  const optimizedClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  return {
    // State
    cart: cartItemsWithDetails,
    cartItemCount,
    cartTotal,
    cartSummary,
    isCartEmpty,
    cartCategories,
    isCartOpen,
    isLoading,
    error,
    
    // Actions
    addToCart: optimizedAddToCart,
    removeFromCart: optimizedRemoveFromCart,
    updateQuantity: optimizedUpdateQuantity,
    clearCart: optimizedClearCart,
    toggleCart,
    openCart,
    closeCart,
    clearError,
    
    // Computed values
    isInCart,
    getItemQuantity,
    getItemTotal,
    formatPrice,
    
    // Product utilities
    products,
    getProductsByCategory,
    getProductById
  };
};

export default useCart;
