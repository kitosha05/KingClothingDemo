import React, {useState,useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import Review from '../Review/Review'
import './ReviewList.scss'
import {fetchReviewsStart} from '../../redux/reviews/reviewActions'
import {selectReviewsToDisplay} from '../../redux/reviews/reviewSelectors'
import {checkUserSession} from '../../redux/user/userActions'
import {createStructuredSelector} from 'reselect'
import WriteReviewForm from '../WriteReviewForm/WriteReviewForm'





const ReviewList = ({reviews, fetchReviewsStart, productId, user, productName})=>{
    
    useEffect(()=>{
       checkUserSession()
       
    }, [reviews])
       
    const {currentUser} = useSelector((state) => state.user)
    
      return(
           <div>
               <h1>Reviews</h1>
               {
                    currentUser ? (
                    <WriteReviewForm  currentUser={currentUser} productId={productId} productName={productName}/>
                   )
                   :
                  <span>Sign In To Write A Review</span>
               }
               
               {
                   reviews ? 
                    reviews.map(review=>{
                        return <Review reviewAuthor={review.reviewAuthor}  reviewBody={review.reviewBody} reviewRating={review.reviewRating}/>
                    })
                   :
                   <div>Be The First To Review This Product!</div>
                  
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