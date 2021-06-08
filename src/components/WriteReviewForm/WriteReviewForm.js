import React from 'react'
import './WriteReviewForm.scss'
import Form from 'react-bootstrap/Form'
import CustomButton from '../../components/CustomButton/CustomButton'
import StarRating from '../../components/StarRating/StarRating'
import ReactStars from "react-rating-stars-component"

const WriteReviewForm = () => {

    const configStars = {
        size: 50,
        value: 5,
        edit: true
      };

    
    return(
        
            <Form>
                <Form.Group controlId="reviewRating">
                     <Form.Label>Rate This Product</Form.Label>
                     <ReactStars {...configStars}/>
                </Form.Group>
                <Form.Group controlId="reviewBody">
                     <Form.Control as="textarea" rows={4} />
                     <CustomButton variant="primary" type="submit">
                    Submit
                </CustomButton>
                </Form.Group>
              
            </Form>
        
    )
}
export default WriteReviewForm