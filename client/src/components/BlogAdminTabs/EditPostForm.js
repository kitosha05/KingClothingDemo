import React, {useEffect, useState} from 'react';
import {connect,  useSelector} from 'react-redux'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {addPostSuccess, editPostStart, fetchPostsStart} from '../../redux/blog/blogActions'
import PlainSpinner from '../PlainSpinner/PlainSpinner';
import './EditPostForm.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const EditPostForm =({blogPosts, editPostStart, fetchPostsStart})=>{
  const [show, setShow] = useState('');
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentBody, setCurrentBody] = useState('')
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [currentFeatured, setCurrentFeatured]= useState('')
  const [editFeatured, setEditFeatured]= useState(false)
  const [rows, setRows]= useState([])

  const handleClose = () => {
    setShow('')
    resetFormFields()
  };

  const handleShow = (post) => {
    setCurrentTitle(post.title)
    setCurrentBody(post.body)
    setCurrentImageUrl(post.imageUrl)
    setShow(post.id)
  }
  const handleConfirm=async(postId)=>{
    const post={
      id:postId,
      title:currentTitle,
      body:currentBody,
      imageUrl:currentImageUrl
    }
  const res = await editPostStart(post)
  handleClose()
  fetchPostsStart()
  getRows()
  
  
  }
  const resetFormFields=()=>{
    setCurrentTitle('')
    setCurrentBody('')
    setCurrentImageUrl('')
  }


useEffect(()=>{
if(blogPosts){
  
  getFeaturedPost()
  getRows()
  
}
},[blogPosts])

const getFeaturedPost = ()=>{
  const post = blogPosts.filter(post=>post.featured===true)[0]
 const {id} = post

  setCurrentFeatured(id)
  
}


const getRows=()=>{
  const rows = blogPosts.map(post=>{
    const{author, postedDate, title, body, imageUrl, id} = post
      const dateString = postedDate.toDate().toDateString()
      return (createData(id, dateString, title, body, imageUrl, author))
    }
  )
  setRows(rows)
}
function createData(id, dateString, title, body, imageUrl, author) {
 
  return { id, dateString, title, body, imageUrl, author };
}
const changeTitle=e=>{
  setCurrentTitle(e.target.value)
}
const changeBody=e=>{
  setCurrentBody(e.target.value)
}
const changeImageUrl=e=>{
  setCurrentImageUrl(e.target.value)
}

    
const setFeatured=(postId)=>{
 //remove previous featured
  let post={
    id:currentFeatured,
    featured:false
  } 
  editPostStart(post)
//update new post
  setCurrentFeatured(postId)
   post ={
    id:postId,
    featured:true
  }
  editPostStart(post)

}


console.log(currentFeatured)

   if(!blogPosts)return<PlainSpinner/>
   
  return(
    <React.Fragment>
    <h1>Blog Posts</h1>
   
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Featured Post</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((post) => (
          <TableRow key={post.id}>
            <TableCell>
              
                  <Form.Check name='isFeatured' defaultChecked={currentFeatured===post.id} checked={currentFeatured===post.id} disabled/>
             

            </TableCell>
            <TableCell>{post.dateString}</TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.author}</TableCell>
            <TableCell>
             <div>
                <Button color="primary" onClick={()=>handleShow(post)} >Edit</Button>
                <Button variant='danger'  >Delete</Button>
                <Button onClick={()=>setFeatured(post.id)}>Set As Featured</Button>
            </div>  
            </TableCell>
            
            <Modal show={show===post.id} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
             <Form.Group controlId="title" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" onChange={changeTitle} 
                          value={currentTitle}
                          required/>
             </Form.Group>
             <Form.Group controlId="imageUrl">
               <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" name="imageUrl" onChange={changeImageUrl} 
                          value={currentImageUrl}
                          required/>
              </Form.Group>

             <Form.Group controlId="body">
               <Form.Label>Blog Post</Form.Label>
               <Form.Control as="textarea" rows={20} name="body" onChange={changeBody} 
                          value={currentBody}
                          required/>
             </Form.Group>

        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleConfirm(post.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </React.Fragment>
    
  )
}


const mapDispatchToProps = dispatch => ({
    fetchPostsStart:()=>dispatch(fetchPostsStart()),
    editPostStart: (post)=>dispatch(editPostStart(post))
  })

export default connect(null, mapDispatchToProps)(EditPostForm)