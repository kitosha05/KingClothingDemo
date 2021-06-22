import userActionTypes from './userActionTypes'


export const googleSignInStart = () => ({
    type: userActionTypes.GOOGLE_SIGN_IN_START
})

export const signInSuccess= (user) =>({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const signInFailure = (error) =>({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const emailSignInStart = (emailAndPassword) => ({
    type: userActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

export const checkUserSession = () =>({
    type: userActionTypes.CHECK_USER_SESSION
})

export const signOutStart = ()=>({
    type:userActionTypes.SIGN_OUT_START
})
export const signOutSuccess = ()=>({
    type:userActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (error)=>({
    type:userActionTypes.SIGN_OUT_FAILURE,
    payload:error
})
export const changeAvatarStart = ({selectedFile, currentUser})=>({
    type:userActionTypes.CHANGE_AVATAR_START,
    payload: {selectedFile, currentUser}
})
export const changeAvatarSuccess = ({avatarUrl, currentUser}) =>({
    type: userActionTypes.CHANGE_AVATAR_SUCCESS,
    payload:{avatarUrl, currentUser}
})
export const changeAvatarFailure = (error)=>({
    type: userActionTypes.CHANGE_AVATAR_FAILURE,
    payload: error
})
export const fetchUserOrdersStart = (userId)=>({
    type:userActionTypes.FETCH_USER_ORDERS_START,
    payload:userId
})
export const fetchUserOrdersSuccess = (userOrders)=>({
    type:userActionTypes.FETCH_USER_ORDERS_SUCCESS,
    payload: userOrders
})
export const fetchOrdersFailure = (error)=>({
    type:userActionTypes.FETCH_USER_ORDERS_FAILURE,
    payload:error
})
export const setFavItemStart = (userId, productId) =>({
    type:userActionTypes.SET_FAV_ITEM_START,
    payload:{userId, productId}
})
export const setFavItemSuccess = (faveItems)=>({
    type:userActionTypes.SET_FAV_ITEM_SUCCESS,
    payload: faveItems
})
export const setFavItemFailure = (err)=>({
    type: userActionTypes.SET_FAV_ITEM_FAILURE,
    payload: err
})
export const removeFavItemStart = (userId, productId) =>({
    type:userActionTypes.REMOVE_FAV_ITEM_START,
    payload:{userId, productId}
})
export const removeFavItemSuccess = (faveItems)=>({
    type:userActionTypes.REMOVE_FAV_ITEM_SUCCESS,
    payload: faveItems
})
export const removeFavItemFailure = (err)=>({
    type: userActionTypes.REMOVE_FAV_ITEM_FAILURE,
    payload: err
})


