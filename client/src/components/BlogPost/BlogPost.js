
import React, {useEffect}from 'react'
import {connect} from 'react-redux'
import { fetchPostsStart } from '../../redux/blog/blogActions'
import PlainSpinner from '../PlainSpinner/PlainSpinner'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import './BlogPost.scss'

const BlogPost =({blogPosts, postId, fetchPostsStart})=>{

    useEffect(()=>{
    if(!blogPosts)fetchPostsStart()
    },[postId])

const renderPost =(postId)=>{
    const post = blogPosts.filter(post=>post.id===postId)[0]
    return(
        <Card className='blog-post-card'>
            <Image className='blog-post-header-image' src={post.imageUrl}/>
            <Card.Body>
                <Card.Title as='h1'>{post.title}</Card.Title>
                <Card.Text><small>By: {post.author}</small></Card.Text>
                <Card.Text>{post.body}</Card.Text>
            </Card.Body>
        </Card>
    )

}
if(!blogPosts)return <PlainSpinner/>
return(
        <Col xs='12' md='8' className='blog-post offset-md-2 text-center'>
        {       
             renderPost(postId)
        }       
      </Col>
)
}
const mapDispatchToProps=dispatch=>({
    fetchPostsStart:()=>dispatch(fetchPostsStart())
})
const mapStateToProps=(state,ownProps)=>({
    postId:ownProps.match.params.postId,
    blogPosts:state.blog.blogPosts
})
export default connect(mapStateToProps,mapDispatchToProps)(BlogPost)