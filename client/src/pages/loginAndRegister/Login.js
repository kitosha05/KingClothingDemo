import React from 'react'
import './LoginAndRegister.scss'

import Col from 'react-bootstrap/Col'
import SignIn from '../../components/SignIn/SignIn.js'
import Register from '../../components/Register/RegisterForm.js'

const Login = () => {
    return(
        <Col className='sign-in-and-sign-up col-md-8 offset-med-2 justify-content-center align-items-center'>
          <SignIn />
         
           
       
        </Col>

    )
}
export default Login