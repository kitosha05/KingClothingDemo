import adminActionTypes from './adminActionTypes'

const INITIAL_STATE = {
    product: null,
    errorMessage: "",
    sucessMessage:""
}

const adminReducer = (state=INITIAL_STATE, action)=> {
    switch(action.type){
        case adminActionTypes.ADD_PRODUCTSSTART:
            return{
                ...state,
                product: action.payload
            }
        case adminActionTypes.ADD_PRODUCTS_FAILURE:
            return{
                ...state,
                errorMessage: action.payload
            }
        case adminActionTypes.ADD_PRODUCTS_SUCCESS:
                return{
                    ...state,
                    errorMessage: "",
                    product: null,
                    successMessage: "Product Has Been Successfully Added"
                
                } 
        default:
            return state
    }
       
}

export default adminReducer