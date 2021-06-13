import React from 'react'
import Card from 'react-bootstrap/Card'
import './Review.scss'
import StarRating from '../../components/StarRating/StarRating'
import ReactStars from "react-rating-stars-component"

const configStars = {
    size: 50,
    edit: false
  };
const Review =({reviewAuthor, reviewBody, reviewRating})=>{
    
    return(
        <Card>
            <Card.Title><ReactStars {...configStars} value={reviewRating}/></Card.Title>
            <Card.Body>
                <p>{reviewBody}</p>
                <span>{reviewAuthor}</span>
            </Card.Body>
        </Card>
    )
}
export default Review