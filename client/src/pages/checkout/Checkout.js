import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import CheckoutItem from '../../components/CheckoutItem/CheckoutItem'
import Button from '../../components/CustomButton/CustomButton.js'
import {selectCartItems, selectCartTotal} from '../../redux/cart/cartSelectors'
import StripeCheckoutButton from '../../components/StripeButton/StripeButton'
 import './Checkout.scss'

const CheckoutPage = ({cartItems, total}) =>{
       
    return(
     
        <div className='checkout-page'>
            <div className='checkout-header'>
                 <div className='header-block'>
                     <span>Product</span>
                </div>
                <div className='header-block'>
                     <span>Description</span>
                </div>
                <div className='header-block'>
                     <span>Quantity</span>
                </div>
                <div className='header-block'>
                     <span>Price</span>
                </div>
                <div className='header-block'>
                     <span>Remove</span>
                </div>
            </div>
            {cartItems.map(cartItem=><CheckoutItem key={cartItem.id}cartItem={cartItem}/>)}
            <div className='total'>
                <span>Total: ${total}</span>
            </div> 
            <StripeCheckoutButton price={total} cartItem={cartItems}/>           
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})
export default connect(mapStateToProps)(CheckoutPage)