import orderActionTypes from './orderActionTypes'

const INITIAL_STATE ={
    order: null,
    errorMessage:"",
    orderConfirmed: false
}

const orderReducers = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case orderActionTypes.NEW_ORDER_START:
            return{
                ...state,
                errorMessage:"",
                orderConfirmed:false,
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
                orderConfirmed: action.payload
            }
        default:
            return state
    }
}

export default orderReducers

