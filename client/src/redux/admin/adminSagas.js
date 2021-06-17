import {all, call, put, takeLatest} from 'redux-saga/effects';
import {firestore} from '../../firebase/firebase.utils'
import adminActionTypes from './adminActionTypes'
import {savePageSuccess, fetchPagesSuccess, newPageSuccess, newPageFailure,addProductSuccess, addProductFailure, editProductSuccess, editProductFailure, fetchPagesFailure, savePageFailure} from './adminActions'


export function* savePageStart(){
    yield takeLatest(adminActionTypes.SAVE_PAGE_START, savePage)
}

export function* savePage(action){
    try {
        const page = action.payload
        const pageName = page.pageName
        const pageRef = yield firestore.collection('pages').doc(pageName)
        const response = yield pageRef.update(page)
        yield put(savePageSuccess())
    } catch (error) {
        yield put(savePageFailure(error))
    }
}
export function* fetchPagesStart(){
    yield takeLatest(adminActionTypes.FETCH_PAGES_START, fetchPages)
}

export function* fetchPages(action){
    try {
        const pagesRef = yield firestore.collection('pages').get()
        const pages = yield pagesRef.docs.map(doc=>{
            const pageId = doc.id
            const {html, css, styles, components, assets, pageName,route} = doc.data()
            const page = {
                html,
                css,
                styles,
                components,
                assets,
                pageName,
                route
            }
            return page
        })
        yield put(fetchPagesSuccess(pages))
    } catch (error) {
        yield put(fetchPagesFailure(error))
    }
}

export function* newPageStart(){
    yield takeLatest(adminActionTypes.NEW_PAGE_START, newPage)
}
export function* newPage(action){
    try {
        const {pageName} = action.payload
        const page = {
            pageName,
            html:"",
            css:"",
            styles:null,
            components:null,
            assets:null
        }
        const response = yield firestore.collection('pages').doc(pageName).set(page)
        yield put(newPageSuccess())
    } catch (error) {
        yield put(newPageFailure(error))
    }
    
}
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

export function* editProductStart(){
    yield takeLatest(adminActionTypes.EDIT_PRODUCT_START, editProduct)
}

export function* editProduct(action){
    try {
    const {name, collection, price, imageUrl, description, id} = yield action.payload
    const product={name, collection, price, imageUrl, description}
    
    const productRef = yield firestore.collection('products').doc(id)
    const response = yield productRef.set(product)
       yield put(editProductSuccess())
    } catch (error) {
       yield put(editProductFailure(error))
    }
}



export function* adminSagas(){
    yield all([
        call(addProductStart),
        call(editProductStart),
        call(newPageStart),
        call(fetchPagesStart),
        call(savePageStart)
    ])
}