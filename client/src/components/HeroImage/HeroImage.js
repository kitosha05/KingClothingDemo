import React from 'react'
import './HeroImage.scss'
import BackgroundHero from '../../assets/homepageHero.jpg'
import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'
import LazyHero from 'react-lazy-hero'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import Button from '../CustomButton/CustomButton'
import Bounce from 'react-reveal/Bounce'

const HeroImage = () => {
    return (
        <LazyHero
            parallaxOffset={100}
            imageSrc={BackgroundHero}
            minHeight="100vh"
            opacity={0.4}
            isCentered={true}
        >
            <Bounce>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>
                            <Logo /> King Clothing
                        </Card.Title>
                        <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </Card.Text>
                        <Link to="/shop">
                            <Button>Shop Now</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Bounce>
        </LazyHero>
    )
}
export default HeroImage
