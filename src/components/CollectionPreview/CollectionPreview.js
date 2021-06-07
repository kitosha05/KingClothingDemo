import React from 'react'
import {Link} from 'react-router-dom'
import './CollectionPreview.scss'
import CollectionItem from '../CollectionItem/CollectionItem.js'

const CollectionPreview = ({title, id, items, routeName}) => {
    const collectionId = id
    const collectionRoute = routeName
    return(
        <div className='collection-preview'>
            <Link to={`/shop/${routeName}`}><h1 className='title'>{title.toUpperCase()}</h1></Link>
            <div className='preview'>
                
                {items
                    .filter((item, idx)=>idx<4)
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
export default CollectionPreview