import adminActionTypes from './adminActionTypes'

const INITIAL_STATE = {
    product: null,
    errorMessage: "",
    sucessMessage:"",
    page:null
}

const adminReducer = (state=INITIAL_STATE, action)=> {
    switch(action.type){
        case adminActionTypes.ADD_PRODUCT_START:
            return{
                ...state,
                product: action.payload
            }
        case adminActionTypes.NEW_PRODUCT_START:
                return{
                    ...state,
                    product: action.payload
                }    
        case adminActionTypes.EDIT_PRODUCT_START:
                return{
                    ...state,
                    product: action.payload
                }
        case adminActionTypes.ADD_PRODUCT_FAILURE:
            return{
                ...state,
                errorMessage: action.payload
            }
        case adminActionTypes.NEW_PAGE_FAILURE:
                return{
                    ...state,
                    errorMessage: action.payload
                }    
        case adminActionTypes.EDIT_PRODUCT_FAILURE:
                return{
                    ...state,
                    errorMessage: action.payload
                }
        case adminActionTypes.ADD_PRODUCT_SUCCESS:
                return{
                    ...state,
                    errorMessage: "",
                    product: null,
                    successMessage: "Product Has Been Successfully Added"
                
                } 
        case adminActionTypes.NEW_PAGE_SUCCESS:
                    return{
                        ...state,
                        errorMessage: "",
                        page:action.payload,
                        successMessage: ""
                    
                    }        
         case adminActionTypes.EDIT_PRODUCT_SUCCESS:
                    return{
                        ...state,
                        errorMessage: "",
                        product: null,
                        successMessage: "Product Has Been Successfully Edited"
                    
                    } 
        default:
            return state
    }
       
}

export default adminReducer