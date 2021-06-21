import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import FileUpload from '../../components/FileUpload/FileUpload'
import { fetchOrdersStart } from '../../redux/orders/orderActions'
import Avatar from '@material-ui/core/Avatar'
import Button from 'react-bootstrap/Button'


const UserOrderHistory = ({fetchOrdersStart, orders, currentUser}) =>{
  useEffect(()=>{
      fetchOrdersStart()
  },[]) 
  
  const filterOrdersByUser = ()=>{
     const userOrders= orders.filter(order=>order.userId===currentUser.id)
     return userOrders.map(order=>{
        return (
        <ListGroupItem>
            <Row>
                <Col className='col-6'>
                    <div className='order-date'>
                    {order.orderDate.toDate().toDateString()}
                    </div>
                    
                </Col>
                <Col className='col-6'>
                    Order Amount: ${order.orderTotal}
                </Col>
            </Row>
            <Row className='justify-content-center align-items-center'>
                    <span>
                        <Link to={`/user/orders/${order.id}`}>View Order Details</Link>
                    </span>
            </Row>
           
        </ListGroupItem>)
    })
  }

    return(
       <Container>
           <Col className='col-md-8 offset-md-2 justify-content-center align-items-center'>
             <Card className="text-center" style={{ width: '18rem' }}>           
                 <Card.Title>Your Order History</Card.Title>
               
        
                 <ListGroup className="list-group-flush">
                     {orders ? filterOrdersByUser() : null}
                </ListGroup>
               <Card.Body>
                 <Link to="/user/profile">Back To Profile</Link>
                 
                </Card.Body>
            </Card>
           </Col>
       </Container>
    )
}
const mapDispatchToProps=dispatch=>({
    fetchOrdersStart: ()=>dispatch(fetchOrdersStart())
})
const mapStateToProps=state=>({
    orders: state.order.allOrders,
    currentUser: state.user.currentUser
})
export default connect(mapStateToProps, mapDispatchToProps)(UserOrderHistory)