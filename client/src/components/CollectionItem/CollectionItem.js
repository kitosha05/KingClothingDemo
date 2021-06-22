import './CollectionItem.scss'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addItem} from '../../redux/cart/cartActions'
import Button from '../CustomButton/CustomButton'
import ReactStars from "react-rating-stars-component"
import { fetchReviewsStart } from '../../redux/reviews/reviewSagas';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { setFavItemStart, removeFavItemStart } from '../../redux/user/userActions'


const configStars = {
    size: 25,
    edit: false
  };

const CollectionItem = ({item, addItem, collectionRoute, averageRating, currentUser, setFavItemStart, favItems, removeFavItemStart}) => {
    
    const [isFavorite, setIsFavorite] = useState(favItems.includes(item.id))
  
    const {id, name, price, imageUrl} = item
    const productUrl = name.toLowerCase().replace(/\b \b/g, "-")

    useEffect(()=>{
        if(currentUser && favItems){
           //if isFavorite is true and item not already in favItems then dispatch setFavItem
          if (isFavorite && !favItems.includes(id)) setFavItemStart(currentUser.id, id)
          if(!isFavorite && favItems.includes(id)) removeFavItemStart(currentUser.id, id) 
        }       
        
    },[isFavorite])

    const onClick = async(e)=>{
        setIsFavorite(!isFavorite)
        
    }
    const toggleFavorite = async()=>{
       
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
    setFavItemStart: (userId, productId)=> dispatch(setFavItemStart(userId,productId)),
    removeFavItemStart: (userId, productId)=> dispatch(removeFavItemStart(userId,productId))
})
const mapStateToProps=state=>({
    currentUser: state.user.currentUser,
    favItems: state.user.currentUser.favItems
})


export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem)
