import React from 'react'
import { useHistory } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from '../CustomButton/CustomButton'
import PlainSpinner from '../PlainSpinner/PlainSpinner'
import './BlogCollection.scss'
import BlogPreviewCard from '../BlogPreviewCard/BlogPreviewCard'

const BlogCollection = ({ blogPosts }) => {
    const history = useHistory()
    if (!blogPosts) return <PlainSpinner />

    const renderBlogCards = (blogPosts) => {
        const posts = blogPosts.filter((post) => post.featured === false)
        return posts.map((post) => {
            const { id } = post
            const route = `/blog/${id}`
            return <BlogPreviewCard post={post} route={route} />
        })
    }

    const renderFeaturedPost = () => {
        const post = blogPosts.filter((post) => post.featured === true)[0]
        const { id } = post
        const route = `/blog/${id}`
        return (
            <Row className="featured-post-row">
                <Col xs="12" md="10" className="offset-md-1">
                    <Card className=" text-white featured-post">
                        <Image
                            src={post.imageUrl}
                            alt="Card image"
                            className="featured-image"
                            fluid
                        />
                        <Card.ImgOverlay className="featured-blog-overlay text-center">
                            <Card.Title as="h2" className="featured-blog-title">
                                {post.title}
                            </Card.Title>
                            <Card.Text>
                                {post.body.substring(0, 100)}...
                            </Card.Text>
                            <Row className="align-items-center justify-content-center">
                                <Button onClick={() => history.push(route)}>
                                    READ MORE
                                </Button>
                            </Row>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
        )
    }

    return (
        <Col xs className="justify-content-center align-items-center">
            <Row className="text-center mt-1 mb-3">
                <h1>The King Clothing Blog</h1>
            </Row>
            {renderFeaturedPost()}
            <Row className="mt-5 mb-5 justify-content-center">
                {renderBlogCards(blogPosts)}
            </Row>
        </Col>
    )
}
export default BlogCollection
