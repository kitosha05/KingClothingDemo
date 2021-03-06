import {all, call, put, takeLatest} from 'redux-saga/effects';
import {firestore} from '../../firebase/firebase.utils'
import {newOrderStart, newOrderSuccess, newOrderFailure, fetchOrdersSuccess, fetchOrdersFailure} from './orderActions'
import orderActionTypes from './orderActionTypes'


export function* onNewOrderStart(){
    yield takeLatest(orderActionTypes.NEW_ORDER_START, newOrder)
}

export function* newOrder(action){
    try {
         const order = yield action.payload
        const orderId= yield firestore.collection('orders').add(order).then(doc=>{
             return doc.id })

        yield put(newOrderSuccess(orderId))
        
        
    } catch (error) {
       yield put(newOrderFailure(error)) 
    }
}


export function* onFetchOrdersStart(){
    yield takeLatest(orderActionTypes.FETCH_ORDERS_START, fetchOrders)
}

export function* fetchOrders(){
    try {
        const ordersRef = yield firestore.collection('orders').get()
        const orders = yield ordersRef.docs.map(doc=>{
            const id = doc.id
            return{id, ...doc.data()}
        })
        yield put(fetchOrdersSuccess(orders))
        
    } catch (error) {
        yield put(fetchOrdersFailure(error))
    }
}

export function* orderSagas(){
    yield all([
        call(onNewOrderStart),
        call(onFetchOrdersStart)
        
    ])
}