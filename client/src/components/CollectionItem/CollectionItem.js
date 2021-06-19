import './CollectionItem.scss'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addItem} from '../../redux/cart/cartActions'
import Button from '../CustomButton/CustomButton'
import ReactStars from "react-rating-stars-component"
import { fetchReviewsStart } from '../../redux/reviews/reviewSagas';


const configStars = {
    size: 25,
    edit: false
  };

const CollectionItem = ({item, addItem, collectionRoute, averageRating}) => {
  
    const {id, name, price, imageUrl} = item
    const productUrl = name.toLowerCase().replace(/\b \b/g, "-")
    return(
        <div className='collection-item'>
                <div className='image'
                    style={{backgroundImage: `url(${imageUrl})`}}
                 />
            
           
             <div className='collection-footer'>
             
             <Link to={`/shop/${collectionRoute}/${productUrl}`}><span className='name'>{name}</span></Link>
            
            <span className='price'>${price}</span>
            </div>
            <div className='stars'>
            <ReactStars {...configStars} value={averageRating}/>
            </div>
            
            <Button onClick={()=>addItem(item)}inverted>Add To Cart</Button>
        </div>
    )
}
const mapDispatchToProps = dispatch =>({
    addItem: item=> dispatch(addItem(item)),
    fetchReviewsStart: productName=>dispatch(fetchReviewsStart(productName))
})


export default connect(null, mapDispatchToProps)(CollectionItem)
