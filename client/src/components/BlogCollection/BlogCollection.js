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
      const posts = blogPosts.filter(post=>post.featured===false)
       return posts.map(post=>{
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

    const renderFeaturedPost=()=>{
        const post = blogPosts.filter(post=>post.featured===true)[0]
        return(
            <Row className='featured-post-row' >
            <Card className=" text-white featured-post">
                <Image src={post.imageUrl} alt="Card image" className='featured-image' />
                <Card.ImgOverlay className='featured-blog-overlay text-center'>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                {post.body.substring(0,100)}
                </Card.Text>
                <Card.Text><small>By: {post.author}</small></Card.Text>
                 </Card.ImgOverlay>
            </Card>
            </Row>
        )
    }

    return(
        <Col className='col-8 offset-2 '>
            <Row className='text-center mt-1 mb-3'>
                <h1>The King Clothing Blog</h1>
            </Row>
           {
               renderFeaturedPost()
           }
            <Row className='mt-3 justify-content-center'>
                {
                    renderBlogCards(blogPosts)
                }
            </Row>
        </Col>
    )
}
export default BlogCollection