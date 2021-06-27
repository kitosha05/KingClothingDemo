import orderActionTypes from './orderActionTypes'

export const newOrderStart = (order) => ({
    type: orderActionTypes.NEW_ORDER_START,
    payload: order
})
export const addOrderToUser =(order)=>({
    type: orderActionTypes.ADD_ORDER_TO_USER,
    payload: order
})

export const newOrderSuccess = (confirmedOrder) => ({
    type: orderActionTypes.NEW_ORDER_SUCCESS,
    payload: confirmedOrder
})

export const newOrderFailure =(err) =>({
    type: orderActionTypes.NEW_ORDER_FAILURE,
    payload: err.message
})

export const fetchOrdersStart = () =>({
    type: orderActionTypes.FETCH_ORDERS_START
})

export const fetchOrdersSuccess = (allOrders) =>({
    type: orderActionTypes.FETCH_ORDERS_SUCCESS,
    payload: allOrders
})

export const fetchOrdersFailure = (error) =>({
    type: orderActionTypes.FETCH_ORDERS_FAILURE,
    payload: error
})
export const clearCheckout=()=>({
    type:orderActionTypes.CLEAR_CHECKOUT
})
