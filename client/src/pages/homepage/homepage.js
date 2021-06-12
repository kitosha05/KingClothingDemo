import React from 'react'
import './homepage.scss'
import Directory from '../../components/directory/directory.js'
import HeroImage from '../../components/HeroImage/HeroImage'

const HomePage = () => {
    return(
        <div className='homepage'>
           <HeroImage/>
            <Directory />
            
            
        </div>
        
    )
}
export default HomePage