  
import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {fetchCollectionsStart, fetchProductsStart} from '../../redux/shop/shopActions'
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shopSelector'
import CollectionsOverview from '../../components/CollectionsOverview/CollectionsOverview'
import CollectionPage from '../CollectionPage/CollectionPage';
import ProductPage from '../ProductPage/ProductPage'
// import {updateCollections} from '../../redux/shop/shopActions'
import WithSpinner from '../../components/Spinner/Spinner'
import './shop.scss'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
const ProductPageWithSpinner = WithSpinner(ProductPage)


class  ShopPage extends React.Component{
  

  componentDidMount(){
    const{fetchCollectionsStart, fetchProductsStart} = this.props
    fetchCollectionsStart()
    fetchProductsStart()
     
  }

 render(){
   const {match, isCollectionFetching, isCollectionsLoaded} = this.props
   
   return(
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props)=><CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}/>
        <Route exact path={`${match.path}/:collectionId`} render={(props)=><CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}/> 
        <Route exact path={`${match.path}/:collectionId/:productId`} render={(props)=><ProductPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}/>
     </div>
    )
  } 
};

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: ()=>dispatch(fetchCollectionsStart()),
  fetchProductsStart: ()=>dispatch(fetchProductsStart())

})

export default connect(mapStateToProps ,mapDispatchToProps)(ShopPage);