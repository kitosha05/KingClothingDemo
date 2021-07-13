import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from '../CustomButton/CustomButton'
import NewsletterForm from '../NewsletterForm/NewsletterForm'
import './NewsletterSignUp.scss'

const NewsletterSignUp = ()=>{
   
    return(
        <Row className='mt-5 mb-5'>
            <Col>
            <div className="morphing">
                <div className="word">Don't Miss A Thing...</div>
                 <div className="word">Sign Up Now!</div>
            </div>
            </Col>
            <Col>
            <NewsletterForm/>
            </Col>
        </Row>
    )
}
export default NewsletterSignUp