import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils'
import './Header.scss'
import CartIcon from '../cartIcon/cartIcon'
import CartDropDown from '../CartDropDown/CartDropDown'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {signOutStart} from '../../redux/user/userActions'

const Header = ({currentUser, hidden, signOutStart})=>{
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">King Clothing</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Shop" id="collasible-nav-dropdown">
              <NavDropdown.Item ><Link to='/shop/hats'>Hats</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to='/shop/jackets'>Jackets</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to='/shop/sneakers'>Sneakers</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to='/shop/womens'>Womens</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to='/shop/mens'>Mens</Link></NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#features">About</Nav.Link>
            <Nav.Link href="#pricing">Contact Us</Nav.Link>
          </Nav>
          <Nav className='right-side'>
            <Nav.Link >
                {
                     currentUser ?
                     <Link as='div' className='option sign-out toggle-signin' onClick={signOutStart}>SIGN OUT</Link>
                    :
                    <Link className='option toggle-signin' to='/signin'>Sign In</Link>
                }
                </Nav.Link>
            <Nav.Link >
                 <CartIcon /> 
                 {
                    hidden ? null: <CartDropDown/>
                }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
          
 
  

                        




    )

}
const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
})

const mapDispatchToProps = dispatch =>({
  signOutStart: () =>dispatch(signOutStart())

})
export default connect(mapStateToProps, mapDispatchToProps)(Header)