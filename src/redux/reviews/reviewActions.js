import reviewActionTypes from './reviewActionTypes'
import{firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

export const fetchReviewsStart = (productName) =>({
    type: reviewActionTypes.FETCH_REVIEWS_START,
    payload: productName
})

export const fetchReviewsSuccess = (reviews) => ({
    type: reviewActionTypes.FETCH_REVIEWS_SUCCESS,
    payload: reviews
})

export const fetchReviewsFailure = (error) => ({
    type: reviewActionTypes.FETCH_REVIEWS_FAILURE,
    payload: error.message
})