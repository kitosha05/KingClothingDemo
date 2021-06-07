import {all, call, takeLatest, put} from 'redux-saga/effects'

import userActionTypes from '../user/userActionTypes'
import {clearCart} from './cartActions'

export function* onSignOutSuccess(){
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* clearCartOnSignOut() {
    yield put(clearCart());
}
export function* cartSagas(){
    yield all([call(onSignOutSuccess)]);
}