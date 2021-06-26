import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const CustomModal =({show, handleClose, handleConfirm, orderId, status, cartItems})=>{
    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{status}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{orderId}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleConfirm(orderId)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default CustomModal