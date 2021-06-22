import './CollectionItem.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addItem} from '../../redux/cart/cartActions'
import Button from '../CustomButton/CustomButton'
import ReactStars from "react-rating-stars-component"
import { fetchReviewsStart } from '../../redux/reviews/reviewSagas';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { setFavItemStart } from '../../redux/user/userActions'


const configStars = {
    size: 25,
    edit: false
  };

const CollectionItem = ({item, addItem, collectionRoute, averageRating, currentUser, setFavItemStart}) => {
    const [isFavorite, setIsFavorite] = useState(false)
  
    const {id, name, price, imageUrl} = item
    const productUrl = name.toLowerCase().replace(/\b \b/g, "-")

    const onClick = async(e)=>{
        await setIsFavorite(!isFavorite)
        if(isFavorite)setFavItemStart(currentUser.id, id)

    }
    
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
            <span className='fave-item-span' onClick={e=>onClick(e)}>
            {isFavorite ? <FavoriteIcon className='fav-icon-filled'/> : <FavoriteBorderIcon className='fav-icon-open'/>}
            
            </span>
            
            
            
            
            <Button onClick={()=>addItem(item)}inverted>Add To Cart</Button>
        </div>
    )
}
const mapDispatchToProps = dispatch =>({
    addItem: item=> dispatch(addItem(item)),
    fetchReviewsStart: productName=>dispatch(fetchReviewsStart(productName)),
    setFavItemStart: (userId, productId)=> dispatch(setFavItemStart(userId,productId))
})
const mapStateToProps=state=>({
    currentUser: state.user.currentUser
})


export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem)
