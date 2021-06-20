import emailActionTypes from './emailActionTypes'

export const sendEmailStart=(mailOptions)=>({
    action: emailActionTypes.SEND_EMAIL_START,
    payload: mailOptions
})
export const sendEmailFailure=(error)=>({
    action: emailActionTypes.SEND_EMAIL_FAILURE,
    payload: error
})
export const sendEmailSuccess=()=>({
    action: emailActionTypes.SEND_EMAIL_SUCCESS
})
