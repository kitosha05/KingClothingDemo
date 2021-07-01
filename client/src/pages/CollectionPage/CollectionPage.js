
import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/CollectionItem/CollectionItem';
import ImageWithOverlay from '../../components/ImageWithOverlay/ImageWithOverlay'

import { selectCollection, selectProductsByCollection } from '../../redux/shop/shopSelector'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './CollectionPage.scss';

const CollectionPage = ({ collection, match, products, allReviews }) => {
    
  
  
  if(!products || !collection || !allReviews ){
    return(<div>Loading...</div>)
  }
  const { title } = collection;

  const productsInCollection= (collection)=>{
    return(products.filter(product=>product.collection===collection))
}

const averageRating = (productId)=>{
  const productReviews = allReviews.filter(review=>review.productId===productId)
  let subTotal = 0
  productReviews.map(review=>{
      subTotal += review.reviewRating
  })
  return subTotal / productReviews.length
}

  return (
    <Col className=' col-md-10 offset-md-1 collection-page justify-content-center align-items-center'>
      <Row>
        
     <h1>{title}</h1>
     
      </Row>
      
      <Row className='items justify-content-center align-items-center'>
        {productsInCollection(title).map(item => (
          <Col xs='6' md='4' lg='3'>
          <CollectionItem key={item.id} item={item} averageRating={averageRating(item.id)}collectionRoute={title.toLowerCase()} />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
  products: state.shop.products,
  allReviews: state.reviews.allReviews
});

export default connect(mapStateToProps)(CollectionPage);