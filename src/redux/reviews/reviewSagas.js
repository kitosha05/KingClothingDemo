import {all, call, put, takeLatest} from 'redux-saga/effects';
import {firestore} from '../../firebase/firebase.utils'
import {addReviewFailure, fetchReviewsFailure, fetchReviewsSuccess, userVerified} from './reviewActions'
import {signInSuccess} from '../user/userActions'
import reviewActionTypes from './reviewActionTypes'
import userActionTypes from '../user/userActionTypes'

export function* onSignInSuccess(){
    yield takeLatest(userActionTypes.SIGN_IN_SUCCESS, getUser)
}

export function* getUser(action){
    const user = action.payload
    yield put(userVerified(user))
}

export function* fetchReviewsStart(){
  
    yield takeLatest(reviewActionTypes.FETCH_REVIEWS_START, fetchReviewsAsync)
}

export function* fetchReviewsAsync(action){
    try {
        const productName = action.payload
        const reviewsRef = yield firestore.collection('reviews').where("productName", '==', productName).get()
        const reviews = yield reviewsRef.docs.map(doc=>{
            const{reviewAuthor, reviewBody, reviewRating, productName} = doc.data()
            return{
                reviewAuthor,
                reviewBody,
                reviewRating,
                productName
            }
        })
        yield put(fetchReviewsSuccess(reviews))
        
    } catch (error) {
        yield put(fetchReviewsFailure(error.message))
    }
}

export function* addReviewStart(){
    yield takeLatest(reviewActionTypes.ADD_REVIEW_START, addReview)
}

export function* addReview(action){
    try {
        
    } catch (error) {
        yield put(addReviewFailure(error.message))
    }
}

export function* reviewSagas(){
    yield all([
        call(addReviewStart), 
        call(fetchReviewsStart)
    ])
}