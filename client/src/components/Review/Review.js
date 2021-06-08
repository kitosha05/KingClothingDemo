import React from 'react'
import Card from 'react-bootstrap/Card'
import './Review.scss'

const Review =({reviewAuthor, reviewBody, reviewRating})=>{
    
    return(
        <Card>
            <Card.Title>{reviewRating}</Card.Title>
            <Card.Body>
                <p>{reviewBody}</p>
                <span>{reviewAuthor}</span>
            </Card.Body>
        </Card>
    )
}
export default Review