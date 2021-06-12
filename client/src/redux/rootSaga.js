import {all, call} from 'redux-saga/effects'
import{shopSagas} from './shop/shopSagas'
import {userSagas} from './user/userSagas'
import {cartSagas} from './cart/cartSagas'
import {reviewSagas} from './reviews/reviewSagas'
import {orderSagas} from './orders/orderSagas'
import {adminSagas} from './admin/adminSagas'

export default function* rootSaga() {
    yield all([
        call(shopSagas), 
        call(userSagas),
        call(cartSagas),
        call(reviewSagas),
        call(orderSagas),
        call(adminSagas)
    ])
}