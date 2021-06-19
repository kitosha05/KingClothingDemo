
import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/CollectionItem/CollectionItem';

import { selectCollection, selectProductsByCollection } from '../../redux/shop/shopSelector'

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
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {productsInCollection(title).map(item => (
          <CollectionItem key={item.id} item={item} averageRating={averageRating(item.id)}collectionRoute={title.toLowerCase()} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
  products: state.shop.products,
  allReviews: state.reviews.allReviews
});

export default connect(mapStateToProps)(CollectionPage);