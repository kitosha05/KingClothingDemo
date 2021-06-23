import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './StripeCheckoutForm.scss'
import Image from 'react-bootstrap/Image'
import Card  from "react-bootstrap/Card";


const renderItems = (items) =>{
    return items.map(item=>{
        return(
            
                <Row className='justify-content-center align-items-center mt-2'>  
                    <Col>
                        <Image className='product-thumbnail' src={item.imageUrl} rounded/>
                    </Col>
                    <Col className='justify-content-center align-items-center'>
                    <span className='priceSpan'>
                            {item.quantity} x ${item.price} --- {item.name}
                        </span>
                    </Col>      
                       
                </Row>
            
        )
    })
}

export default function CheckoutForm({values}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const {cartItems} = useSelector(state=>state.cart)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
   if (cartItems) {
    window
    .fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify({items: [{ id: "shirt"}]})
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      setClientSecret(data.clientSecret);
    });
   }
   
   JSON.stringify({items: [{ cartItems}]})  
  }, [cartItems]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  const getCartTotal = (cartItems) =>{
      let subTotal=0
      cartItems.map(item=>{
        subTotal += item.quantity * item.price
      })
      return subTotal
      
  }

  return (
    <Col className='col-md-6 offset-md-3 text-center'>
        <h1>Review Your Order</h1>
        <Card>
        {cartItems ? renderItems(cartItems) : ""}
        </Card>
        <Row>
            <Card>
                <Card.Title as='h2'>Shipping Details</Card.Title>
                <Card.Body>
                    <Card.Text><b>Shipping Method:</b>   {values.shippingMethod}</Card.Text>
                    {
                        values.shippingMethod==='pickUp' ? (
                            <Card.Body>
                            <Card.Text>Pick Up Instructions Below:</Card.Text>
                            <Card.Text> Instructions...</Card.Text>
                            </Card.Body>
                        ):(
                            <Card.Body>
                            <Card.Text><b>Ship To:</b> {values.recipientName}</Card.Text>
                            <Card.Text>{values.shippingStreetAddress}</Card.Text>
                            <Card.Text>{values.shippingCity}, {values.shippingState}   {values.shippingZipcode}</Card.Text>        
                            </Card.Body>
                        )

                    }
                    <Card.Body>
                        <Card.Title>Subtotal:</Card.Title>
                        <Card.Text>${getCartTotal(cartItems)}</Card.Text>
                        <Card.Title>Shipping:</Card.Title>
                        <Card.Text>FREE PICKUP</Card.Text>
                        <Card.Title>Order Total:</Card.Title>
                        <Card.Text>${getCartTotal(cartItems)}</Card.Text>
                    </Card.Body>
                </Card.Body>
            </Card>
        </Row>
        <Row>
        <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
        </Row>
    </Col>

    
  );
}
