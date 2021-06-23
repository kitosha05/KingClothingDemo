import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './CheckoutShippingOptions.scss'

const CheckoutShippingOptions =({nextStep,prevStep,handleChange,})=>{
    


    return(
        <Col className='col-md-6 offset-md-3 justify-content-center align-items-center'> 
          <Row className='text-center'> <h1 className='shipping-header'>Shipping Options</h1></Row>
          
           <Row className='mt-3 justify-content-center align-items-center '>
               <Col className='justify-content-center align-items-center'>
               <Form className='shipping-options-form'>
               <fieldset className='shipping-options-field'>
                <Form.Group as={Row} className='justify-content-center align-items-center'>
                    <Col className='col-6'>
                         <Form.Check
                             type="radio"
                            label="Pick Up In Store"
                              name="pickUp"
                              id="pickUp"
                              value='pickUp'
                              onChange={handleChange('shippingMethod')}
                              
                        />
                         <Form.Check
                            type="radio"
                            label="Free Shipping"
                            name="freeShipping"
                             id="freeShipping"
                             value='freeShipping'
                              onChange={handleChange('shippingMethod')}
                        />
                        <Form.Check
                             type="radio"
                             label="Express Shipping -$10"
                             name="expressShipping"
                             id="expressShipping"
                             value='expressShipping'
                              onChange={handleChange('shippingMethod')}
                        />
                     </Col>
                </Form.Group>
            </fieldset>
               </Form>
               </Col>
              
              
            </Row>
            <Row className='button-row'>
                <Col className='text-center'>
                <Button onClick={prevStep}>
                    Previous
                </Button>
                </Col>
                <Col className='text-center' >
                <Button onClick={nextStep}>
                    Next
                </Button>
                </Col>
             </Row>
        </Col>
    )
}

export default CheckoutShippingOptions