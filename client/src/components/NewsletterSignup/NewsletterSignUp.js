import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NewsletterForm from '../NewsletterForm/NewsletterForm'
import Fade from 'react-reveal/Fade'
import './NewsletterSignUp.scss'

const NewsletterSignUp = () => {
    return (
        <Fade right>
            <Row className="mt-5 mb-5">
                <Col className="animated-sign-up-message">
                    <div className="morphing">
                        <div className="word">Don't Miss A Thing...</div>
                        <div className="word">Sign Up Now!</div>
                    </div>
                </Col>
                <Col>
                    <NewsletterForm />
                </Col>
            </Row>
        </Fade>
    )
}
export default NewsletterSignUp
