import React, {useRef, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import CartItem from '../CartItem/CartItem'
import Button from '../CustomButton/CustomButton.js'
import {selectCartItems} from '../../redux/cart/cartSelectors'
import {toggleCartHidden} from '../../redux/cart/cartActions'
 import './CartDropDown.scss'

 const CartDropDown = ({cartItems, history, dispatch})=>{
    const node = useRef();
    
   
    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

      const handleClick = e => {
        if (node.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click 
        dispatch(toggleCartHidden())
      };


     return(
         <div ref={node} className='cart-dropdown'>
             <div className='cart-items'>
                 {
                     cartItems.length ?
                     cartItems.map(cartItem=><CartItem key={cartItem.id} item={cartItem}/>)
                     :
                     <span className="empty-message">Your Cart Is Empty!</span>
                 }
             </div>
             <Button onClick={()=> {
                 history.push('/checkout')
                 dispatch(toggleCartHidden())
                 }}
             >
             GO TO CHECKOUT
             </Button>
         </div>
     )
 }

 const mapStateToProps=(state) =>({
     cartItems: selectCartItems(state)
 })
 export default withRouter(connect(mapStateToProps)(CartDropDown))