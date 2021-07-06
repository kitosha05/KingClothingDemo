import React from 'react'
import { connect } from 'react-redux'
import {default as Stepper} from '../../components/Stepper/Stepper'
import ThankYou from '../ThankYou/ThankYou'
import CheckoutAddressForm from '../../components/CheckoutAddressForm/CheckoutAddressForm'
import CheckoutShippingOptions from '../../components/CheckoutShippingOptions/CheckoutShippingOptions'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../../components/StripeCheckoutForm/StripeCheckoutForm";
import './CompleteCheckout.scss'

const promise= loadStripe('pk_test_51IxaOhAmFIyQdv340WmDturzFP1wHLaPzDhlRDSa8C1g62Qg3jFVX3dD8MVXrUxtasMWlgcZpqHDk3eS7VUavMOw00vo3QzKzT')

class CompleteCheckout extends React.Component{

    state = {
        step:1,
        billingName:'',
        billingEmail: '',
        recipientName:'',
        shippingStreetAddress:'',
        shippingCity:'',
        shippingState:'',
        shippingZipcode:'',
        shippingMethod:''
    }
    
    
componentDidMount(){
  const order = this.props.location.state
        const email= order.billingEmail
        this.setState({billingEmail:email})
}
    
    // go back to previous step
prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  // proceed to the next step
nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  // handle field change
handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }

    render(){
      const order = this.props.location.state
        const {step, billingName,billingEmail,recipientName, shippingStreetAddress, shippingCity, shippingState, shippingZipcode, shippingMethod} = this.state
        const values={
            billingName,
            billingEmail,
            recipientName,
            shippingStreetAddress,
            shippingCity,
            shippingState,
            shippingZipcode,
            shippingMethod,
            currentUser:this.state.currentUser
        }
        
        
        // if(order.currentUser) this.setState({billingEmail:order.currentUser.email})
        switch (step) {
            case 1: 
              return (
                <CheckoutAddressForm
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                values={values}
                />
              )
            case 2: 
              return (
                <CheckoutShippingOptions
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                prevStep={this.prevStep}
                values={values}
                order={order}
                />
              )
            case 3: 
              return (
                <Elements stripe={promise}>
               <StripeCheckoutForm nextStep={this.nextStep} order={order} values={values} />
               </Elements>
              )
            case 4:
              return (
                <ThankYou order={order}/>
              )
           
            default: 
               // do nothing
          }
    }
    
}
const mapStateToProps= state=>({
  currentUser:state.currentUser
})

export default connect (mapStateToProps)(CompleteCheckout)