import React from 'react'
import './homepage.scss'
import Directory from '../../components/directory/directory.js'
import HeroImage from '../../components/HeroImage/HeroImage'
import AnimatedText from '../../components/AnimatedText/AnimatedText'
import HomepageBlogCards from '../../components/HomepageBlogCards/HomepageBlogCards'

const HomePage = () => {
    return(
        <div className='homepage'>
            <Directory />
            <AnimatedText/>
           <HeroImage/> 
           <HomepageBlogCards/>

        </div>
        
    )
}
export default HomePage