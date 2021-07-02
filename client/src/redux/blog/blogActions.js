import blogActionTypes from './blogActionTypes'

export const addPostStart = (post)=>({
    type: blogActionTypes.ADD_POST_START,
    payload: post
})
export const addPostSuccess= ()=>({
    type: blogActionTypes.ADD_POST_SUCCESS
    
})
export const addPostFailure = (error)=>({
    type: blogActionTypes.ADD_POST_FAILURE,
    payload: error
})
export const fetchPostsStart = ()=>({
    type: blogActionTypes.FETCH_POSTS_START
})
export const fetchPostsSuccess = (blogPosts)=>({
    type: blogActionTypes.FETCH_POSTS_SUCCESS,
    payload:blogPosts
})
export const fetchPostsFailure = (error)=>({
    type: blogActionTypes.FETCH_POSTS_FAILURE,
    payload:error
})
export const editPostStart = (post)=>({
    type: blogActionTypes.EDIT_POST_START,
    payload: post
})
export const editPostSuccess= ()=>({
    type: blogActionTypes.EDIT_POST_SUCCESS
    
})
export const editPostFailure = (error)=>({
    type: blogActionTypes.EDIT_POST_FAILURE,
    payload: error
})

