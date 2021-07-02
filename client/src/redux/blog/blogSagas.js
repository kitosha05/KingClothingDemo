import blogActionTypes from "./blogActionTypes";
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {firestore, addBlogPost, editBlogPost, fetchBlogPosts} from '../../firebase/firebase.utils'
import { addPostFailure, addPostSuccess, editPostFailure, editPostSuccess, fetchPostsSuccess,fetchPostsFailure } from "./blogActions";

export function* onAddPostStart(){
    yield takeLatest(blogActionTypes.ADD_POST_START, addPost)
}
export function* addPost(action){
    try {
        const post = action.payload
        const postId = yield call(addBlogPost, post)
        yield put(addPostSuccess())
    } catch (error) {
        yield put(addPostFailure(error))
    }
}
export function* onEditPostStart(){
    yield takeLatest(blogActionTypes.EDIT_POST_START, editPost)
}
export function* editPost(action){
    try {
        const post = action.payload
        const postId = yield call(editBlogPost, post)
        yield put(editPostSuccess())
    } catch (error) {
        yield put(editPostFailure(error))
    }
}
export function* onFetchPostsStart(){
    yield takeLatest(blogActionTypes.FETCH_POSTS_START, fetchPosts)
}
export function* fetchPosts(){
    try {
     
        const blogPosts = yield call(fetchBlogPosts)
        yield put(fetchPostsSuccess(blogPosts))
    } catch (error) {
        yield put(fetchPostsFailure(error))
    }
}
export function* blogSagas(){
    yield all([
        call(onAddPostStart),
        call(onEditPostStart),
        call(onFetchPostsStart)
    
    ])
}