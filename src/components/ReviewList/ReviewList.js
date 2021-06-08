import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Review from '../Review/Review'
import './ReviewList.scss'
import {fetchReviewsStart} from '../../redux/reviews/reviewActions'
import {selectReviewsToDisplay} from '../../redux/reviews/reviewSelectors'
import {createStructuredSelector} from 'reselect'
import WriteReviewForm from '../WriteReviewForm/WriteReviewForm'

const ReviewList = ({reviews, fetchReviewsStart, productName})=>{
    
    useEffect(()=>{
        fetchReviewsStart(productName)
    }, [])
      
     
      return(
           <div>
               <h1>Reviews</h1>
               <WriteReviewForm/>
               {
                   reviews ? 
                    reviews.map(review=>{
                        return <Review reviewAuthor={review.reviewAuthor} reviewBody={review.reviewBody} reviewRating={review.reviewRating}/>
                    })
                   :
                   null
                  
               }
            </div>
        )
    
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchReviewsStart: ()=>dispatch(fetchReviewsStart(ownProps.productName))
  })

  const mapStateToProps = createStructuredSelector({
    reviews: selectReviewsToDisplay
  })    
export default connect(mapStateToProps, mapDispatchToProps)(ReviewList)