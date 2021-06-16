import adminActionTypes from './adminActionTypes'
import{firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'


export const addProductStart = (product)=>({
    type: adminActionTypes.ADD_PRODUCT_START,
    payload: product
})
export const addProductSuccess = () => ({
    type:adminActionTypes.ADD_PRODUCT_SUCCESS
})
export const addProductFailure = (err)=>({
    type: adminActionTypes.ADD_PRODUCT_FAILURE,
    payload: err.message
})
export const editProductStart = (product)=>({
    type:adminActionTypes.EDIT_PRODUCT_START,
    payload: product
})
export const editProductSuccess = () => ({
    type:adminActionTypes.EDIT_PRODUCT_SUCCESS
})
export const editProductFailure = (err)=>({
    type: adminActionTypes.EDIT_PRODUCT_FAILURE,
    payload: err.message
})
export const newPageStart = (page)=>({
    type: adminActionTypes.NEW_PAGE_START,
    payload: page
})
export const newPageSuccess = () => ({
    type:adminActionTypes.NEW_PAGE_SUCCESS
})
export const newPageFailure = (err)=>({
    type: adminActionTypes.NEW_PAGE_FAILURE,
    payload: err.message
})
