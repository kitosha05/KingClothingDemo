import React from 'react'
import './LoginAndRegister.scss'


import SignIn from '../../components/SignIn/SignIn.js'
import Register from '../../components/Register/Register.js'

const LoginAndRegister = () => {
    return(
        <div className='sign-in-and-sign-up'>
           <SignIn />
            <Register/>
        </div>

    )
}
export default LoginAndRegister