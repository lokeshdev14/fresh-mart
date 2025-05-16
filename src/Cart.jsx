import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Cart.css'
import {  clearCart, DecreamentCart, IncreamentCart, removeCart } from './store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import QRCode from 'react-qr-code';


function Cart() {
  
  let cartObjects=useSelector(globalState=>globalState.cart);
  let carItems=cartObjects.map((cartItem, index) => (
    <div key={index} className="cart-card">
      <img src={cartItem.image} width={150} height={150} alt={cartItem.name} />
      <div className="cart-name">{cartItem.name}</div>
      <div className="cart-price">₹{cartItem.price}</div>
      <div className="cart-buttons">
        <button className="inc-btn" onClick={() => dispatch(IncreamentCart(cartItem))}>+</button>
        <button className="cart-quantity">{cartItem.quantity}</button>
        <button className="dec-btn" onClick={() => dispatch(DecreamentCart(cartItem))}>-</button>
      </div>
      <button onClick={() => dispatch(removeCart(cartItem))} className="remove-btn">🗑️ Remove</button>
    </div>
  ));

  let dispatch=useDispatch();
   let [discountPercentage,setDiscountPercentage]=useState(0);
   
   const couponCodeRef=useRef();

     let [couponCodeDiscountPer,setCouponCodeDiscountPer]=useState(0);
     let [couponName,setCouponName]=useState("");
      
     let handlingCouponPer=()=>{
      const couponCode=couponCodeRef.current.value.trim().toUpperCase();
      setCouponName(couponCode);
      switch(couponCode){
        case 'DIWALI10':setCouponCodeDiscountPer(10);
        break;
        case 'DIWALI20':setCouponCodeDiscountPer(20);
        break;
        case "NEWYEAR15":setCouponCodeDiscountPer(15);
        break;
        default:alert('Invalid Coupon Code');
                 setCouponCodeDiscountPer("");

      }
     };

    

    const calculatingAmount=()=>{
      let totalPrice=cartObjects.reduce((totalPrice,item)=>totalPrice+item.price*item.quantity,0);
      const discountAmount=totalPrice*(discountPercentage/ 100);
      const discountCouponAmount=totalPrice*(couponCodeDiscountPer/ 100);
      let priceAfterDiscount=totalPrice-discountAmount-discountCouponAmount;
      let taxPrice=priceAfterDiscount*0.05;
      let finalPrice=priceAfterDiscount+taxPrice;
      return {totalPrice,discountAmount,taxPrice,finalPrice,discountCouponAmount};


    }
     const{totalPrice,discountAmount,taxPrice,finalPrice,discountCouponAmount}=calculatingAmount();

     const emailInputRef = useRef();
     const navigate =useNavigate();
     
   
   const [paymentMethod, setPaymentMethod] = useState("QR");
  const [email, setEmail] = useState('');
  const [thankYouMessage, setThankYouMessage] = useState(false);
  
     const handlePurchase = () => {
    const orderId = 'ORD-' + Date.now();
    const date = new Date().toLocaleString();

    const templateParams = {
      order_Id: orderId,
      orders: cartObjects.map(item => ({
        image_url:item.image,
        name: item.name,
        price: (item.price * item.quantity).toFixed(2),
        units: item.quantity
      })),
      cost: {
        shipping: 50,
        tax: taxPrice.toFixed(2),
        total: finalPrice.toFixed(2)
      },
      email: email
    };

    emailjs.send('service_w9ya3fn', 'template_mcs75mm', templateParams, 'tSuMJvkBn-KgYS5Zk')
      .then(() => console.log('✅ Email sent'))
      .catch(err => console.error('❌ Email failed', err));

    const order = {
      OrderId: orderId,
      DateTime: date,
      items: cartObjects,
      finalPrice: finalPrice
    };

    
    dispatch(clearCart());
    setThankYouMessage(true);

    setTimeout(() => navigate('/Orders'), 1500);
  };

     
  
  return (
    <div className="cart-container">
         <h1 className="cart-title">🛒 Your Shopping Cart</h1>
         {cartObjects.length === 0 ? (
    <div className="empty-cart">
      <h2>Your cart is empty.</h2>
    </div>
  ) : (
    <>
      
      <div className="cart-card-grid">
       {carItems}
      </div>
      

<div className="cart-summary">
  <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
  <div className="discount-buttons">
  <button onClick={() => setDiscountPercentage(10)}>Add 10% Discount</button>
  <button onClick={() => setDiscountPercentage(15)}>Add 15% Discount</button>
  <button onClick={() => setDiscountPercentage(25)}>Add 25% Discount</button>
 </div>
 <div className="checkout-container">
  <h4>Discount Amount ({discountPercentage}%): ₹{discountAmount.toFixed(2)}</h4>
  <input type="text" ref={couponCodeRef} placeholder="Enter Coupon Code" />
  <button onClick={handlingCouponPer}>Apply Coupon</button>
  <h4>Discount Coupon Amount {couponName}: ₹{discountCouponAmount.toFixed(2)}</h4>
  <h4>Tax Amount (5%): ₹{taxPrice.toFixed(2)}</h4>
  <h2>Final Amount: ₹{finalPrice.toFixed(2)}</h2>

  <label>Enter your email:</label>
  <input
    ref={emailInputRef}
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="your@email.com"
  />

  <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
  <button onClick={handlePurchase}>Complete Purchase</button>

  <div className="payment-method">
    <h3>Select Payment Method:</h3>
    <button onClick={() => setPaymentMethod('QR')}>QR Code</button>
    <button onClick={() => setPaymentMethod('card')}>Card</button>
  </div>

  {paymentMethod === 'QR' && (
    <div className="qr-section">
      <h4>Scan to pay ₹{finalPrice.toFixed(2)}</h4>
      <QRCode value={`upi://pay?pa=8008261380@ybl&pn=RatanStore&am=${finalPrice.toFixed(2)}&cu=INR`} />
      <p>UPI ID: 8008261380@ybl</p>
    </div>
  )}

  {paymentMethod === 'card' && (
    <div className="card-section">
      <h4>Enter Card Details</h4>
      <label>
        Card Number:
        <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" />
      </label>
      <label>
        Cardholder Name:
        <input type="text" placeholder="John Doe" maxLength="20" />
      </label>
      <label>
        Expiry Date:
        <input type="text" placeholder="MM/YY" maxLength="5" />
      </label>
      <label>
        CVV:
        <input type="password" placeholder="123" maxLength="3" />
      </label>
    </div>
  )}
</div>

  </div>
      
      
    </>
  )}
</div>
        
  );

}

export default Cart