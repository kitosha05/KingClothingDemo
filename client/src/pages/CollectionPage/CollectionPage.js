
import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/CollectionItem/CollectionItem';

import { selectCollection, selectProductsByCollection } from '../../redux/shop/shopSelector'

import './CollectionPage.scss';

const CollectionPage = ({ collection, match, products }) => {
    
  
  const { title } = collection;
  if(!products){
    return(<div>Loading...</div>)
  }

  const productsInCollection= (collection)=>{
    return(products.filter(product=>product.collection===collection))
}

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {productsInCollection(title).map(item => (
          <CollectionItem key={item.id} item={item} collectionRoute={title.toLowerCase()} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
  products: state.shop.products
});

export default connect(mapStateToProps)(CollectionPage);