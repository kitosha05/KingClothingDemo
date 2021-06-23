import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './CheckoutAddressForm.scss'

const CheckOutAddressForm =({nextStep, handleChange, values})=>{
    return(
        <Col className='col-md-6 offset-md-3'> 
            <Row className='mt-3'>
                <h1>Enter Shipping Information</h1>
            <Form>
                <Form.Group controlId="recipientName">
                     <Form.Label>Ship To:</Form.Label>
                     <Form.Control type="text" name='recipientName' value={values.recipientName} onChange={handleChange('recipientName')} placeholder="Recipient Name" />
                </Form.Group>
            <Form.Group controlId="shippingStreetAddress">
                <Form.Label>Shipping Street Address</Form.Label>
                 <Form.Control type="text" value={values.shippingStreetAddress} onChange={handleChange('shippingStreetAddress')} name='shippingStreetAddress'placeholder="ex: 3425 Main St" />
            </Form.Group>
            <Form.Group className='city-form-group' controlId="shippingCity">
                <Form.Label>Shipping City</Form.Label>
                 <Form.Control type="text" value={values.shippingCity} onChange={handleChange('shippingCity')} name='shippingCity' placeholder='City' />
            </Form.Group>
            <Form.Group className='state-form-group' controlId="shippingState">
                <Form.Label>Shipping State</Form.Label>
                 <Form.Control type="text" value={values.shippingState} onChange={handleChange('shippingState')} name='shippingState' placeholder='State' />
            </Form.Group>
            <Form.Group  className='zip-form-group' controlId="shippingZipcode">
                <Form.Label>Shipping Zipcode</Form.Label>
                 <Form.Control type="text" value={values.shippingZipcode} onChange={handleChange('shippingZipcode')} name='shippingZipcode' placeholder='Zipcode' />
            </Form.Group>
            
        </Form>
        </Row>
        <Row>
        <Button variant="primary" onClick={nextStep}>
                Next
            </Button>
        </Row>
        </Col>
    )
}
export default CheckOutAddressForm
