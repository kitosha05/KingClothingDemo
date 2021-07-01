import React, {useState, useEffect}from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {selectProduct} from '../../redux/shop/shopSelector'
import CustomButton from '../../components/CustomButton/CustomButton'
import {addItem, addOneOrMoreOfAnItem} from '../../redux/cart/cartActions'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ProductAccordion from '../../components/ProductAccordion/ProductAccordion'
import ReviewList from '../../components/ReviewList/ReviewList'
import ImageGallery from '../../components/ImageGallery/ImageGallery'
import PlainSpinner from '../../components/PlainSpinner/PlainSpinner'
import './ProductPage.scss'
import {fetchReviewsStart} from '../../redux/reviews/reviewActions'
import WriteReviewForm from '../../components/WriteReviewForm/WriteReviewForm'


const ProductPage =({ product, addItem, match, fetchReviewsStart, currentUser}) =>{
    let numberOfItemsToAdd = 1
    const [quantity,setQuantity] = useState(1)
    const dropDownLabel = `Quantity: ${quantity}`
    const handleSelect = (e) => {
        console.log(e)
        setQuantity(e)
        
    }

  
  
   if(!product)  return<PlainSpinner/>
   fetchReviewsStart(product.id)
    return(
        <Container className='mt-3 col-md-8 offset-md-2 justify-content-center align-content-center'>
                
               
               <Card className='text-center product-card'>  
                   <Row className="mt-3 mb-3 justify-content-center align-items-center">
                       <Card.Title as='h1'>{product.name}</Card.Title>
                    </Row> 
                    <Row>
                        <Col md='6'>
                            <Container>
                                <ImageGallery imageUrl={product.imageUrl}/>
                                {/* <Card.Img   src={product.imageUrl} />  */}
                            </Container>
                           
                        </Col>         
                        
                      
                        <Col md='6'>
                        <Card.Body>
                            <Row className='justify-content-around align-items-center mb-5'>
                                <Col>
                                    <Row>
                                        <h3 className='item-price'>Price: ${product.price}</h3>
                                    </Row>
                                    <Row>
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

                                    </Row>
                                    
                                </Col>
                                <Col>
                                <div className='add-to-cart-button'>
                                    <CustomButton onClick={()=>{
                                        for (let i = 1; i <= quantity; i++){
                                            addItem(product)
                                        }
                                    }}>ADD TO CART</CustomButton>
                                </div>
                                </Col>
                               
                               
                            </Row>
                            <Row className='justify-content-center align-items-center'>
                                    <ProductAccordion product={product}/>
                             </Row>
                             </Card.Body>
                         </Col>
                        
                     </Row>
                    
                 </Card>
                 {
                     currentUser ? <WriteReviewForm productId={product.id} currentUser={currentUser}/> : (
                         <h3>Sign In To Write A Review</h3>
                     )
                 }
                 

            
  </Container>
        
 
    )
   
}
const mapDispatchToProps = dispatch =>({
    addItem: (item) => dispatch(addItem(item)),
    fetchReviewsStart: productId=> dispatch(fetchReviewsStart(productId))
})
const mapStateToProps = (state, ownProps) =>({
    product: selectProduct( ownProps.match.params.productId)(state),
    currentUser: state.user.currentUser
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)