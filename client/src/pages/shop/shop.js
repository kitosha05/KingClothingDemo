  
import React, {lazy, Suspense} from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {fetchCollectionsStart, fetchProductsStart} from '../../redux/shop/shopActions'
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shopSelector'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import PlainSpinner from '../../components/PlainSpinner/PlainSpinner'

// import {updateCollections} from '../../redux/shop/shopActions'
import WithSpinner from '../../components/Spinner/Spinner'
import './shop.scss'


const CollectionsOverview =lazy(()=>import('../../components/CollectionsOverview/CollectionsOverview'))
const CollectionPage =lazy(()=>import('../CollectionPage/CollectionPage'));
const ProductPage =lazy(()=>import('../ProductPage/ProductPage'))

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
        
        <Suspense fallback={<PlainSpinner/>}>
        <Route exact path={`${match.path}`} render={(props)=><CollectionsOverview  {...props} />}/>
        <Route exact path={`${match.path}/:collectionId`} render={(props)=><CollectionPage {...props}/>}/> 
        <Route exact path={`${match.path}/:collectionId/:productId`} render={(props)=><ProductPage  {...props} />}/>
    </Suspense>
   
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