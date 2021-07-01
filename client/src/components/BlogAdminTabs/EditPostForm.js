import React from 'react'
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils.js'
import Form from 'react-bootstrap/Form'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {fetchCollectionsStart} from '../../redux/shop/shopActions'
import Button from '../CustomButton/CustomButton.js'
import {selectCollections} from '../../redux/shop/shopSelector'
import {addProductStart} from '../../redux/admin/adminActions'

class EditPostForm extends React.Component{
    state={title:"",imageUrl:'',body:''}
     componentDidMount(){
         this.props.fetchCollectionsStart()
     }
  
    onSubmit = async e => {
        e.preventDefault();
        const {name, price, imageUrl, collection, description} = this.state
        const {collections} = this.props
        const product = {
          name,
          price,
          imageUrl,
          collection,
          description
        }
        this.props.addProductStart(product)
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
const mapStateToProps = createStructuredSelector({
    collections: selectCollections 
  })

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: ()=>dispatch(fetchCollectionsStart()),
    addProductStart: (product)=>dispatch(addProductStart(product))
  })

export default connect(mapStateToProps, mapDispatchToProps)(EditPostForm)