import { useState, useEffect, useCallback, useMemo } from 'react';
import useCartStore from '../store/cartStore';

const useProducts = () => {
  const { products: storeProducts, getProductsByCategory, getProductById } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Debounced search term
  const debouncedSearchTerm = useMemo(() => {
    const timer = setTimeout(() => searchTerm, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Simulate API call for products - memoized
  const fetchProducts = useCallback(async (category = 'all', search = '') => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredProducts = storeProducts;
      
      if (category !== 'all') {
        filteredProducts = getProductsByCategory(category);
      }
      
      if (search) {
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      setLoading(false);
      return filteredProducts;
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
      return [];
    }
  }, [storeProducts, getProductsByCategory]);

  // Auto-fetch when category or search changes - debounced
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts(selectedCategory, searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchTerm, fetchProducts]);

  // Get available categories - memoized with counts
  const categories = useMemo(() => {
    const categoryMap = new Map();
    
    // Count products in each category
    storeProducts.forEach(product => {
      const count = categoryMap.get(product.category) || 0;
      categoryMap.set(product.category, count + 1);
    });
    
    return [
      { id: 'all', name: 'All Products', count: storeProducts.length },
      ...Array.from(categoryMap.entries()).map(([id, category]) => ({
        id,
        name: id.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        count: category
      }))
    ];
  }, [storeProducts]);

  // Filter products based on current filters - memoized
  const getFilteredProducts = useCallback(() => {
    let filtered = storeProducts;
    
    if (selectedCategory !== 'all') {
      filtered = getProductsByCategory(selectedCategory);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [storeProducts, selectedCategory, searchTerm, getProductsByCategory]);

  // Get featured products - memoized with randomization
  const getFeaturedProducts = useCallback(() => {
    if (storeProducts.length === 0) return [];
    
    // Get random 4 products for featured
    const shuffled = [...storeProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [storeProducts]);

  // Get products by price range - memoized
  const getProductsByPriceRange = useCallback((minPrice, maxPrice) => {
    return storeProducts.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  }, [storeProducts]);

  // Get product statistics - memoized
  const productStats = useMemo(() => {
    if (storeProducts.length === 0) {
      return {
        totalProducts: 0,
        averagePrice: 0,
        minPrice: 0,
        maxPrice: 0,
        priceRange: { min: 0, max: 0 }
      };
    }

    const prices = storeProducts.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    return {
      totalProducts: storeProducts.length,
      averagePrice,
      minPrice,
      maxPrice,
      priceRange: { min: minPrice, max: maxPrice }
    };
  }, [storeProducts]);

  // Search products - memoized
  const searchProducts = useCallback((query) => {
    if (!query || query.trim() === '') {
      return storeProducts;
    }
    
    const searchLower = query.toLowerCase().trim();
    return storeProducts.filter(product =>
      product.title.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  }, [storeProducts]);

  // Sort products - memoized
  const sortProducts = useCallback((products, sortBy = 'title', order = 'asc') => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'category':
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        return products;
    }
    
    return order === 'desc' ? sorted.reverse() : sorted;
  }, []);

  // Memoized computed values
  const products = useMemo(() => getFilteredProducts(), [getFilteredProducts]);
  const featuredProducts = useMemo(() => getFeaturedProducts(), [getFeaturedProducts]);

  // Optimized actions
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory('all');
    setSearchTerm('');
  }, []);

  return {
    // State
    products,
    allProducts: storeProducts,
    featuredProducts,
    loading,
    error,
    selectedCategory,
    searchTerm,
    categories,
    productStats,
    
    // Actions
    setSelectedCategory: handleCategoryChange,
    setSearchTerm: handleSearchChange,
    fetchProducts,
    searchProducts,
    sortProducts,
    clearFilters,
    
    // Computed values
    filteredProducts: products,
    
    // Utility functions
    getProductById,
    getProductsByCategory,
    getProductsByPriceRange
  };
};

export default useProducts;
