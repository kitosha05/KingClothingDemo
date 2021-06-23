import Reach from 'react'
import './ThankYou.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

const ThankYou =()=>{
    return(
        <Col className='col-md-8 offset-md-2'>
            <Card>
            <Row>
                <Col className='col-md-8'>
                    <div className='thank-you-image'>
                    <Image src='https://images.unsplash.com/photo-1602045486350-4e53a69865c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2007&q=80'/>

                    </div>


                </Col>
                <Col className='col-md-4'>
                     <Card.Title as="h1">Thanks for Your Order!</Card.Title>
                     <Card.Body>
                        <p>We appreciate your business! Here is a discount code for 
                        10% off your next order!</p>
                    </Card.Body>
                </Col>
            </Row>
            
              
            </Card>
        </Col>
    )
}
export default ThankYou