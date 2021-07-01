import React from 'react'
import {connect, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {useHistory} from 'react-router-dom'
import CustomButton from '../../components/CustomButton/CustomButton'
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem'
import Button from '../../components/CustomButton/CustomButton.js'
import {selectCartItems, selectCartTotal} from '../../redux/cart/cartSelectors'
import StripeCheckoutButton from '../../components/StripeButton/StripeButton'
import { newOrderStart } from '../../redux/orders/orderActions'
 import './Checkout.scss'
import { selectCurrentUser } from '../../redux/user/userSelectors'

const CheckoutPage = ({cartItems, total, newOrderStart, currentUser}) =>{
    const {checkoutId} = useSelector(state=>state.order)
    const history = useHistory()

    const order ={
        cartItems,
        total,
        currentUser,
        status:'started'
    }
     const onClick=()=>{
       
        newOrderStart(order)
     }

     if(checkoutId){
        history.push({
            pathname: `/checkout/${checkoutId}/complete-checkout`,
            customNameData: order,
          })
     }
    return(
     
        <div className='checkout-page'>
            <h1>Items In Your Cart:</h1>
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
            <CustomButton onClick={()=>onClick()}>Proceed To Checkout</CustomButton>        
        </div>
    )
}
const mapDispatchToProps = dispatch =>({
    newOrderStart: (order)=>dispatch(newOrderStart(order))
})
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)