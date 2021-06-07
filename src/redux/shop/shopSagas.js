import {takeEvery, call, put, takeLatest} from 'redux-saga/effects';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {fetchCollectionsSuccess, fetchCollectionsFailure} from './shopActions'

import shopActionTypes from './shopActionTypes';

export function* fetchCollectionsAsync(){
    yield console.log('i am fired');

    
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