import reviewActionTypes from './reviewActionTypes'

const INITIAL_STATE = {
    reviews: null,
    errorMessage: "",
    currentProduct:"",
    allReviews:null
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
        case reviewActionTypes.FETCH_ALLREVIEWS_START:
                return {
                    ...state
                }
        case reviewActionTypes.FETCH_ALLREVIEWS_SUCCESS:
                return{
                    ...state,
                    allReviews:action.payload
                }
        case reviewActionTypes.FETCH_ALLREVIEWS_FAILURE:
        case reviewActionTypes.FETCH_REVIEWS_FAILURE:
            return{
                ...state,
                errorMessage: action.payload
                
            }
        case reviewActionTypes.USER_VERIFIED:
            return {
                ...state,
                currentUser: action.payload
            }
        case reviewActionTypes.ADD_REVIEW_START:
            return{
                ...state,
                review: action.payload
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