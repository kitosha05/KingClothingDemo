import {all, call, put, takeLatest} from 'redux-saga/effects';
import {firestore} from '../../firebase/firebase.utils'
import {sendEmailStart, sendEmailFailure, sendEmailSuccess} from './emailActions'
import emailActionTypes from './emailActionTypes'

export function* onSendEmailStart(){
    yield takeLatest(emailActionTypes.SEND_EMAIL_START, sendEmail)
}

export function* sendEmail(action){
    try {
       yield put(sendEmailSuccess()) 
    } catch (error) {
        yield put(sendEmailFailure(error))
    }
}

export function* emailSagas(){
    yield all([
        call(onSendEmailStart())
     ])
    }