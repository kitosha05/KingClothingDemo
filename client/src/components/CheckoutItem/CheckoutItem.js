import React from 'react';
import { connect } from 'react-redux';

import { removeItemFromCart, reduceItemByOne, addItem } from '../../redux/cart/cartActions';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './CheckoutItem.scss'

const CheckoutItem = ({ cartItem, clearItem, reduceItem, addItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <Row className='checkout-item text-center justify-content-center'>
      <Col>
        <div className='image-div'>
        <Image src={imageUrl} alt='item' fluid/>
        </div>
      
      </Col>
      <Col>
         <span className='name'>{name}</span>
      </Col>
      <Col>
      <span className='quantity'>
          <div className='arrow' onClick={()=> reduceItem(cartItem)}>&#10094;</div>
          <span className='value'>{quantity}</span>
          <div className='arrow' onClick={()=>addItem(cartItem)}>&#10095;</div>
        </span>

      </Col>
      <Col>
      <span className='price'>${price}</span>
      </Col>
      <Col>
      <div className='remove-button' onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
      </Col>
      
      
     
     
     
    </Row>
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