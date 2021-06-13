import './CollectionItem.scss'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addItem} from '../../redux/cart/cartActions'
import Button from '../CustomButton/CustomButton'


const CollectionItem = ({item, addItem, collectionRoute}) => {
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
            <Button onClick={()=>addItem(item)}inverted>Add To Cart</Button>
        </div>
    )
}
const mapDispatchToProps = dispatch =>({
    addItem: item=> dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)
