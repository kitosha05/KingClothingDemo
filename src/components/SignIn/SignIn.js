import React from 'react'
import {connect} from 'react-redux'
import {googleSignInStart, emailSignInStart} from '../../redux/user/userActions'

import './SignIn.scss'
import FormInput from '../FormInput/FormInput.js'
import Button from '../CustomButton/CustomButton.js'

class SignIn extends React.Component{

     state={email:'',password:''}

    onSubmit = async e => {
        e.preventDefault();
        const {email, password} = this.state
        const {emailSignInStart} = this.props

        emailSignInStart(email, password)
        
    }

    onChange = e => {
        const {value, name} = e.target
        this.setState({[name]:value})
    }

    render(){
        const {googleSignInStart} = this.props
        return(
            <div className='sign-in'>
                <h2>I already Have An Account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.onSubmit}>
                    <FormInput 
                        name="email"
                         type='email'
                          onChange={this.onChange} 
                          value={this.state.email}
                          label='Email' 
                          required/>

                    <FormInput 
                        name='password'
                        onChange={this.onChange} 
                        type='password' 
                        value={this.state.password} 
                        label='Password'
                        required/>
                    <div className='buttons'>
                         <Button type='submit'>Sign In</Button>
                        <Button type='button' onClick={googleSignInStart} isGoogleSignIn>
                            {' '}
                            Sign In With Google{' '}
                        </Button>
                    </div>
                    

                </form>
            </div>
        )

    }
}

const mapDispatchToProps= dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email,password)=> dispatch(emailSignInStart({email,password}))

})
export default connect(null, mapDispatchToProps)(SignIn)