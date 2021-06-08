import {takeEvery, call, put, takeLatest} from 'redux-saga/effects';
import {firestore} from '../../firebase/firebase.utils'
import {fetchReviewsFailure, fetchReviewsSuccess} from './reviewActions'

import reviewActionTypes from './reviewActionTypes'

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