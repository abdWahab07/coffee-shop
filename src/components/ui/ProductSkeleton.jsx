import React from 'react';
import './ProductSkeleton.css';

const ProductSkeleton = ({ count = 1 }) => {
  return (
    <div className="product-skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="product-skeleton">
          <div className="skeleton-image">
            <div className="skeleton-shimmer"></div>
          </div>
          <div className="skeleton-content">
            <div className="skeleton-title">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-price">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-button">
              <div className="skeleton-shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
