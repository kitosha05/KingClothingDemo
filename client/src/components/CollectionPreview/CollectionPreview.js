import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import{createStructuredSelector} from 'reselect'
import { selectProductsByCollection} from '../../redux/shop/shopSelector'
import './CollectionPreview.scss'
import CollectionItem from '../CollectionItem/CollectionItem.js'

const CollectionPreview = ({title, id, routeName, products}) => {
    const collectionId = id
   
    
   
    if(!products){
        return(
            <div>Loading...</div>
        )
    }
    
    const productsInCollection= (collection)=>{
        return(products.filter(product=>product.collection===collection))
    }
    
    return(
        <div className='collection-preview'>
            <Link to={`/shop/${title.toLowerCase()}`}><h1 className='title'>{title.toUpperCase()}</h1></Link>
            <div className='preview'>
                
                
                { productsInCollection(title).filter((item, idx)=>idx<4)
                    .map((item)=>{
                        return(
                            
                            <CollectionItem key={item.id}item={item} collectionId={collectionId} collectionRoute={routeName}/>
                                
                        )
                    })
                }
            </div>
        </div>
    )
}
const mapStateToProps = (state, ownProps)=>({
    products: state.shop.products
})
    

    

export default connect(mapStateToProps)(CollectionPreview)