import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import{createStructuredSelector} from 'reselect'
import { selectProductsByCollection} from '../../redux/shop/shopSelector'
import './CollectionPreview.scss'
import CollectionItem from '../CollectionItem/CollectionItem.js'
import Fade from 'react-reveal/Fade';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CollectionPreview = ({title, id, routeName, products, allReviews}) => {
    const collectionId = id
   
    
   
    if(!products || !allReviews){
        return(
            <div>Loading...</div>
        )
    }

    
    const productsInCollection= (collection)=>{
        return(products.filter(product=>product.collection===collection))
    }

    const averageRating = (product)=>{
        const productReviews = allReviews.filter(review=>review.productId===product.id)
        let subTotal = 0
        productReviews.map(review=>{
            subTotal += review.reviewRating
        })
        return subTotal / productReviews.length
    }
    
    return(
        <Fade bottom>
             <div className='collection-preview'>
           <h1 className='title'><Link to={`/shop/${title.toLowerCase()}`}>{title.toUpperCase()}</Link></h1>
            <Row className='preview'>
                
                
                { productsInCollection(title).filter((item, idx)=>idx<4)
                    .map((item)=>{
                        return(
                            <Col xs='6' md='4' lg='3'>
                                 <CollectionItem key={item.id}item={item} averageRating={averageRating(item)} collectionId={collectionId} collectionRoute={routeName}/>

                            </Col>
                                
                        )
                    })
                }
            </Row>
        </div>
        </Fade>
       
    )
}
const mapStateToProps = (state, ownProps)=>({
    products: state.shop.products,
    allReviews: state.reviews.allReviews
})
    

    

export default connect(mapStateToProps)(CollectionPreview)