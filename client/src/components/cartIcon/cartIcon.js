import React from 'react'
import {connect} from 'react-redux'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import {toggleCartHidden} from '../../redux/cart/cartActions'
import {selectCartItemsCount} from '../../redux/cart/cartSelectors'
import Flash from 'react-reveal/Flash';
import './cartIcon.scss'

const  CartIcon = ({toggleCartHidden, itemCount}) => {
    return(
        <Flash spy={itemCount}>
        <div className='cart-icon' onClick={toggleCartHidden}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{itemCount}</span>

        </div>
        </Flash>
    )
}
const mapDispatchToProps = dispatch =>({
    toggleCartHidden: ()=> dispatch(toggleCartHidden())
})

const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)