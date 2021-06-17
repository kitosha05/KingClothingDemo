import adminActionTypes from './adminActionTypes'

const INITIAL_STATE = {
    product: null,
    errorMessage: "",
    sucessMessage:"",
    page:null,
    pages: null,
    savePage:null
}

const adminReducer = (state=INITIAL_STATE, action)=> {
    switch(action.type){
        case adminActionTypes.SAVE_PAGE_START:
            return{
                ...state,
                savePage:action.payload
            }
        case adminActionTypes.ADD_PRODUCT_START:
            return{
                ...state,
                product: action.payload
            }
        case adminActionTypes.NEW_PAGE_START:
                return{
                    ...state,
                    page: action.payload
                }    
        case adminActionTypes.EDIT_PRODUCT_START:
                return{
                    ...state,
                    product: action.payload
                }
        case adminActionTypes.ADD_PRODUCT_FAILURE:
        case adminActionTypes.NEW_PAGE_FAILURE:
        case adminActionTypes.EDIT_PRODUCT_FAILURE:
        case adminActionTypes.SAVE_PAGE_FAILURE:
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
                        successMessage: "Page Has Been Saved!"
                    
                    }        
         case adminActionTypes.EDIT_PRODUCT_SUCCESS:
                    return{
                        ...state,
                        errorMessage: "",
                        product: null,
                        successMessage: "Product Has Been Successfully Edited"
                    
                    } 
        case adminActionTypes.FETCH_PAGES_SUCCESS:
            return{
                ...state,
                pages: action.payload
            }
        case adminActionTypes.SAVE_PAGE_SUCCESS:
            return{
                ...state,
                savePage:null
            }
        default:
            return state
    }
       
}

export default adminReducer