import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51IxaOhAmFIyQdv340WmDturzFP1wHLaPzDhlRDSa8C1g62Qg3jFVX3dD8MVXrUxtasMWlgcZpqHDk3eS7VUavMOw00vo3QzKzT'
    
    const onToken = token => {
        axios({
            url:'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response=>{
            alert('payment successful')
        }).catch(error=>{
            console.log(JSON.parse(error))
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

export default StripeCheckoutButton