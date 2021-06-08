import Reach from 'react'
import './ThankYou.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const ThankYou =()=>{
    return(
        <Col className='col-md-6 offset-md-3'>
            <Card>
                <Card.Title as="h1">Thanks for Your Order!</Card.Title>
                <Card.Body>
                    <p>We appreciate your business! Here is a discount code for 
                        10% off your next order!</p>
                </Card.Body>
            </Card>
        </Col>
    )
}
export default ThankYou