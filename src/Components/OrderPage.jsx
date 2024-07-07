import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotalQuantity, decrementCartItem, incrementCartItem, removeCartItem } from '../Redux/reducers/cartReducer'
import { useNavigate } from 'react-router-dom'

const OrderPage = () => {

    const orderItems = useSelector(state => state.cartDetails.orderedItems)
    const totalItems = useSelector(state=> state.cartDetails.orderedCount)
    const totalQuantity = useSelector(state => state.cartDetails.totalOrderedItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    
    return (
        <div className='container my-5'>
            <div>
                <div className="row justify-content-between">
                    <h3>Your Orders</h3>
                    <hr />
                    <div className="col-md-7 price_card p-3">
                        <h4>Meals List</h4>
                        <hr />
                        <div className='cart-details'>

                            {orderItems && orderItems.length > 0 ? orderItems.map((item, index) => (
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
                                            

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            )) : <div className='cartEmpty'><div >No Orders</div><button onClick={()=>navigate("/")}>Back to Categories</button></div> }







                        </div>
                    </div>
                    <div className="col-md-4 price_card p-3">
                        <h4>Price Details</h4>
                        <hr />

                        {orderItems && orderItems.length > 0 ?
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
                            <div className='d-flex justify-content-between my-2' style={{color: "red"}}>
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


                        </div> : <div className='cartEmpty'>No Items in Cart</div>}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OrderPage