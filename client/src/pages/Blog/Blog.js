import React, {useEffect, lazy, Suspense} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchPostsStart } from '../../redux/blog/blogActions'
import PlainSpinner from '../../components/PlainSpinner/PlainSpinner'

import './Blog.scss'

const BlogCollection=lazy(()=>import('../../components/BlogCollection/BlogCollection'))
const BlogPost=lazy(()=>import('../../components/BlogPost/BlogPost'))

const Blog = ({fetchPostsStart, blogPosts,ownProps})=>{
const {match} = ownProps

    useEffect(()=>{
        if(!blogPosts)fetchPostsStart()
    },[])
    return(
        <div className='blog-page'>
          
          <Suspense fallback={<PlainSpinner/>}>
          <Route exact path={`${match.path}`} render={(props)=><BlogCollection  {...props} blogPosts={blogPosts} />}/>
          {/* <Route exact path={`${match.path}/:postId`} render={(props)=><BlogPost {...props} blogPosts={blogPosts}/>}/>  */}
      </Suspense>
     
       </div>
      )
}
const mapDispatchToProps=dispatch=>({
    fetchPostsStart:()=>dispatch(fetchPostsStart())
})
const mapStateToProps = (state,ownProps)=>({
    blogPosts: state.blog.blogPosts,
    ownProps:ownProps
})

export default connect(mapStateToProps,mapDispatchToProps)( Blog)