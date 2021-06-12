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

