import React from 'react'
import './milk.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';

function Milk() { 
  let milkProducts=useSelector(globalState=>globalState.products.milkItems);

  let milkItems=milkProducts.map((product, index) => (
    <div key={index} className="milk-card">
      <img src={product.image} width={150} height={150} />
      <div className="milk-name">{product.name}</div>
      <div className="milk-price">₹{product.price}</div>
      <button className="add-to-cart-btn" onClick={()=>dispatch(addToCart(product))} >
        Add to Cart 🛒
      </button>
    </div>
  ))
  let dispatch=useDispatch();

  return (
    <div className="milk-container">
      <h1 className="milk-title">🥛 Dairy Delights</h1>
      <div className="milk-card-grid">
        {milkItems}
      </div>
    </div>)
}

export default Milk