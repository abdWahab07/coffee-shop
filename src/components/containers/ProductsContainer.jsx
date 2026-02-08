import React, { useCallback, useMemo } from 'react';
import ProductCard from '../ui/ProductCard';
import ProductSkeleton from '../ui/ProductSkeleton';
import useProducts from '../../hooks/useProducts';
import useCart from '../../hooks/useCart';
import './ProductsContainer.css';

const ProductsContainer = React.memo(({ 
  category = 'all', 
  searchTerm = '',
  limit = null,
  featured = false,
  className = ''
}) => {
  const { 
    products, 
    loading, 
    error, 
    featuredProducts,
    setSelectedCategory,
    setSearchTerm: setSearch
  } = useProducts();
  
  const { addToCart, isInCart, isLoading: cartLoading } = useCart();

  // Set filters when props change
  React.useEffect(() => {
    if (category !== 'all') {
      setSelectedCategory(category);
    }
    if (searchTerm) {
      setSearch(searchTerm);
    }
  }, [category, searchTerm, setSelectedCategory, setSearch]);

  // Determine which products to show
  const displayProducts = useMemo(() => {
    let productsToShow = featured ? featuredProducts : products;
    
    if (limit && limit > 0) {
      productsToShow = productsToShow.slice(0, limit);
    }
    
    return productsToShow;
  }, [featured, products, featuredProducts, limit]);

  const handleAddToCart = useCallback((product) => {
    addToCart(product);
  }, [addToCart]);

  if (loading && displayProducts.length === 0) {
    const skeletonCount = limit || 4;
    return (
      <div className={`products-container loading ${className}`}>
        <ProductSkeleton count={skeletonCount} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`products-container error ${className}`}>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (displayProducts.length === 0) {
    return (
      <div className={`products-container empty ${className}`}>
        <div className="empty-message">
          <h3>No products found</h3>
          <p>Try adjusting your filters or search terms.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`products-container ${className}`}>
      <div className="products-grid">
        {displayProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            isInCart={isInCart(product.id)}
            isLoading={cartLoading}
            animationDelay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
});

ProductsContainer.displayName = 'ProductsContainer';

export default ProductsContainer;
