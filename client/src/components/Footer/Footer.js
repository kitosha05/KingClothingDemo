import React from 'react'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from '../CustomButton/CustomButton'
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './Footer.scss'

const Footer = () =>{

    const onSubmit=(e)=>{
        e.preventDefault()

    }
    return(
        <Row className='footer-row justify-content-center  mt-4'>
            <Col xs='12'  md='4' className='footer-collection-links text-center mt-2'>
                <h3>Shop By Collection</h3>
                <Link to='/shop/hats'>Hats</Link>
                <Link to='/shop/jackets'>Jackets</Link>
                <Link to='/shop/sneakers'>Sneakers</Link>
                <Link to='/shop/mens'>Mens</Link>
                <Link to='/shop/womens'>Womens</Link>
            </Col>
            <Col xs='12' md='4' className='justify-content-center text-center mt-2'>
            <Row className='newsletter-signup'>
                <h3>Become A Royal Follower:</h3>
                <Form onSubmit={(e)=>onSubmit(e)}>
                <Form.Group controlId="footerNewsletterName">
                         {/* <Form.Label>Name</Form.Label> */}
                        <Form.Control required size='small' name="footerNewsletterName" type="text" placeholder="Name" />
                   </Form.Group>

                    <Form.Group controlId="footerNewsletterEmail">
                         {/* <Form.Label>Email address</Form.Label> */}
                         <Form.Control required size='small' name='footerNewsLetterEmail' type="email" placeholder="Enter email" />
                         <Form.Text className="text-muted">
                             We'll never share your email with anyone else.
                         </Form.Text>
                     </Form.Group>
                   
                 <Form.Group controlId="footerNewsletterOptin">
                     <Form.Check type="checkbox" name="footerNewsletterOptin" label="Sign Me Up For The King Clothing Newsletter!" required/>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                     Submit
                  </Button>
                </Form>

                </Row>
            </Col>
            <Col xs='12'  md='4' className='footer-about-us text-center justify-content-center mt-2'>
                <Row className='footer-about-us'>
                    <h3>King Clothing Ltd</h3>
                    
                    <div className='store-address'>
                       <p>
                       4323 Made Up St
                       Houston, TX 77019
                           </p> 
                           <p>713-555-5555</p>
                    </div>
                    <Link to='/pages/about-us'>About Us</Link>
                    <Link to='/pages/contact-us'>Contact Us</Link>
                  
                </Row>
                <Row className='mt-3'>
                <h5>Follow Us:</h5>  
                </Row>
                <Row className='social-icons justify-content-center'>
                   <Col>
                   <TwitterIcon fontSize='large'/>
                   </Col>
                   <Col>
                   <InstagramIcon fontSize='large'/>
                   </Col>
                   <Col>
                   <FacebookIcon fontSize='large'/>
                   </Col>
                   <Col>  
                   <YouTubeIcon fontSize='large'/>
                   </Col>
                       
                 </Row>
            </Col>
        </Row>
    )
}
export default Footer