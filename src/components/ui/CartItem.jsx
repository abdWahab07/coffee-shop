import React from 'react';
import { motion } from 'framer-motion';
import './CartItem.css';

const CartItem = React.memo(({ 
  item, 
  onQuantityChange, 
  onRemove, 
  isLoading = false 
}) => {
  const { id, title, price, image, quantity } = item;

  const formatPrice = (price) => {
    return `Rs. ${price.toFixed(2)}`;
  };

  const handleQuantityDecrease = React.useCallback(() => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  }, [id, quantity, onQuantityChange]);

  const handleQuantityIncrease = React.useCallback(() => {
    onQuantityChange(id, quantity + 1);
  }, [id, onQuantityChange]);

  const handleRemove = React.useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  return (
    <motion.div
      className="cart-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="item-image">
        <img src={image} alt={title} loading="lazy" />
      </div>
      
      <div className="item-details">
        <h5 className="item-title">{title}</h5>
        <p className="item-price">{formatPrice(price)}</p>
        
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={handleQuantityDecrease}
            disabled={quantity <= 1 || isLoading}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={handleQuantityIncrease}
            disabled={isLoading}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="item-actions">
        <p className="item-total">{formatPrice(price * quantity)}</p>
        <button
          className="remove-btn"
          onClick={handleRemove}
          disabled={isLoading}
          aria-label="Remove item from cart"
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;
