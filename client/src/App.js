import React, {Fragment} from 'react';
import {BrowserRouter,Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectCurrentUser} from './redux/user/userSelectors'
import HomePage from './pages/homepage/homepage.js'
import ShopPage from './pages/shop/shop.js'
import Header from './components/header/Header.js'
import Login from './pages/loginAndRegister/Login.js'
import Register from './pages/loginAndRegister/Register.js'
import CheckoutPage from './pages/checkout/Checkout'
import { createStructuredSelector } from 'reselect';
import {checkUserSession} from './redux/user/userActions'
import AdminDash from './pages/AdminDash/AdminDash'
import ThankYou from './pages/ThankYou/ThankYou'
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalStyle} from './global.styles/global.styles'
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
    this.unsubscribeFromAuth()
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
              <Route exact path="/" component={HomePage}/>
              <Route  path='/shop' component={ShopPage}/>
              <Route exact path='/checkout' component={CheckoutPage} />
              <Route exact path='/thank-you' component={ThankYou}/>
              <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/'/>): (<Login/>)}/>
              <Route exact path='/register' render={()=> this.props.currentUser ? (<Redirect to='/'/>): (<Register/>)}/>
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
