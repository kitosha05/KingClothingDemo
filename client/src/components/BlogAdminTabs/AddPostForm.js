import React from 'react'
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils.js'
import Form from 'react-bootstrap/Form'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {fetchCollectionsStart} from '../../redux/shop/shopActions'
import Button from '../CustomButton/CustomButton.js'
import {selectCollections} from '../../redux/shop/shopSelector'
import {addPostStart} from '../../redux/blog/blogActions'

class AddPostForm extends React.Component{
    state={title:"",imageUrl:'',body:''}
     
  
    onSubmit = async e => {
        e.preventDefault();
        const {title, imageUrl, body} = this.state
        const {displayName} = this.props.currentUser
        const date = new Date()
        const post = {
         title,
         imageUrl,
         body,
         author:displayName,
         postedDate: date

        }
        this.props.addPostStart(post)
    }
    onChange = e => {
        const {value, name} = e.target
        this.setState({[name]:value})
    }

    

    renderCollectionTitles(collections){
        let collectionTitles = []
        for (const [key, value] of Object.entries(collections)) {
            const formattedTitle= key.charAt(0).toUpperCase() + key.slice(1)
             collectionTitles.push(formattedTitle)
            
          }
          
        return collectionTitles.map(title=>{
            return <option value={title}>{title}</option>
        })

    }
    
      
    render(){
         const {name,price,imageUrl, id, collection, description} = this.state
         const {collections} = this.props
         
         

        
        return(
            <div className='product-admin'>
                <h2 className='title'>Add A New Blog Post</h2>

                <Form onSubmit={this.onSubmit}>
  <Form.Group controlId="title" >
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" name="title" onChange={this.onChange} 
                          value={this.state.title}
                          required/>
  </Form.Group>

  <Form.Group controlId="body">
    <Form.Label>Blog Post</Form.Label>
    <Form.Control as="textarea" rows={50} name="body" onChange={this.onChange} 
                          value={this.state.body}
                          required/>
    </Form.Group>
  <Form.Group controlId="imageUrl">
    <Form.Label>Image URL</Form.Label>
    <Form.Control type="text" name="imageUrl" onChange={this.onChange} 
                          value={this.state.imageUrl}
                          required/>
  </Form.Group>
  <Form.Group><Button type='submit'>Save New Blog Post</Button></Form.Group>
</Form>
            </div>
        )


}
}

const mapStateToProps=state=>({
    currentUser: state.user.currentUser
})
const mapDispatchToProps = dispatch => ({
    
    addPostStart: (post)=>dispatch(addPostStart(post))
  })

export default connect(mapStateToProps, mapDispatchToProps)(AddPostForm)