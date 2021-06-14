import React from 'react'
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils.js'

import './Register.scss'
import FormInput from '../FormInput/FormInput.js'
import Button from '../CustomButton/CustomButton.js'

class RegisterForm extends React.Component{
    state={displayName:"",email:'',password:'',confirmPassword:''}
    onSubmit = async e => {
        e.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state

        if(password !== confirmPassword){
            alert("passwords don't match")
            return;
        }
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password)
            await createUserProfileDocument(user, displayName)
            this.setState({displayName:"",email:'',password:'',confirmPassword:''})

        }catch(error){
                console.log(error)
        }
    }
    onChange = e => {
        const {value, name} = e.target
        this.setState({[name]:value})
    }
    render(){
        const {displayName, email, password, confirmPassword} = this.state
        return(
            <div className='sign-up'>
                <h2 className='title'>Create New Account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.onSubmit}>
                <FormInput 
                        name="displayName"
                         type='text'
                          onChange={this.onChange} 
                          value={this.state.displayName}
                          label='Display Name' 
                          required/>
                    
                    
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
                    <FormInput 
                        name='confirmPassword'
                        onChange={this.onChange} 
                        type='password' 
                        value={this.state.passwordConfirm} 
                        label='Confirm Password'
                        required/>
                    <div className='buttons'>
                         <Button type='submit'>Sign Up</Button>
                
                    </div>
                    

                </form>
            </div>
        )


}
}
export default RegisterForm