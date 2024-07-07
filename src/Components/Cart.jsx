import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotalQuantity, decrementCartItem, incrementCartItem, placeOrder, removeCartItem, resetCart } from '../Redux/reducers/cartReducer'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const cartItems = useSelector(state => state.cartDetails.items)
    const totalItems = useSelector(state => state.cartDetails.count)
    const totalQuantity = useSelector(state => state.cartDetails.totalQuantity)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const decCartItem = (itemId) => {

        const selectingItem = cartItems.filter(item => item.id === itemId)
        console.log(selectingItem)
        if (selectingItem[0].quantity === 1) {
            dispatch(removeCartItem(itemId))
            dispatch(calculateTotalQuantity())
        } else {
            dispatch(decrementCartItem(itemId))
            dispatch(calculateTotalQuantity())
        }

    }


    const incCartItem = (itemId) => {

        const selectingItem = cartItems.filter(item => item.id === itemId)
        if (selectingItem[0]) {
            dispatch(incrementCartItem(itemId))
            dispatch(calculateTotalQuantity())
        }

    }

    const PlaceOrder = () => {
        Swal.fire({
            title: "Are you sure to place order?",

            denyButtonText: `Cancel`,
            confirmButtonText: "Yes",
            showDenyButton: true,
        }).then((result) => {
            dispatch(placeOrder());
            dispatch(resetCart());
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Order placed successfully",
                    
                    icon: "success",
                    confirmButtonText: "Go to orders"
                }).then((result) => {
                    if(result.isConfirmed){
                        navigate("/orders")
                    }
                    
                });
            } else if (result.isDenied) {

            }
        });
    }
    return (
        <div className='container my-5'>
            <div>
                <div className="row justify-content-between">
                    <h3>Cart</h3>
                    <hr />
                    <div className="col-md-7 price_card p-3">
                        <h4>Meals List</h4>
                        <hr />
                        <div className='cart-details'>

                            {cartItems && cartItems.length > 0 ? cartItems.map((item, index) => (
                                <Fragment key={index}>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img className='img-fluid' src={item.image} alt={item.name} />
                                        </div>
                                        <div className="col-md-7">
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="itemDetailCol col-md-3 d-flex flex-column justify-content-between">
                                            <div>
                                                <div className='d-flex justify-content-between'>
                                                    <div>Quantity</div>
                                                    <div>{item.quantity}</div>
                                                </div>
                                                <div className='d-flex justify-content-between '>
                                                    <div>Price</div>
                                                    <div>₹ 200</div>
                                                </div>

                                            </div>
                                            <div className='d-flex justify-content-end'>
                                                <div class="card__counter ">
                                                    <button class="card__btn" onClick={() => decCartItem(item.id)}>-</button>
                                                    <div class="card__counter-score">{item.quantity}</div>
                                                    <button class="card__btn card__btn-plus" onClick={() => incCartItem(item.id)}>+</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            )) : <div className='cartEmpty'><div >No Items in Cart</div><button onClick={() => navigate("/")}>Back to Categories</button></div>}







                        </div>
                    </div>
                    <div className="col-md-4 price_card p-3">
                        <h4>Price Details</h4>
                        <hr />
                        <div>

                            <div className='d-flex justify-content-between my-2'>
                                <div>Items</div>
                                <div>{totalItems}</div>
                            </div>
                            <div className='d-flex justify-content-between my-2'>
                                <div>Total Quantity</div>
                                <div>{totalQuantity}</div>
                            </div>
                            <div className='d-flex justify-content-between my-2'>
                                <div>MRP Price</div>
                                <div>₹{totalQuantity * 200}</div>
                            </div>
                            <div className='d-flex justify-content-between my-2' style={{ color: "red" }}>
                                <div>Discount</div>
                                <div>-₹{totalQuantity * 50}</div>
                            </div>
                            <div className='d-flex justify-content-between my-2'>
                                <div>Delivery Fee</div>
                                <div>₹{totalQuantity * 50}</div>
                            </div>

                            <div className='total_tag my-2'>
                                <div>Total Price</div>
                                <div>₹{totalQuantity * 200}</div>
                            </div>


                        </div>
                        <div className='text-end h-100 mt-3'>

                            <button className='btn btn-sm btn-success' onClick={() => PlaceOrder()}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cart