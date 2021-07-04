import './CollectionItem.scss'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {addItem} from '../../redux/cart/cartActions'
import Button from '../CustomButton/CustomButton'
import ReactStars from "react-rating-stars-component"
import { fetchReviewsStart } from '../../redux/reviews/reviewSagas';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { setFavItemStart, removeFavItemStart, checkUserSession } from '../../redux/user/userActions'
import { removeFavItem } from '../../redux/user/userSagas'
import Zoom from 'react-reveal/Zoom';


const configStars = {
    size: 25,
    edit: false
  };

const CollectionItem = ({checkUserSession, item, addItem, collectionRoute, averageRating, currentUser, favItems, setFavItemStart,  removeFavItemStart}) => {
    const history = useHistory();
    const [isFavorite, setIsFavorite] = useState(()=>{
        if (currentUser) {
        if (currentUser.favItems){
            if (currentUser.favItems.length>0) return currentUser.favItems.includes(item.id)
        }
        }
        return false
    })
  
    const {id, name, price, imageUrl} = item
    const productUrl = name.toLowerCase().replace(/\b \b/g, "-")

    useEffect(()=>{  
        if(currentUser){
            if(isFavorite) setFavItemStart(currentUser.id, id)
        if(!isFavorite) removeFavItemStart(currentUser.id, id)
        }  
          
        
    },[isFavorite])

    const onClick = async(e)=>{
        setIsFavorite(!isFavorite)
        
    }
    
const onDivClick=(e)=>{
   
    history.push(`/shop/${collectionRoute}/${productUrl}`)
}
    
    return(
        <Zoom bottom>
<div className='collection-item' onClick={(e)=>onDivClick(e)}>
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
            {currentUser ? (
                 <span className='fave-item-span' onClick={e=>onClick(e)}>
                 {isFavorite ? <FavoriteIcon className='fav-icon-filled'/> : <FavoriteBorderIcon className='fav-icon-open'/>}
                 
                 </span>

            ): ("")}
           
            
            
            
            
            <Button onClick={(e)=>{
               e.preventDefault();
               e.stopPropagation();
                addItem(item)
            }}
                inverted>
                    Add To Cart
                    </Button>
        </div>

        </Zoom>
        
    )
}
const mapDispatchToProps = dispatch =>({
    addItem: item=> dispatch(addItem(item)),
    fetchReviewsStart: productName=>dispatch(fetchReviewsStart(productName)),
    setFavItemStart: (userId, productId)=> dispatch(setFavItemStart(userId,productId)),
    removeFavItemStart: (userId, productId)=> dispatch(removeFavItemStart(userId,productId)),
    checkUserSession: ()=>dispatch(checkUserSession())
})
const mapStateToProps=state=>({
    currentUser: state.user.currentUser,
    favItems: state.user.favItems
   
})


export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem)
