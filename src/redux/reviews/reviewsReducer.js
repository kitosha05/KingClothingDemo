import reviewActionTypes from './reviewActionTypes'

const INITIAL_STATE = {
    reviews: null,
    errorMessage: "",
    currentProduct:""
}

const reviewsReducer = (state=INITIAL_STATE, action)=> {
    switch(action.type){
        case reviewActionTypes.FETCH_REVIEWS_START:
            return {
                ...state,
                productName:action.payload
            }
        case reviewActionTypes.FETCH_REVIEWS_SUCCESS:
            return{
                ...state,
                reviews:action.payload
            }
        case reviewActionTypes.FETCH_REVIEWS_FAILURE:
            return{
                ...state,
                errorMessage: action.payload
                
            }
        default:
            return state
    }
       
}

export default reviewsReducer