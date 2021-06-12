import {all, call, put, takeLatest} from 'redux-saga/effects';
import {firestore} from '../../firebase/firebase.utils'
import adminActionTypes from './adminActionTypes'
import {addProductSuccess, addProductFailure} from './adminActions'

export function* addProductStart(){
    yield takeLatest(adminActionTypes.ADD_PRODUCT_START, addProduct)
}

export function* addProduct(action){
    try {
      const {price, imageUrl, description, name, collection} = yield action.payload
      const capitalizedCollection = collection
      const product ={price, imageUrl, description, name, collection:capitalizedCollection}
      const response = yield firestore.collection('products').add(product)
     
       yield put(addProductSuccess())
   } catch (error) {
       yield put(addProductFailure(error.message))
   }
}



export function* adminSagas(){
    yield all([
        call(addProductStart)
    ])
}