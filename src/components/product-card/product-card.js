import React from 'react';
import './product-card.css';

const ProductCards = () => {
  const products = [
    {
      title: 'Hot Coffee',
      price: 'Rs. 740.00',
      image: 'https://th.bing.com/th/id/OIP.L7MLp1Z0v5Wz6KaKPy07FQHaE8?r=0&rs=1&pid=ImgDetMain'
    },
    {
      title: 'Hot Coffee',
      price: 'Rs. 740.00',
      image: 'https://th.bing.com/th/id/OIP.L7MLp1Z0v5Wz6KaKPy07FQHaE8?r=0&rs=1&pid=ImgDetMain'
    },
    {
      title: 'Hot Coffee',
      price: 'Rs. 740.00',
      image: 'https://th.bing.com/th/id/OIP.L7MLp1Z0v5Wz6KaKPy07FQHaE8?r=0&rs=1&pid=ImgDetMain'
    }
  ];

  return (
    <div className="body">
      <div className="product-cards">
        {products.map((product, index) => (
          <div className="card" style={{ width: '20rem' }} key={index}>
            <div className="image-wrapper">
              <div className="image-padding">
                <img src={product.image} className="card-img-center" alt={product.title} />
                <span className="heart">&hearts;</span>
              </div>
              <div className="heart">♡</div>
            </div>
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <br />
              <hr />
              <p className="card-text text-center">{product.price}</p>
              <a href="#" className="btn btn-primary">Add to cart</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
