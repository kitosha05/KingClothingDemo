import React, {useState} from 'react'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {newOrderStart} from '../../redux/orders/orderActions'
import {clearCart} from '../../redux/cart/cartActions'

const StripeCheckoutButton = ({price, newOrderStart,  clearCart, currentUser, cartItems}) =>{

    const history = useHistory()
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51IxaOhAmFIyQdv340WmDturzFP1wHLaPzDhlRDSa8C1g62Qg3jFVX3dD8MVXrUxtasMWlgcZpqHDk3eS7VUavMOw00vo3QzKzT'
    

    const onToken = (token, orderDetails) => {
        const order = {
            orderTotal: price,
            orderDate: new Date(),
            currentUser,
            cartItems,
            ...orderDetails
        }
        axios({
            url:'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response=>{
            newOrderStart(order)
            clearCart()
            history.push({
                pathname: '/thank-you',
                customNameData: order,
              });
            

        }).catch(error=>{
            console.log(error)
            alert('there was a payment issue')
        })
    }
    return(
        <StripeCheckout
            label='Pay Now'
            name="King Clothing Ltd."
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your Total Is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    newOrderStart: (order)=>dispatch(newOrderStart(order)),
    clearCart: ()=>dispatch(clearCart())
  })

const mapStateToProps = (state) =>({
   currentUser: state.user.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckoutButton)