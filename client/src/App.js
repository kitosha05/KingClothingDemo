import React, {Fragment, lazy, Suspense} from 'react';
import {BrowserRouter,Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectCurrentUser} from './redux/user/userSelectors'

import { createStructuredSelector } from 'reselect';
import {checkUserSession} from './redux/user/userActions'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalStyle} from './global.styles/global.styles'
import Header from './components/header/Header.js'
import PlainSpinner from './components/PlainSpinner/PlainSpinner'

import AdminDash from './pages/AdminDash/AdminDash'
const ThankYou = lazy(()=>import('./pages/ThankYou/ThankYou'))
const HomePage = lazy(()=>import('./pages/homepage/homepage.js'))
const ShopPage = lazy(()=>import('./pages/shop/shop.js'))
const Login = lazy(()=>import('./pages/loginAndRegister/Login.js'))
const Register = lazy(()=>import('./pages/loginAndRegister/Register.js'))
const CheckoutPage = lazy(()=>import('./pages/checkout/Checkout'))
const CustomPage = lazy(()=>import('./pages/CustomPage/CustomPage.js'))
const ProfilePage = lazy(()=>import('./pages/ProfilePage/ProfilePage'))
const UserOrderHistory = lazy(()=>import('./pages/UserOrderHistory/UserOrderHistory'))
const UserOrderDetails = lazy(()=>import('./pages/UserOrderDetails/UserOrderDetails'))


class App extends React.Component {
  unsubscribeFromAuth = null;
  state = {
    userAuth: localStorage.getItem('user')
  };
  componentDidMount(){
    const {checkUserSession} = this.props
    // checkUserSession()
  }

  componentWillUnmount(){
    // this.unsubscribeFromAuth()
  }
 
  render(){
  
    return (
      
      <div >
        <BrowserRouter> 
        <GlobalStyle/>       
        <Switch>
        
             <Route path='/admin' render={({match}) => this.props.currentUser ? this.props.currentUser.isAdmin ? (<AdminDash match={match}/>): (<Redirect to='/'/>): 
             (<Redirect to='/'/>)}  />
       

            <Fragment>
              <Header/>
              <ErrorBoundary>
        
              <Suspense fallback={<PlainSpinner/>}>
              <Route exact path="/" component={HomePage}/>
            
               <Route  path='/shop' component={ShopPage}/>
            
               <Route path='/pages/:pageId' component={CustomPage}/>
            
               <Route exact path='/checkout' component={CheckoutPage} />
            
               <Route exact path='/thank-you' component={ThankYou}/>
            
               <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/'/>): (<Login/>)}/>
            
               <Route exact path='/register' render={()=> this.props.currentUser ? (<Redirect to='/'/>): (<Register/>)}/>
               <Route exact path='/user/profile' render={()=> this.props.currentUser ? (<ProfilePage/>): (<Redirect to='/signin'/>)}/>
               <Route exact path='/user/order-history' render={()=> this.props.currentUser ? (<UserOrderHistory/>): (<Redirect to='/signin'/>)}/>
               <Route exact path='/user/orders/:orderId' render={(props)=> this.props.currentUser ? (<UserOrderDetails {...props}/>): (<Redirect to='/signin'/>)}/>

              </Suspense>
              </ErrorBoundary>
           </Fragment>
        </Switch>
        </BrowserRouter>
        
     
      </div>
    )
  }
  
}
const mapDispatchToProps = dispatch =>({
  checkUserSession: ()=> dispatch(checkUserSession())
})
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
