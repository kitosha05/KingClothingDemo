import React from 'react'
import './FormInput.scss'

const FormInput = ({onChange, label, ...otherProps})=>{
    return(
        <div className='group'>
            <input className='form-input' onChange={onChange} {...otherProps}/>
            {
                label ?
                <label className={`${otherProps.value ? 'shrink' : ""} form-input-label`}>
                    {label}
                </label>
                : null
            }
        </div>
    )
}
export default FormInput