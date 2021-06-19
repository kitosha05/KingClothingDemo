import {all, call, put, takeLatest} from 'redux-saga/effects';
import {firestore} from '../../firebase/firebase.utils'
import {addReviewFailure, fetchReviewsFailure, fetchReviewsSuccess, userVerified, addReviewSuccess, fetchAllReviewsSuccess, fetchAllReviewsFailure} from './reviewActions'
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
        const productId = action.payload
        const reviewsRef = yield firestore.collection('products').doc(productId).collection('reviews').get()
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
       const review = yield action.payload
       const reviewsRef = yield firestore.collection('products').doc(review.productId).collection('reviews')
       const response = reviewsRef.add(review)
        yield put(addReviewSuccess())
    } catch (error) {
        yield put(addReviewFailure(error.message))
    }
}

export function* fetchAllReviewsStart(){
  
    yield takeLatest(reviewActionTypes.FETCH_ALLREVIEWS_START, fetchAllReviewsAsync)
}

export function* fetchAllReviewsAsync(){
    try {
       
        const reviewsRef = yield firestore.collectionGroup('reviews').get()
        const reviews = yield reviewsRef.docs.map(doc=>{
            const{reviewAuthor, reviewBody, reviewRating, productId} = doc.data()
            return{
                reviewAuthor,
                reviewBody,
                reviewRating,
                productId
            }
        })
        yield put(fetchAllReviewsSuccess(reviews))
        
    } catch (error) {
        yield put(fetchAllReviewsFailure(error.message))
    }
}




export function* reviewSagas(){
    yield all([
        call(addReviewStart), 
        call(fetchReviewsStart),
        call(fetchAllReviewsStart)
       
    ])
}