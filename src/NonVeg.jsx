import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './nonveg.css'
import { addToCart } from './store';

function NonVeg() {
  let vegProducts=useSelector(globalState=>globalState.products.nonveg);
  let dispatch=useDispatch();
  let nonVegItems=vegProducts.map((product, index) => (
    <div key={index} className="nonveg-card">
      <img src={product.image} width={150} height={150} />
      <div className="nonveg-name">{product.name}</div>
      <div className="nonveg-price">₹{product.price}</div>
      <button className="add-to-cart-btn" onClick={()=>dispatch(addToCart(product))}>
        Add to Cart 🛒
      </button>
    </div>
  ));

  return (
    <div className="nonveg-container">
      <h1 className="nonveg-title">🍗 Non-Veg Products</h1>
      <div className="nonveg-card-grid">
        {nonVegItems}
      </div>
    </div>
  )
}

export default NonVeg