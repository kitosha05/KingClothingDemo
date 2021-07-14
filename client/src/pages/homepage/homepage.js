import React from 'react'
import { Helmet } from 'react-helmet'
import './homepage.scss'
import Directory from '../../components/directory/directory.js'
import HeroImage from '../../components/HeroImage/HeroImage'
import AnimatedText from '../../components/AnimatedText/AnimatedText'
import HomepageBlogCards from '../../components/HomepageBlogCards/HomepageBlogCards'
import NewsletterSignUp from '../../components/NewsletterSignup/NewsletterSignUp'
const HomePage = () => {
    return (
        <div className="homepage">
            <Helmet>
                <meta name="title" content="King Clothing" />
                <meta
                    name="description"
                    content="The Latest In Mens and Womens Hats, Sneakers, and Jackets"
                />
            </Helmet>
            <Directory />
            <AnimatedText />
            <HeroImage />
            <NewsletterSignUp />
            <HomepageBlogCards />
        </div>
    )
}
export default HomePage
