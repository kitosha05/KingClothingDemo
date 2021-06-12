import React from 'react'
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils.js'
import Form from 'react-bootstrap/Form'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {fetchCollectionsStart} from '../../redux/shop/shopActions'
import Button from '../CustomButton/CustomButton.js'
import {selectCollection, selectCollections} from '../../redux/shop/shopSelector'
import Card from 'react-bootstrap/Card'

class EditProductForm extends React.Component{
    state={name:"",price:'',imageUrl:'', id:'', collection:"", description:'', selectedProduct:'', selectedCollection:''}
     componentDidMount(){
         this.props.fetchCollectionsStart()
         
     }
  
    onSubmit = async e => {
        e.preventDefault();
        const {name, price, imageUrl, collection, description} = this.state
        const {collections} = this.props
    

        try{
            // const {user} = await auth.createUserWithEmailAndPassword(email,password)
            // await createUserProfileDocument(user, displayName)
            // this.setState({displayName:"",email:'',password:'',confirmPassword:''})

        }catch(error){
                console.log(error)
        }
    }
    onChange =  async e => {
        const {value, name} = e.target
       await this.setState({[name]:value})
    }
    onSelectCollection= async e=>{
        const {value} = e.target
        await this.setState({selectedCollection: value})
    }

    onSelectProduct=async e=>{
        const {value} = e.target
        await this.setState({selectedProduct:value})
        const {selectedProduct, selectedCollection}= this.state
        const product = this.props.collections[selectedCollection].items.find(({name})=> name == selectedProduct)
        const {price, imageUrl, description} = product
        await this.setState({price, imageUrl, name: selectedProduct, collection: selectedCollection})
    }
    renderCollectionTitles(collections){
        let collectionTitles = []
        for (const [key, value] of Object.entries(collections)) {
             collectionTitles.push(key)
            
          }
          
        return collectionTitles.map(title=>{
            return <option value={title}>{title}</option>
        })

    }

    renderProductsInCollection(collections, selectedCollection){
        const products= collections[selectedCollection].items
        return products.map(product=>{
            return <option value={product.name}>{product.name}</option>
        })
    }
    
      
    render(){
         const {name,price,imageUrl, id, collection, description, selectedProduct, selectedCollection} = this.state
         const {collections} = this.props
         
         

        
        return(
            <div className='product-admin'>
                
<Card className="mb-5">
    <Card.Title><h4>Select a Product To Edit</h4></Card.Title>
    <Card.Body>
    <Form>
                
                <Form.Group controlId="selectCollection">
                    <Form.Label>First, Narrow Products by Collection</Form.Label>
                    <Form.Control as="select" name="selectCollection" onChange={this.onSelectCollection} 
                          value={selectedCollection}
                          required>
                         {
                            collections ? this.renderCollectionTitles(collections) : null
                        }    
                 </Form.Control>
                </Form.Group>
                <Form.Group controlId="selectProduct">
                    <Form.Label>Then, Select A Product</Form.Label>
                    <Form.Control as="select" name="selectProduct" onChange={this.onSelectProduct} 
                          value={selectedProduct}
                          required>
                         {
                           selectedCollection ? this.renderProductsInCollection(collections, selectedCollection) : null
                        }    
                 </Form.Control>
                </Form.Group>
                
            </Form>

    </Card.Body>
</Card>
            <Card>
            <Card.Title><h4>Edit Selected Product</h4></Card.Title>
            <Form>
                
                 <Form.Group controlId="name" >
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={this.onChange} 
                          value={this.state.name}
                          required/>
                </Form.Group>
                <Form.Group controlId="price" >
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="name" onChange={this.onChange} 
                          value={this.state.price}
                          required/>
                </Form.Group>
                <Form.Group controlId="collection">
                  <Form.Label>Select A Collection</Form.Label>
                 <Form.Control as="select" name="collection" onChange={this.onChange} 
                          value={this.state.collection}
                          required>
                      {
                           collections ? this.renderCollectionTitles(collections) : null
                     }    
                 </Form.Control>
            </Form.Group>
         <Form.Group controlId="description">
              <Form.Label>Product Description</Form.Label>
             <Form.Control as="textarea" rows={4} name="imageUrl" onChange={this.onChange} 
                          value={this.state.description}
                          required/>
        </Form.Group>
        <Form.Group controlId="imageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="imageUrl" onChange={this.onChange} 
                          value={this.state.imageUrl}
                          required/>
        </Form.Group>
    </Form>




            </Card>


            
</div>
        )


}
}
const mapStateToProps = createStructuredSelector({
    collections: selectCollections 
  })

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: ()=>dispatch(fetchCollectionsStart())
  })

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm)