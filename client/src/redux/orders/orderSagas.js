import {all, call, put, takeLatest} from 'redux-saga/effects';
import {firestore} from '../../firebase/firebase.utils'
import {newOrderStart, newOrderSuccess, newOrderFailure} from './orderActions'
import orderActionTypes from './orderActionTypes'


export function* onNewOrderStart(){
    yield takeLatest(orderActionTypes.NEW_ORDER_START, newOrder)
}

export function* newOrder(action){
    try {
         const order = yield action.payload
         const response = yield firestore.collection('orders').add(order)
        yield put(newOrderSuccess(true))
    } catch (error) {
       yield put(newOrderFailure(error)) 
    }
}

export function* orderSagas(){
    yield all([
        call(onNewOrderStart)
        
    ])
}