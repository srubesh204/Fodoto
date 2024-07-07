import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { setLoader } from '../Redux/reducers/loaderSlice';
import { calculateTotalQuantity, setCartCount, setCartItems } from '../Redux/reducers/cartReducer';
import Swal from 'sweetalert2';
import { MdOutlineDone } from 'react-icons/md';

const Products = () => {
  const cartItems = useSelector((state) => state.cartDetails.items)
  const { id } = useParams();
  const dispatch = useDispatch()

 

  const [products, setProducts] = useState([])

  const getProductByCategory = async () => {
    dispatch(setLoader(true));
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
      setProducts(response.data.meals);
      dispatch(setLoader(false))
    } catch (err) {
      console.log('error')
    } finally {
      dispatch(setLoader(false));
    }
  }

  useEffect(() => {
    getProductByCategory();
  }, [id])


  const addtoCart = (item) => {
    dispatch(setCartItems({
      name: item.strMeal,
      image: item.strMealThumb,
      id: item.idMeal,
      quantity: 1
    }))
    dispatch(setCartCount(1));
    dispatch(calculateTotalQuantity())
    Swal.fire({
      title: "Good job!",
      text: "Item added to cart successfully!",
      icon: "success"
    });
  }

  const itemFound = (itemId) => {
    if (cartItems && cartItems.length > 0) {
      const item = cartItems.filter(item => item.id === itemId)
      if (item && item.length > 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  

  return (
    <div className='container my-5'>
      <div>
        <div className="row g-4">
          {products.length > 0 && products.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-4">

              
                <div className="card custom-card">
                <Link to={`/product-detail/${item.idMeal}`} className="custom-link">
                <img src={item.strMealThumb} className="card-img-top custom-img" alt={item.strMeal} /></Link>
                  <div className="card-body">
                    <h6 className="card-title w-100">{item.strMeal}</h6>
                    {/* <p className="card-text">{item.strCategoryDescription}</p> */}
                    <div className='d-flex justify-content-end'>
                      {/* <div class="card__counter">
                        <button class="card__btn">-</button>
                        <div class="card__counter-score">1</div>
                        <button class="card__btn card__btn-plus">+</button>
                      </div> */}
                      {itemFound(item.idMeal) ? 
                      <button class="CartBtn" style={{backgroundColor: "green"}} disabled>
                        <span class="IconContainer"><MdOutlineDone /></span>
                        <p className="text">Added to Cart</p>
                        </button> :

                        <button class="CartBtn" onClick={() => addtoCart(item)}>
                          <span class="IconContainer">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                          </span>
                          <p className='text' >Add to Cart</p>
                        </button>}
                    </div>


                  </div>
                </div>
              
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Products