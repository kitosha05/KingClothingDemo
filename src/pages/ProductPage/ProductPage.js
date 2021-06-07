import React, {useState}from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import{createStructuredSelector} from 'reselect'
import {selectProduct} from '../../redux/shop/shopSelector'
import Button from '../../components/Button/Button'
import {addItem, addOneOrMoreOfAnItem} from '../../redux/cart/cartActions'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'


import './ProductPage.scss'

const ProductPage =({ product, addItem, match}) =>{
    let numberOfItemsToAdd = 1
    const [quantity,setQuantity] = useState(1)
    const dropDownLabel = `Quantity: ${quantity}`
    const handleSelect = (e) => {
        console.log(e)
        setQuantity(e)
        
    }
    return(
        <Container className='col-md-8 offset-md-2 justify-content-center align-content-center'>
                
               
               <Card >  
                   <Row className="mt-3 mb-3 justify-content-md-center"><Card.Title as='h1'>{product.name}</Card.Title></Row> 
               <Row>
                        <Col md='6'>
                            <Container>
                                <Card.Img   src={product.imageUrl} /> 
                            </Container>
                           
                        </Col>         
                        
                      
                        <Col md='6'>
                        <Card.Body>
                            <Row className='justify-content-around align-items-center mb-5'>
                                <div className='adjust-quantity'>
                                    <Dropdown onSelect={handleSelect}>
                                        <Dropdown.Toggle variant='light' id="dropdown-basic">
                                         {dropDownLabel}
                                         </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="1" active>1</Dropdown.Item>
                                             <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                             <Dropdown.Item eventKey="3">3</Dropdown.Item>
                                             <Dropdown.Item eventKey="4">4</Dropdown.Item>
                                             <Dropdown.Item eventKey="5">5</Dropdown.Item>
                                         </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className='add-to-cart-button'>
                                    <Button onClick={()=>{
                                        for (let i = 1; i <= quantity; i++){
                                            addItem(product)
                                        }
                                    }}>ADD TO CART</Button>
                                </div>
                            </Row>
                            <Row className='justify-content-center align-items-center'>
                                <Card.Text>
                                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                 unknown printer took a galley of type and scrambled it to make a type specimen book. It has 
                                 survived not only five centuries, but also the leap into electronic typesetting, remaining 
                                 essentially unchanged. 
                                 </Card.Text>
            
                                <ListGroup className="list-group-flush">
                                 <ListGroupItem>Feature Number 1</ListGroupItem>
                                <ListGroupItem>Feature Number 2</ListGroupItem>
                                <ListGroupItem>Feature Number 3</ListGroupItem>
                                 </ListGroup>
                             </Row>
                             </Card.Body>
                         </Col>
                        
                     </Row>
                 </Card>
            
  </Container>
        
 
    )
}
const mapDispatchToProps = dispatch =>({
    addItem: (item) => dispatch(addItem(item))
})
const mapStateToProps = (state, ownProps) =>({
    product: selectProduct(ownProps.match.params.collectionId, ownProps.match.params.productId)(state)
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)