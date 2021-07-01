import blogActionTypes from "./blogActionTypes";

const INITIAL_STATE={
    newPost:null,
    error:null,
    blogPosts:null
    
}

const blogReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        
        case blogActionTypes.ADD_POST_SUCCESS:
            return{
                ...state,
                newPost:null,
                error:null
            }
        case blogActionTypes.ADD_POST_FAILURE:
                return{
                    ...state,
                    error: action.payload
                }
        case blogActionTypes.FETCH_POSTS_SUCCESS:
            return{
                ...state,
                blogPosts:action.payload,
                error:null
            }
        case blogActionTypes.FETCH_POSTS_FAILURE:
                return{
                    ...state,
                    error:action.payload
                }
        default:
            return{
                ...state
            }
    }

}
export default blogReducer
