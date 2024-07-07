import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { calculateTotalQuantity, incrementCartItem, setCartCount, setCartItemCount, setCartItems } from '../Redux/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setLoader } from '../Redux/reducers/loaderSlice';

const ProductDetail = () => {

  const { id } = useParams();
  const cartItems = useSelector((state) => state.cartDetails.items)
  const dispatch = useDispatch();
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)

  const loaderState = useSelector((state) => state.loader)

  const getProductDetails = async () => {
    dispatch(setLoader(true))
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      setProduct(response.data?.meals[0])
    } catch (err) {
      console.log(err)
    }finally{
      dispatch(setLoader(false))
    }
  }

  useEffect(() => {
    getProductDetails();
  }, []);


  const addtoCart = (itemData) => {

    if (cartItems && cartItems.length > 0) {
      const item = cartItems.filter(item => item.id === itemData.idMeal)
      if (item && item.length > 0) {
        dispatch(setCartItemCount(
          {
            id: item[0].id,
            count: quantity
          }));
        dispatch(calculateTotalQuantity())
        Swal.fire({
          title: "Good job!",
          text: "Item added to cart successfully!",
          icon: "success"
        });
      }
    } else {
      dispatch(setCartItems({
        name: itemData.strMeal,
        image: itemData.strMealThumb,
        id: itemData.idMeal,
        quantity: quantity
      }))
      dispatch(setCartCount(1));
      dispatch(calculateTotalQuantity())
      Swal.fire({
        title: "Good job!",
        text: "Item added to cart successfully!",
        icon: "success"
      });
    }



  }


  return (
    <div className='container my-5'>
      {product &&
      <div className='row'>
        <div className="col-md-5">
          <img className='img-fluid card-img-top custom-img rounded' src={product?.strMealThumb} alt={product?.strMeal} />
        </div>
        <div className="col-md-7 my-3">
          <div>
            <h2>{product?.strMeal}</h2>
            <div className="d-flex justify-content-start my-3">
              <span class="badge text-bg-secondary me-2">{product?.strCategory}</span>
              <span class="badge text-bg-warning me-2">{product?.strArea}</span>
              <span class="badge text-bg-primary">{product?.strTags}</span>
            </div>
            <div><h5>Instructions</h5></div>
            <div className='ins cart-details'>
              <p>{product?.strInstructions}</p>
            </div>
            <div className='d-flex justify-content-end my-4 me-3'>
              <div class="card__counter me-3">
                <button class="card__btn" disabled={quantity === 0} onClick={() => setQuantity(prev => prev - 1)} >-</button>
                <div class="card__counter-score">{quantity}</div>
                <button class="card__btn card__btn-plus" disabled={quantity === 10} onClick={() => setQuantity(prev => prev + 1)}>+</button>

              </div>
              <button class="CartBtn" onClick={() => addtoCart(product)}>
                <span class="IconContainer">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                </span>
                <p className='text' >Add to Cart</p>
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default ProductDetail