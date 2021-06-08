import React, {useState,useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import Review from '../Review/Review'
import './ReviewList.scss'
import {fetchReviewsStart} from '../../redux/reviews/reviewActions'
import {selectReviewsToDisplay} from '../../redux/reviews/reviewSelectors'
import {checkUserSession} from '../../redux/user/userActions'
import {createStructuredSelector} from 'reselect'
import WriteReviewForm from '../WriteReviewForm/WriteReviewForm'





const ReviewList = ({reviews, fetchReviewsStart, productName, user})=>{
    
    useEffect(()=>{
        fetchReviewsStart(productName)
       checkUserSession()
       
    }, [])
       
    const {currentUser} = useSelector((state) => state.user)
    
      return(
           <div>
               <h1>Reviews</h1>
               {
                    currentUser ? (
                    <WriteReviewForm fetchReviewsStart={fetchReviewsStart} currentUser={currentUser} productName={productName}/>
                   )
                   :
                   null
               }
               
               {
                   reviews ? 
                    reviews.map(review=>{
                        return <Review reviewAuthor={review.reviewAuthor}  reviewBody={review.reviewBody} reviewRating={review.reviewRating}/>
                    })
                   :
                   null
                  
               }
            </div>
        )
    
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchReviewsStart: ()=>dispatch(fetchReviewsStart(ownProps.productName)),
    checkUserSession: ()=>dispatch(checkUserSession())
  })

  const mapStateToProps = createStructuredSelector({
    reviews: selectReviewsToDisplay
  })    
export default connect(mapStateToProps, mapDispatchToProps)(ReviewList)