import React, {useState, useSelector} from 'react'
import {connect} from 'react-redux'
import './WriteReviewForm.scss'
import Form from 'react-bootstrap/Form'
import CustomButton from '../../components/CustomButton/CustomButton'
import StarRating from '../../components/StarRating/StarRating'
import ReactStars from "react-rating-stars-component"
import {addReviewStart, fetchReviewsStart} from '../../redux/reviews/reviewActions'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


const WriteReviewForm = ({productId, currentUser, addReviewStart, fetchReviewsStart, productName})=> {
    const [reviewBody, setReviewBody] = useState("")
    const [reviewRating, setReviewRating] = useState(5)
    

    
  

    const onSubmit = async e => {
        e.preventDefault();
        
        const review = {
            reviewRating: reviewRating,
            reviewBody: reviewBody,
            productId: productId,
            reviewAuthor: currentUser.displayName
        }
        try{
            
            
            addReviewStart(review)
            setReviewBody("")
            fetchReviewsStart(productId)

        }catch(error){
                console.log(error)
        }
    }
    const onReviewBodyChange = e => {
        const {value, name} = e.target
        setReviewBody(value)
    }

    const onRatingChange = newRating =>{
       setReviewRating(newRating)
    }

      
     const configStars = {
            size: 50,
            value: 5,
            edit: true
          };
    return(
          <Card className='write-review-card'>
              <Form className='write-review-form' onSubmit={e=>onSubmit(e)}>
                <h2 className='write-review-form-title'>Add A New Review</h2>
                <Row className='justify-content-center align-items-center'>
               
                    <Col xs='6'>
                    <Form.Label className='start-label'>Product Rating:</Form.Label>
                    </Col>
                    <Col xs='6'>
                    <ReactStars onChange={e=>onRatingChange(e)} value={reviewRating}{...configStars}/>
                    </Col>   
              
                </Row>
                
                <Form.Group controlId="reviewBody">
                <Form.Label>Comments</Form.Label>
                     <Form.Control onChange={e=>onReviewBodyChange(e)} value={reviewBody} name="reviewBody" as="textarea" rows={4} />
                     
                </Form.Group>
                <CustomButton variant="primary" type="submit">
                    Submit
                </CustomButton>
              
            </Form>

          </Card>
            
        
    )
    
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addReviewStart: (review)=>dispatch(addReviewStart(review)),
    fetchReviewsStart: productId=> dispatch(fetchReviewsStart(productId))
 })

export default connect(null, mapDispatchToProps)(WriteReviewForm)