import orderActionTypes from './orderActionTypes'

const INITIAL_STATE ={
    allOrders: null,
    order: null,
    errorMessage:"",
    confirmedOrder:null
    
}

const orderReducers = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case orderActionTypes.NEW_ORDER_START:
            return{
                ...state,
                errorMessage:"",
                order: action.payload
            }
        case orderActionTypes.NEW_ORDER_FAILURE:
            return{
                ...state,
                errorMessage:action.payload
            }
        case orderActionTypes.NEW_ORDER_SUCCESS:
            return{
                ...state,
                order: null,
                confirmedOrder:action.payload,
                errorMessage:""
            }
        case orderActionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                errorMessage:""
            }
        case orderActionTypes.FETCH_ORDERS_FAILURE:
            return{
                ...state,
                errorMessage:action.payload
            }
        case orderActionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                allOrders: action.payload
            }
        default:
            return state
    }
}

export default orderReducers

