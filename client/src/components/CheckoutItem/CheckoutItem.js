import React from 'react';
import { connect } from 'react-redux';

import { removeItemFromCart, reduceItemByOne, addItem } from '../../redux/cart/cartActions';

import './CheckoutItem.scss'

const CheckoutItem = ({ cartItem, clearItem, reduceItem, addItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
          <div className='arrow' onClick={()=> reduceItem(cartItem)}>&#10094;</div>
          <span className='value'>{quantity}</span>
          <div className='arrow' onClick={()=>addItem(cartItem)}>&#10095;</div>
        </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(removeItemFromCart(item)),
  reduceItem: item=> dispatch(reduceItemByOne(item)),
  addItem: item=> dispatch(addItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);