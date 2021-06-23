import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchProductsStart } from '../../redux/shop/shopActions'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import CardDeck from 'react-bootstrap/CardDeck'
import './Wishlist.scss'

const getWishlistProducts =(favItems, products)=>{
const wishlistProducts = favItems.map(favItem=>{
     return products.filter(product=>product.id===favItem)[0]
 })
 return wishlistProducts
}

const renderProductCards = (wishlistProducts)=>{
   
  const productCards = wishlistProducts.map(product=>{
    const productRoute = product.name.replace(" ","-").toLowerCase()
        return (
           <Card className='wishlist-card'>
               <Image src={product.imageUrl}/>
               <Card.Body>
                   <Card.Text>{product.name} ---  ${product.price}</Card.Text>
                   <Card.Text>
                       <p>
                       {product.description}
                       </p>
                     </Card.Text>
                     <Card.Text><small class="text-muted"><Link to={`/shop/${product.collection.toLowerCase()}/${productRoute}`}>View Product</Link></small></Card.Text>
               </Card.Body>
               
           </Card>
        
        )
    })
    return productCards
}
const WishList = ({favItems, products, fetchProductsStart})=>{
    useEffect(()=>{
        fetchProductsStart()
        
    },[])

    if(!products) return<div>...Loading</div>
   
    return(
        <Container>
        <Col className='col-md-10 offset-md-1'>
            <h1 className='page-title'>Your Wish List</h1>
            <CardDeck>
            {renderProductCards(getWishlistProducts(favItems, products))}
            </CardDeck>
        </Col>
        </Container>
       
    )
}
const mapDispatchToProps = dispatch =>({
    fetchProductsStart: ()=>dispatch(fetchProductsStart())
})
const mapStateToProps = state=>({
    favItems: state.user.favItems,
    products: state.shop.products
})
export default connect(mapStateToProps, mapDispatchToProps)(WishList)