import orderActionTypes from './orderActionTypes'

export const newOrderStart = (order) => ({
    type: orderActionTypes.NEW_ORDER_START,
    payload: order
})

export const newOrderSuccess = () => ({
    type: orderActionTypes.NEW_ORDER_SUCCESS
})

export const newOrderFailure =(err) =>({
    type: orderActionTypes.NEW_ORDER_FAILURE,
    payload: err.message
})
