import { takeLatest, put, all, call } from 'redux-saga/effects'
import userActionTypes from './userActionTypes'
import {
    firestore,
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser,
    uploadFile,
    addSubscriber,
} from '../../firebase/firebase.utils'
import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    changeAvatarFailure,
    changeAvatarSuccess,
    checkUserSession,
    setFavItemFailure,
    setFavItemSuccess,
    removeFavItemFailure,
    removeFavItemSuccess,
    subscribeNewsletterSuccess,
    subscribeNewsletterFailure,
} from './userActions'

// export function* onFetchOrdersStart(){
//     yield takeLatest(userActionTypes.FETCH_USER_ORDERS_START, fetchUserOrders)
// }

// export function* fetchUserOrders(action){
//     try {
//         const userId = action.payload
//         const userOrders = call(getOrdersByUserId, userId)
//         yield put(fetchUserOrdersSuccess(userOrders))
//     } catch (error) {
//         yield put(fetchUserOrdersFailure(error))
//     }
// }

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth)
        const userSnapshot = yield userRef.get()
        const favItemsSnapshot = yield firestore
            .collection('users')
            .doc(userSnapshot.id)
            .collection('favorites')
            .get()
        const favItems = yield favItemsSnapshot.docs.map((doc) => {
            return doc.id
        })
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                favItems,
                ...userSnapshot.data(),
            })
        )
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if (!userAuth) return
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onSignOutStart() {
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* onChangeAvatarStart() {
    yield takeLatest(userActionTypes.CHANGE_AVATAR_START, changeAvatar)
}
export function* changeAvatar(action) {
    try {
        const { selectedFile, currentUser } = action.payload
        const avatarUrl = yield call(uploadFile, selectedFile, currentUser)
        //    const avatarUrl = fileUpload.snapshot.ref.getDownloadURL()

        yield put(changeAvatarSuccess({ avatarUrl, currentUser }))
    } catch (error) {
        yield put(changeAvatarFailure(error))
    }
}

export function* onChangeAvatarSuccess() {
    yield takeLatest(
        userActionTypes.CHANGE_AVATAR_SUCCESS,
        saveAvatarUrlToUserDoc
    )
}
export function* saveAvatarUrlToUserDoc(action) {
    try {
        const { avatarUrl, currentUser } = action.payload
        const userRef = yield firestore.collection('users').doc(currentUser.id)
        const res = yield userRef.update({ profileImage: avatarUrl })
        yield put(checkUserSession())
    } catch (error) {
        console.log(error)
    }
}

export function* onSetFavItemStart() {
    yield takeLatest(userActionTypes.SET_FAV_ITEM_START, setFavItem)
}
export function* setFavItem(action) {
    try {
        const { userId, productId } = action.payload
        const favItemRef = yield firestore
            .collection('users')
            .doc(userId)
            .collection('favorites')
            .doc(productId)
            .set({ isFavorite: true })
        const favItemsSnapshot = yield firestore
            .collection('users')
            .doc(userId)
            .collection('favorites')
            .get()
        const favItems = yield favItemsSnapshot.docs.map((doc) => {
            return doc.id
        })
        yield put(setFavItemSuccess(favItems))
    } catch (error) {
        yield put(setFavItemFailure(error))
    }
}

export function* onRemoveFavItemStart() {
    yield takeLatest(userActionTypes.REMOVE_FAV_ITEM_START, removeFavItem)
}
export function* removeFavItem(action) {
    try {
        const { userId, productId } = action.payload
        const res = yield firestore
            .collection('users')
            .doc(userId)
            .collection('favorites')
            .doc(productId)
            .delete()
        const favItemsSnapshot = yield firestore
            .collection('users')
            .doc(userId)
            .collection('favorites')
            .get()
        const favItems = yield favItemsSnapshot.docs.map((doc) => {
            return doc.id
        })
        yield put(removeFavItemSuccess(favItems))
    } catch (error) {
        yield put(removeFavItemFailure(error))
    }
}
export function* onSubscribeNewsletterStart() {
    yield takeLatest(userActionTypes.SUBSCRIBE_NEWSLETTER_START, newSubscriber)
}
export function* newSubscriber(action) {
    try {
        const subscriber = action.payload
        const subscriberAdded = yield call(addSubscriber, subscriber)
        yield console.log(subscriberAdded)
        if (subscriberAdded) {
            yield put(subscribeNewsletterSuccess())
        } else {
            yield put(
                subscribeNewsletterFailure(
                    'Email Address Is Already Subscribed'
                )
            )
        }
    } catch (error) {
        yield put(subscribeNewsletterFailure(error))
    }
}

export function* userSagas() {
    yield all([
        call(onSubscribeNewsletterStart),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onChangeAvatarStart),
        call(onChangeAvatarSuccess),
        call(onSetFavItemStart),
        call(onRemoveFavItemStart),
    ])
}
