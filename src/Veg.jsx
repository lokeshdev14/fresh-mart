import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './veg.css'
import { addToCart } from './store';


function Veg()
 {
  let vegProducts=useSelector(globalState=>globalState.products.veg);
  let dispatch=useDispatch();
  let vegItems= vegProducts.map((product, index) => (
    <div key={index} className="veg-card">
      <img src={product.image} width={150} height={150} />
      <div className="veg-name">{product.name}</div>
      <div className="veg-price">₹{product.price}</div>
      <button className="add-to-cart-btn" onClick={()=>dispatch(addToCart(product))} >
        Add to Cart 🛒
      </button>
     </div>
  ));

  return (
    <div className="veg-container">
      <h1 className="veg-title">🥦 Veg Products</h1>
      <div className="veg-card-grid">
       {vegItems}
      </div>
        
      
    </div>
      )
}

export default Veg