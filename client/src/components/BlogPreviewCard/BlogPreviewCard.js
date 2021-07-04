import React from 'react'
import {Link} from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import './BlogPreviewCard.scss'

const BlogPreviewCard =({post, route})=>{
    const {id,title, body, author, postedDate, imageUrl} = post
    return(
        <Col key={id} xs='12' sm='6' md='4' lg='3' className='text-center mt-5 mb-5'>
                <Card className='blog-preview-card'>
                <Link className='blog-image-container' to={route}><Image className='blog-preview-image'src={imageUrl} fluid/></Link>
                <Card.Body className='blog-preview-body'>
                    <Card.Title><Link to={route}>{title}</Link></Card.Title>
                    <Card.Text><small>Author: {author}</small></Card.Text>
                    <Card.Text><small>Posted: {postedDate.toDate().toDateString()}</small></Card.Text>
                  <Card.Text>
                    {body.substring(0,100)}
                  </Card.Text>
                </Card.Body>
              </Card>
              </Col>
    )
}
export default BlogPreviewCard