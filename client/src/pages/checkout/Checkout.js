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
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { updateAllOrders } from '../../firebase/firebase.utils'


const CheckoutPage = ({cartItems, total, newOrderStart, currentUser}) =>{
   
    const {checkoutId} = useSelector(state=>state.order)
    const history = useHistory()
    const billingEmail= currentUser ? currentUser.email : ''
    const order ={
        cartItems,
        total,
        billingEmail,
        currentUser,
        status:'started'
    }
     const onClick=()=>{
       
        newOrderStart(order)
     }

     if(checkoutId){
        history.push({
            pathname: `/checkout/${checkoutId}/complete-checkout`,
            state: order,
          })
     }
    return(
     
        <div className='checkout-page'>
            <h1>Items In Your Cart:</h1>
            <Row className='checkout-header'>
                 <Col className='text-center header-block'>
                     <span>Product</span>
                </Col>
                <Col className='text-center header-block'>
                     <span>Description</span>
                 </Col>
                <Col className=' text-center header-block'>
                     <span>Quantity</span>
                 </Col>
                <Col className=' text-center header-block'>
                     <span>Price</span>
                 </Col>
                <Col className=' text-center header-block'>
                     <span>Remove</span>
                 </Col>
            </Row>
            {cartItems.map(cartItem=><CheckoutItem key={cartItem.id}cartItem={cartItem}/>)}
            <div className='total'>
                <span>Subtotal: ${total}</span>
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