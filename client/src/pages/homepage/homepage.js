import React from 'react'
import './homepage.scss'
import Directory from '../../components/directory/directory.js'
import HeroImage from '../../components/HeroImage/HeroImage'
import AnimatedText from '../../components/AnimatedText/AnimatedText'
import HomepageBlogCards from '../../components/HomepageBlogCards/HomepageBlogCards'
import NewsletterSignUp from '../../components/NewsletterSignup/NewsletterSignUp'
const HomePage = () => {
    return(
        <div className='homepage'>
            <Directory />
            <NewsletterSignUp/>
           <HeroImage/> 
           <AnimatedText/>
           <HomepageBlogCards/>

        </div>
        
    )
}
export default HomePage