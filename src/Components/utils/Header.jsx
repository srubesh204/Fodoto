import React from 'react'
import { IoMdCart } from "react-icons/io";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LuShoppingBasket } from "react-icons/lu";


const Header = () => {
  const navigate = useNavigate();
  const cartQuantity = useSelector((state)=> state.cartDetails)
  
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary p-3">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">Foodoto</Link>
        {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> */}
        <div class="nav-content" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li> */}
          </ul>
          <form class="d-flex" role="search">
            
              <button type="button" className="position-relative me-3" onClick={()=> navigate('/cart')}>
                <IoMdCart />
                {cartQuantity && cartQuantity.count !== 0 &&
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartQuantity.count}
                  <span class="visually-hidden">unread messages</span>
                </span>}
                <span> Cart</span>
              </button>
              <button type="button" class=" position-relative" onClick={()=> navigate('/orders')}>
                <LuShoppingBasket /> Orders
                
              </button>
         
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Header