import React, { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import CartItem from '../ui/CartItem';
import useCart from '../../hooks/useCart';
import './CartContainer.css';

const CartContainer = React.memo(() => {
  const {
    cart,
    isCartOpen,
    isLoading,
    error,
    cartTotal,
    cartItemCount,
    removeFromCart,
    updateQuantity,
    clearCart,
    closeCart,
    formatPrice,
  } = useCart();

  const handleQuantityChange = useCallback((productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  }, [updateQuantity]);

  const handleRemoveItem = useCallback((productId) => {
    removeFromCart(productId);
  }, [removeFromCart]);

  const handleClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  const handleCheckout = useCallback(() => {
    // Placeholder for checkout functionality
    alert('Checkout functionality would be implemented here!');
  }, []);

  const handleCloseCart = useCallback(() => {
    closeCart();
  }, [closeCart]);

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="cart-overlay" onClick={handleCloseCart}>
        <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h3>Your Cart ({cartItemCount} items)</h3>
            <button className="close-btn" onClick={handleCloseCart} aria-label="Close cart">
              ×
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h4>Your cart is empty</h4>
                <p>Add some delicious items to get started!</p>
              </div>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  isLoading={isLoading}
                />
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-summary">
                <div className="cart-total">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="cart-tax">
                  <span>Tax (10%):</span>
                  <span>{formatPrice(cartTotal * 0.1)}</span>
                </div>
                <div className="cart-final-total">
                  <span>Total:</span>
                  <span>{formatPrice(cartTotal * 1.1)}</span>
                </div>
              </div>
              
              <div className="cart-actions">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleClearCart}
                  disabled={isLoading}
                >
                  Clear Cart
                </button>
                <button
                  className="btn btn-primary checkout-btn"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
});

CartContainer.displayName = 'CartContainer';

export default CartContainer;
