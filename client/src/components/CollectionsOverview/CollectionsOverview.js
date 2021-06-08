import React from 'react'
import {connect} from 'react-redux'
import{createStructuredSelector} from 'reselect'
import { selectCollectionsForPreview } from '../../redux/shop/shopSelector'
import CollectionPreview from '../CollectionPreview/CollectionPreview'
import './CollectionsOverview.scss'

const CollectionsOverview = ({collections})=>{
    
    return(
        <div className='collections-overview'>
                {
                 collections.map(collection=><CollectionPreview key={collection.id} {...collection}/>)
                }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)