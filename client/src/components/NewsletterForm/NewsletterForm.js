import React, {useState} from 'react'
import {connect} from 'react-redux'
import { subscribeNewsletterStart } from '../../redux/user/userActions'
import Form from 'react-bootstrap/Form'
import Button from '../CustomButton/CustomButton'
import Modal from 'react-bootstrap/Modal'
import PlainSpinner from '../PlainSpinner/PlainSpinner'

const NewsletterForm =({currentUser, subscribeNewsletterStart, error})=>{
    const [show, setShow] = useState(false)
    const [newsletterName, setNewsletterName] = useState('')
    const [newsletterEmail, setNewsletterEmail]= useState('')
    const [newsletterOptin, setNewsletterOptin]= useState(false)
    const [showSpinner, setShowSpinner]=useState(false)
    
    const onSubmit=(e)=>{
        e.preventDefault()
        let userId = null
        if(currentUser)userId= currentUser.id
        const subscriber = {userId, name:newsletterName, email:newsletterEmail, optin:newsletterOptin}
        setShowSpinner(true)
        subscribeNewsletterStart(subscriber)
        setTimeout(()=>{
            setShow(true)
            setNewsletterName('')
        setNewsletterEmail('')
        setNewsletterOptin(false)
        setShowSpinner(false)
        }, 3000)
        
      
      
    }
    if(showSpinner)return <PlainSpinner/>
    return(
        <React.Fragment>
        <h3>Become A Subscriber!</h3>
            <Form onSubmit={(e)=>onSubmit(e)}>
                <Form.Group controlId="footerNewsletterName">
                     
                        <Form.Control required size='small' name="newsletterName" type="text" onChange={(e)=>{
                            setNewsletterName(e.target.value)

                        }}
                        value={newsletterName} placeholder="Name" />
                   </Form.Group>

                    <Form.Group controlId="footerNewsletterEmail">
                   
                         <Form.Control required size='small' name='newsLetterEmail' type="email" onChange={(e)=>{
                            setNewsletterEmail(e.target.value)

                        }} value={newsletterEmail} placeholder="Enter email" />
                         <Form.Text className="text-muted">
                             We'll never share your email with anyone else.
                         </Form.Text>
                     </Form.Group>
                   
                 <Form.Group controlId="footerNewsletterOptin">
                     <Form.Check type="checkbox" name="newsletterOptin" onChange={(e)=>{
                            setNewsletterOptin(!newsletterOptin)

                        }} checked={newsletterOptin}label="Sign Me Up For The King Clothing Newsletter!" required/>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                     Submit
                  </Button>
                </Form>
                <Modal
                    show={show}
                    onHide={()=>setShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                 {error ? 'Error- Email Already Subscribed' : 'Success!'}
                             </Modal.Title>
                    </Modal.Header>
                     <Modal.Body>
                         {error ? error: 'Thanks for subcribing!'}
                        
                    </Modal.Body>
                     <Modal.Footer>
                     <Button onClick={()=>setShow(false)}>Close</Button>
                     </Modal.Footer>
                 </Modal>
         </React.Fragment>
    )
}
const mapDispatchToProps=dispatch=>({
    subscribeNewsletterStart:(subscriber)=>dispatch(subscribeNewsletterStart(subscriber))
})
const mapStateToProps = state=>({
    currentUser: state.user.currentUser,
    error:state.user.error
})
export default connect(mapStateToProps, mapDispatchToProps)(NewsletterForm)