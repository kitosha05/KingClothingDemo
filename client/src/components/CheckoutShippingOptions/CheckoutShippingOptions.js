import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from '../CustomButton/CustomButton'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './CheckoutShippingOptions.scss'

const CheckoutShippingOptions =({nextStep,prevStep,handleChange,order})=>{
    
    const FREE_SHIPPING_MINIMUM = 50
    const total = order.total
    return(
        <Col className='col-md-6 offset-md-3 justify-content-center align-items-center'> 
          
          
           <Row className='mt-2 justify-content-center align-items-center '>
               <Col className='justify-content-center align-items-center'>
               <Form className='shipping-options-form'>
               <Row className='text-center'> <h1 className='shipping-header'>Shipping Options</h1></Row>
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
                        {
                            total >= FREE_SHIPPING_MINIMUM ? 
                            (

                                <Form.Check
                                type="radio"
                                label="Your Order Qualifies For Free Shipping!"
                                name="freeShipping"
                                 id="freeShipping"
                                 value='freeShipping'
                                  onChange={handleChange('shippingMethod')}
                            />
                            ):
                            (
                                <Form.Group>
                             <Form.Check
                             type="radio"
                             label="Standard Shipping - $10"
                             name="standardShipping"
                             id="standardShipping"
                             value='standardShipping'
                              onChange={handleChange('shippingMethod')}
                        />
                        <Form.Text className='text-muted'>`Add ${FREE_SHIPPING_MINIMUM-total} To Qualify For Free Shipping</Form.Text>

                                </Form.Group>
                        
                            )
                        }
                         
                        
                     </Col>
                </Form.Group>
            </fieldset>
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
               </Form>
               </Col>
              
              
            </Row>
            
        </Col>
    )
}

export default CheckoutShippingOptions