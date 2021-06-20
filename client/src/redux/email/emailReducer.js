import emailActionTypes from './emailActionTypes'

const INITIAL_STATE={
    mailOptions:null,
    errMessage:''
}

const emailReducer = (state=INITIAL_STATE, action) =>{
    switch (action.type){
        case emailActionTypes.SEND_EMAIL_START:
            return{
                ...state,
                mailOptions:action.payload
            }
        case emailActionTypes.SEND_EMAIL_FAILURE:
            return{
                ...state,
                errMessage:'There was an issue sending the email'
            }
        case emailActionTypes.SEND_EMAIL_SUCCESS:
            return{
                ...state,
                errMessage: ""
            }
        default:
            return{
                ...state
            }
    }
}

export default emailReducer