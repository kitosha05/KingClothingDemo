import React, {useEffect, useSelector} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import Dashboard from '../../components/Dashboard/Dashboard'

import {fetchOrdersStart} from '../../redux/orders/orderActions'

const AdminDash =({fetchOrdersStart, allOrders}) =>{

    useEffect(() => {
      fetchOrdersStart()
        
    }, [])



    return(
        <Dashboard allOrders={allOrders}/>
    )
}


const mapDispatchToProps = (dispatch) =>({
    fetchOrdersStart: ()=>dispatch(fetchOrdersStart())
  })

  const mapStateToProps = (state)=>({
    allOrders: state.order.allOrders
  }) 

export default connect(mapStateToProps, mapDispatchToProps)(AdminDash)