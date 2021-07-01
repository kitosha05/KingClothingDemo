import React from 'react'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import PlainSpinner from '../PlainSpinner/PlainSpinner'
import './BlogCollection.scss'

const BlogCollection =({blogPosts})=>{
    if(!blogPosts)return <PlainSpinner/>

    const renderBlogCards = (blogPosts)=>{
       return blogPosts.map(post=>{
            const {id,title, body, author, postedDate, imageUrl} = post
            const route = `/blog/${id}`
            return(
                <Col key={id} xs sm='6' md='4' className='text-center'>
                <Card className='blog-preview-card'>
                <Link to={route}><Image className='blog-preview-image'src={imageUrl}/></Link>
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
        })
        
    }

    return(
        <Col className='col-8 offset-2'>
            <Row>
                <h1>Blog</h1>
            </Row>
            <Row >
            <Card className="bg-dark text-white featured-post">
                <Card.Img src={blogPosts[1].imageUrl} alt="Card image" className='featured-image'/>
                <Card.ImgOverlay>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
                </Card.Text>
                <Card.Text>Last updated 3 mins ago</Card.Text>
                 </Card.ImgOverlay>
            </Card>
            </Row>
            <Row className='mt-3'>
                {
                    renderBlogCards(blogPosts)
                }
            </Row>
        </Col>
    )
}
export default BlogCollection