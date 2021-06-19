import reviewActionTypes from './reviewActionTypes'
import{firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

export const fetchReviewsStart = (productName) =>({
    type: reviewActionTypes.FETCH_REVIEWS_START,
    payload: productName
})
export const fetchAllReviewsStart = () =>({
    type: reviewActionTypes.FETCH_ALLREVIEWS_START
})

export const fetchReviewsSuccess = (reviews) => ({
    type: reviewActionTypes.FETCH_REVIEWS_SUCCESS,
    payload: reviews
})
export const fetchAllReviewsSuccess = (reviews) => ({
    type: reviewActionTypes.FETCH_ALLREVIEWS_SUCCESS,
    payload: reviews
})

export const fetchReviewsFailure = (error) => ({
    type: reviewActionTypes.FETCH_REVIEWS_FAILURE,
    payload: error.message
})
export const fetchAllReviewsFailure = (error) => ({
    type: reviewActionTypes.FETCH_ALLREVIEWS_FAILURE,
    payload: error.message
})

export const addReviewStart = (review)=>({
    type: reviewActionTypes.ADD_REVIEW_START,
    payload: review
})
export const addReviewSuccess = () => ({
    type:reviewActionTypes.ADD_REVIEW_SUCCESS
})
export const addReviewFailure = (err)=>({
    type: reviewActionTypes.ADD_REVIEW_FAILURE,
    payload: err.message
})

export const userVerified = (user) =>({
    type: reviewActionTypes.USER_VERIFIED,
    payload: user
})