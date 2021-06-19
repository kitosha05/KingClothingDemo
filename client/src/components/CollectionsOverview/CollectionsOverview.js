import React, {useEffect}from 'react'
import {connect} from 'react-redux'
import{createStructuredSelector} from 'reselect'
import { fetchAllReviewsStart } from '../../redux/reviews/reviewActions'
import { selectCollectionsForPreview } from '../../redux/shop/shopSelector'
import CollectionPreview from '../CollectionPreview/CollectionPreview'
import './CollectionsOverview.scss'

const CollectionsOverview = ({collections, fetchAllReviewsStart})=>{
    useEffect(()=>{
        fetchAllReviewsStart()
    },[])
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
const mapDispatchToProps = dispatch =>({
    fetchAllReviewsStart: ()=>dispatch(fetchAllReviewsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsOverview)