import React from 'react'
import './LoginAndRegister.scss'

import Col from 'react-bootstrap/Col'
import SignIn from '../../components/SignIn/SignIn.js'
import RegisterForm from '../../components/Register/RegisterForm.js'

const Register = () => {
    return(
        <Col className='sign-in-and-sign-up col-md-8 offset-med-2 justify-content-center align-items-center'>
          <RegisterForm />
         
           
       
        </Col>

    )
}
export default Register