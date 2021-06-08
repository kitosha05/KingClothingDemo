import {all, call} from 'redux-saga/effects'
import{fetchCollectionsStart} from './shop/shopSagas'
import {userSagas} from './user/userSagas'
import {cartSagas} from './cart/cartSagas'
import {reviewSagas} from './reviews/reviewSagas'

export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart), 
        call(userSagas),
        call(cartSagas),
        call(reviewSagas)
    ])
}