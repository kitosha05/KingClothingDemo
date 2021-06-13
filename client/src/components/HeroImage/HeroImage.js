import React from 'react'
import './HeroImage.scss'
import  BackgroundHero from '../../assets/homepageHero.jpg'
import Card from 'react-bootstrap/Card'
import CustomButton from '../CustomButton/CustomButton'
import {Link} from 'react-router-dom'
import LazyHero from 'react-lazy-hero'
import styled from 'styled-components'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import Button from '../CustomButton/CustomButton'

const HeroImage = () =>{
    return(
        
         <LazyHero parallaxOffset='100' imageSrc={BackgroundHero} minHeight='100vh' opacity=".4" isCentered='true'>
            <Card className='text-center'>
            
              <Card.Body>
                <Card.Title><Logo/> King Clothing</Card.Title>
                 <Card.Text>
                 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>  
                </Card.Text>   
                <Link to="/shop"><Button>Shop Now</Button></Link> 
                    
              </Card.Body>
            </Card>
        </LazyHero>
    )
}
export default HeroImage