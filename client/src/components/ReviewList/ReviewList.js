import React, {useState,useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import Review from '../Review/Review'
import './ReviewList.scss'
import {fetchReviewsStart} from '../../redux/reviews/reviewActions'
import {selectReviewsToDisplay} from '../../redux/reviews/reviewSelectors'
import {checkUserSession} from '../../redux/user/userActions'
import {createStructuredSelector} from 'reselect'





const ReviewList = ({reviews, fetchReviewsStart, productId, user, productName})=>{
    
    useEffect(()=>{
       checkUserSession()
       
    }, [reviews])
       
    const {currentUser} = useSelector((state) => state.user)
    
      return(
           <div>
             
               {
                   reviews.length>0 ? 
                    reviews.map(review=>{
                        return <Review reviewAuthor={review.reviewAuthor}  reviewBody={review.reviewBody} reviewRating={review.reviewRating}/>
                    })
                   :
                   <h3>NO REVIEWS YET</h3>
               }
              
               
               
            </div>
        )
    
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchReviewsStart: productId=> dispatch(fetchReviewsStart(productId)),

    checkUserSession: ()=>dispatch(checkUserSession())
  })
const mapStateToProps = state =>({
  reviews: state.reviews.reviews
})

    
export default connect(mapStateToProps, mapDispatchToProps)(ReviewList)