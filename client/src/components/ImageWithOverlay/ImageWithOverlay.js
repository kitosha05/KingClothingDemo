import { Divider } from '@material-ui/core'
import React from 'react'
import Card from 'react-bootstrap/Card'
import CardImg from 'react-bootstrap/CardImg'
import Image from 'react-bootstrap/Image'
import './ImageWithOverlay.scss'

const ImageWithOverlay = () =>{
    return(
        <Card className='image-card'>
            <Card.Img className='collection-image' src='https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'/>
            <Card.ImgOverlay>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                     This is a wider card with supporting text below as a natural lead-in to
                     additional content. This content is a little bit longer.
                 </Card.Text>
                 <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
        </Card>
    )
}

export default ImageWithOverlay