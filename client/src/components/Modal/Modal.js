import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './Modal.scss'

const CustomModal =({show, handleClose, handleConfirm, orderId, status, cartItems})=>{
    const [trackingNumber, setTrackingNumber]=useState('')
    const [actualShippingCost, setActualShippingCost]=useState(0)
const getTitle=()=>{
    switch(status){
        case "Prepare For Pickup":
            return "Confirm Order Is Ready For Pickup"
        case "Prepare For Shipping":
            return "Confirm Order Is Ready For Shipping"
        case 'Pending Pickup':
            return 'Confirm Order Has Been Picked Up'
        default:
            return ''
    }
}

const getConfirmButton=()=>{
    switch(status){
        case "Prepare For Pickup":
            return (
                <Button variant="primary" onClick={()=>handleConfirm(orderId)}>
                Confirm
              </Button>
            )
        case "Prepare For Shipping":
            return (
                <Button variant="primary" onClick={()=>handleConfirm(orderId, trackingNumber, actualShippingCost)}>
                Confirm
              </Button>
            )
        case 'Pending Pickup':
            return(
                <Button variant="primary" onClick={()=>handleConfirm(orderId)}>
                Confirm
              </Button>
            )
        default:
            return ''
    }
}

const onChange=(e)=>{
    const value = e.target.value
    setTrackingNumber(value)
}
const onChangeCost=(e)=>{
    const value = e.target.value
    setActualShippingCost(value)
}
    const getBody=()=>{
        switch(status){
            case "Prepare For Pickup":
                return (
                      <span>
                      An Email Will Be Sent To Customer Notifying Them That Their  Order Is Ready For Pickup
                      </span>
                )
            case "Prepare For Shipping":
                return (
                    <Form>
                        <Form.Group controlId="trackingNumber">
                            <Form.Label>Tracking Number</Form.Label>
                                <Form.Control required type="text" name='trackingNumber'value={trackingNumber} onChange={e=>onChange(e)} placeholder="Tracking Number" />
                            <Form.Text className="text-muted">
                            An Email With The Tracking Number Will Be Sent To The Customer
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="actualShippingCost">
                            <Form.Label>Actual Shipping Cost</Form.Label>
                                <Form.Control required type="text" name='actualShippingCost'value={actualShippingCost} onChange={e=>onChangeCost(e)} placeholder="Shipping Cost" />
                        </Form.Group>
                    </Form>
                )
            case 'Pending Pickup':
                return <span>This Will Complete This Order!</span>
            default:
                return ''
        }

}
    
    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{getTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
          <div>
          <h3>Items In Order:</h3>
          <ul>
          {cartItems.map(item=>{
              return <li key={item.name}>{item.name} x {item.quantity}</li>
          })}
          </ul>
        
        {getBody()}
      </div>}
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {getConfirmButton()}
        </Modal.Footer>
      </Modal>
    )
}
export default CustomModal