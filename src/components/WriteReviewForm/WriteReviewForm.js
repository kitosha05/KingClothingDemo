import React, {useState, useSelector} from 'react'
import {connect} from 'react-redux'
import './WriteReviewForm.scss'
import Form from 'react-bootstrap/Form'
import CustomButton from '../../components/CustomButton/CustomButton'
import StarRating from '../../components/StarRating/StarRating'
import ReactStars from "react-rating-stars-component"
import {addReviewStart} from '../../redux/reviews/reviewActions'

const WriteReviewForm = ({productName, currentUser, addReviewStart, fetchReviewsStart})=> {
    const [reviewBody, setReviewBody] = useState("")
    const [reviewRating, setReviewRating] = useState(5)
    

    
  

    const onSubmit = async e => {
        e.preventDefault();
        
        const review = {
            reviewRating: reviewRating,
            reviewBody: reviewBody,
            productName: productName,
            reviewAuthor: currentUser.displayName
        }
        try{
            
            
            addReviewStart(review)
            setReviewBody("")
            fetchReviewsStart(productName)
            
            // const {user} = await auth.createUserWithEmailAndPassword(email,password)
            // await createUserProfileDocument(user, displayName)
            // this.setState({displayName:"",email:'',password:'',confirmPassword:''})

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
          
            <Form onSubmit={e=>onSubmit(e)}>
                <Form.Group controlId="reviewRating">
                     <Form.Label>Rate This Product</Form.Label>
                     <ReactStars onChange={e=>onRatingChange(e)} value={reviewRating}{...configStars}/>
                </Form.Group>
                <Form.Group controlId="reviewBody">
                     <Form.Control onChange={e=>onReviewBodyChange(e)} value={reviewBody} name="reviewBody" as="textarea" rows={4} />
                     <CustomButton variant="primary" type="submit">
                    Submit
                </CustomButton>
                </Form.Group>
              
            </Form>
        
    )
    
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addReviewStart: (review)=>dispatch(addReviewStart(review)),
   
  })

export default connect(null, mapDispatchToProps)(WriteReviewForm)