import React from 'react';
import { motion } from 'framer-motion';
import './ProductCard.css';

const ProductCard = React.memo(({ 
  product, 
  onAddToCart, 
  isInCart, 
  isLoading = false,
  showAddButton = true,
  className = '',
  animationDelay = 0
}) => {
  const { id, title, price, image, category } = product;
  const [imageError, setImageError] = React.useState(false);

  const formatPrice = (price) => {
    return `Rs. ${price.toFixed(2)}`;
  };

  const handleAddToCart = React.useCallback(() => {
    onAddToCart(product);
  }, [product, onAddToCart]);

  const handleImageError = () => {
    setImageError(true);
  };

  const getFallbackImage = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('coffee') && titleLower.includes('hot')) {
      return 'https://images.unsplash.com/photo-1511920154173-a3b3317bd1e3?auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('coffee') && titleLower.includes('iced')) {
      return 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('cappuccino')) {
      return 'https://images.unsplash.com/photo-1572442388296-d3f4a856e1c5?auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('latte')) {
      return 'https://images.unsplash.com/photo-1534790566921-3dc28ac0b696?auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('donut')) {
      return 'https://images.unsplash.com/photo-1551024603-b17ea61c5d89?auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('croissant')) {
      return 'https://images.unsplash.com/photo-1555507031-656c8e6b76b1?auto=format&fit=crop&w=800&q=80';
    }
    return 'https://images.unsplash.com/photo-1511920154173-a3b3317bd1e3?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <motion.div
      className={`product-card ${className}`}
      initial={{ scale: 0.7, rotate: -3, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: animationDelay, type: "spring" }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
    >
      <div className="product-image-container">
        <img 
          src={imageError ? getFallbackImage(title) : image} 
          alt={title} 
          className="product-image" 
          loading="lazy"
          onError={handleImageError}
        />
        <div className="product-category">{category}</div>
      </div>
      
      <div className="product-content">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">{formatPrice(price)}</p>
        
        {showAddButton && (
          <button
            className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            disabled={isInCart || isLoading}
          >
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        )}
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
