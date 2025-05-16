import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import NonVeg from './NonVeg'
import Veg from './Veg'
import Home from './Home'
import Milk from './Milk'
import Chocolate from './Chocolate'
import Signin from './Signin'
import Cart from './Cart'
import Orders from './Orders'
import Aboutus from './Aboutus'
import Contactus from './Contactus'
import './menu.css'
import './App.css'
import { useSelector } from 'react-redux'
import { FaHome, FaDrumstickBite, FaCarrot, FaShoppingCart, FaUserLock, FaInfoCircle, FaPhone, FaBoxOpen, FaIceCream, FaGlassWhiskey } from 'react-icons/fa';

function App() {

   let cartItems = useSelector(globalState => globalState.cart);  // 'cart' is your slice name

  
   const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
    
    <BrowserRouter>
    

<nav className="menu">
<div className="menu-section menu-left"><h3>Fresh Mart</h3></div>
<div className="menu-section menu-center">
    <Link to="/homepage"><FaHome /> Home</Link>
    <Link to="/nonveg"><FaDrumstickBite /> Non-Veg Items</Link>
    <Link to="/veg"><FaCarrot /> Veg Items</Link>
    <Link to="/milk"><FaGlassWhiskey /> Milk Items</Link>
    <Link to="/chocolate"><FaIceCream /> Chocolate Items</Link>
    <Link to="/cart" className="cart-link"><FaShoppingCart />
 
  <span className="cart-badge">{totalCount}</span>
</Link>

    <Link to="/orders"><FaBoxOpen /> Orders</Link>
    </div>
    <div className="menu-section menu-center">
    <Link to="/aboutus"><FaInfoCircle /> About Us</Link>
    <Link to="/contactus"><FaPhone /> Contact Us</Link>
    <Link to="/signin"><FaUserLock /> Sign In</Link>
  </div>
</nav>


<div className='main-content'>
    <Routes>
      <Route path='/homepage' element={<Home/>}/>
      <Route path='/nonveg' element={<NonVeg/>}/>
      <Route path='/veg' element={<Veg/>}/>
      <Route path='/milk' element={<Milk/>}/>
      <Route path='/chocolate' element={<Chocolate/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/aboutus' element={<Aboutus/>}/>
      <Route path='/contactus' element={<Contactus/>}/>
      
    </Routes>
    </div>
    </BrowserRouter>
    
    </>
  )
}

export default App