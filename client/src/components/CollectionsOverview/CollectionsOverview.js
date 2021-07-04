import React, {useEffect}from 'react'
import {connect} from 'react-redux'
import{createStructuredSelector} from 'reselect'
import { fetchAllReviewsStart } from '../../redux/reviews/reviewActions'
import { selectCollectionsForPreview } from '../../redux/shop/shopSelector'
import CollectionPreview from '../CollectionPreview/CollectionPreview'
import Fade from 'react-reveal/Fade';
import './CollectionsOverview.scss'
import Col from 'react-bootstrap/Col'


const CollectionsOverview = ({collections, fetchAllReviewsStart})=>{
    useEffect(()=>{
        fetchAllReviewsStart()
    },[])
    return(
        <Col xs className='collections-overview col-md-10 offset-md-1'>

                {
                 collections.map(collection=>
                     <CollectionPreview key={collection.id} {...collection}/>
                 )
                }
        </Col>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})
const mapDispatchToProps = dispatch =>({
    fetchAllReviewsStart: ()=>dispatch(fetchAllReviewsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsOverview)