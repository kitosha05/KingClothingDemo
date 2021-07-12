import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import BlogPreviewCard from '../BlogPreviewCard/BlogPreviewCard'
import { fetchPostsStart } from '../../redux/blog/blogActions'
import PlainSpinner from '../PlainSpinner/PlainSpinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Fade from 'react-reveal/Fade';
const HomepageBlogCards = ({fetchPostsStart, blogPosts})=>{
    useEffect(()=>{
        if(!blogPosts)fetchPostsStart()
    }, [blogPosts])
    if(!blogPosts)return <PlainSpinner/>
    return(
       <Fade left>
        <Col className='homepage-blog-card mt-5'>
            <Row className='text-center mb-5'>
                <h2>Lastest From Our Blog</h2>
            </Row>
        <Row>
            {blogPosts.slice(0,4).map(post=>{
                return <BlogPreviewCard post={post} route={`/blog/${post.id}`}/>
            })}
        </Row>

        </Col>
        </Fade>
    )
}
const mapDispatchToProps=dispatch=>({
    fetchPostsStart:()=>dispatch(fetchPostsStart())
})
const mapStateToProps=state=>({
    blogPosts: state.blog.blogPosts
})
export default connect(mapStateToProps, mapDispatchToProps)(HomepageBlogCards)