import React from 'react'
import './WriteReviewForm.scss'
import Form from 'react-bootstrap/Form'
import CustomButton from '../../components/CustomButton/CustomButton'
const WriteReviewForm = () => {
    return(
        
            <Form>
                <Form.Group controlId="reviewBody">
                     <Form.Label>Write A Review</Form.Label>
                     <Form.Control as="textarea" rows={4} />
                </Form.Group>
                 <CustomButton variant="primary" type="submit">
                    Submit
                </CustomButton>
            </Form>
        
    )
}
export default WriteReviewForm