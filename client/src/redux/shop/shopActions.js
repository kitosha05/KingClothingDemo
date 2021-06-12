import shopActionTypes from './shopActionTypes'
import{firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

export const fetchCollectionsStart = ()=>({
    type: shopActionTypes.FETCH_COLLECTIONS_START,
   
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef= firestore.collection('collections')
        dispatch(fetchCollectionsStart())
       
        collectionRef.get().then(snapshot=>{
         const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        dispatch(fetchCollectionsSuccess(collectionsMap))
         })
         .catch(error=>dispatch(fetchCollectionsFailure(error.message)))
    }
}

export const fetchCollectionsSuccess = collectionsMap => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage

})

export const fetchProductsStart=()=>({
    type: shopActionTypes.FETCH_PRODUCTS_START
})

export const fetchProductsSuccess = products => ({
    type: shopActionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: products
})

export const fetchProductsFailure = errorMessage => ({
    type: shopActionTypes.FETCH_PRODUCTS_FAILURE,
    payload: errorMessage

})

