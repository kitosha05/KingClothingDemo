import {all, call, put, takeLatest} from 'redux-saga/effects';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {fetchCollectionsSuccess, fetchCollectionsFailure, fetchProductsSuccess, fetchProductsFailure} from './shopActions'

import shopActionTypes from './shopActionTypes';

export function* fetchCollectionsAsync(){    
    try {

        const collectionRef= firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot) 
      yield put(fetchCollectionsSuccess(collectionsMap))  
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
   
}


export function* fetchCollectionsStart(){
   
    yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* fetchProductsStart(){
    yield takeLatest(shopActionTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* fetchProducts(){
    try {
        const productsRef = yield firestore.collection('products').get()
        const products = yield productsRef.docs.map(doc=>{
            const {name, imageUrl, description, price, collection} = doc.data()
            const id = doc.id
            const product = {id,name, imageUrl, description, price, collection}
            return product
        })
        yield put(fetchProductsSuccess(products))
    } catch (error) {
        yield put(fetchProductsFailure(error))
    }
}


export function* shopSagas(){
    yield all([
        call(fetchCollectionsStart), 
        call(fetchProductsStart)
    ])
}