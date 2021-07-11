import React, {useEffect, useSelector} from 'react'
import {connect} from 'react-redux'
import { Route } from 'react-router-dom';
import {createStructuredSelector} from 'reselect'
import Dashboard from '../../components/Dashboard/Dashboard'
import OrderAdminPanel from '../../components/OrderAdminPanel/OrderAdminPanel'
import ProductAdminPanel from '../../components/ProductAdminPanel/ProductAdminPanel'
import PagesAdminPanel from '../../components/PagesAdminPanel/PagesAdminPanel'
import ReportsAdminPanel from '../../components/ReportsAdminPanel/ReportsAdminPanel';
import BlogAdminPanel from '../../components/BlogAdminPanel/BlogAdminPanel';
import OrderDetailAdminPanel from '../../components/OrderDetailAdminPanel/OrderDetailAdminPanel';
import {fetchCollectionsStart} from '../../redux/shop/shopActions'
import {fetchOrdersStart} from '../../redux/orders/orderActions'


const AdminDash =({fetchOrdersStart, fetchCollectionsStart, allOrders, match, collections}) =>{

    useEffect(() => {
      fetchOrdersStart()
      fetchCollectionsStart()        
    }, [])
    


    return(
      <div>
                <Route exact path={`${match.path}`} render={({props}) => <Dashboard allOrders={allOrders}/>} />
                <Route exact path={`${match.path}/orders`} render={({props}) => <OrderAdminPanel allOrders={allOrders} />} />
                <Route exact path={`${match.path}/orders/:orderId`} render={({props}) => <OrderDetailAdminPanel allOrders={allOrders} orderId={match.params.orderId} />} />

                <Route exact path={`${match.path}/products`} render={({props}) => <ProductAdminPanel collections={collections} />} />
                <Route exact path={`${match.path}/pages`} render={({props}) => <PagesAdminPanel />} />
                <Route exact path={`${match.path}/reports`} render={({props}) => <ReportsAdminPanel allOrders={allOrders}  />} />
                <Route exact path={`${match.path}/blog`} render={({props}) => <BlogAdminPanel   />} />

      </div>
        
    )
}


const mapDispatchToProps = (dispatch) =>({
    fetchOrdersStart: ()=>dispatch(fetchOrdersStart()),
    fetchCollectionsStart: ()=>dispatch(fetchCollectionsStart())
  })

  const mapStateToProps = (state)=>({
    allOrders: state.order.allOrders,
    collections: state.shop
  }) 

export default connect(mapStateToProps, mapDispatchToProps)(AdminDash)