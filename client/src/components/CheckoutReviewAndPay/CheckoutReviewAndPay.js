import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import StripeCheckOutForm from '../StripeCheckoutForm/StripeCheckoutForm'
import './CheckoutReviewAndPay.scss'

const CheckoutReviewAndPay = ()=>{
    return(
        <Col className='col-md-8 offset-md-2'>
            <Row>
                <h1>Review Your Order</h1>
            </Row>
            <Row>
                <StripeCheckOutForm/>
            </Row>

        </Col>
    )
}

export default CheckoutReviewAndPay