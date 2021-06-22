import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

import { fetchOrdersStart } from '../../redux/orders/orderActions'


const UserOrderDetails =({orders, fetchOrdersStart, match})=>{
    useEffect(()=>{
        fetchOrdersStart()
    },[])
    const renderItems = (items) =>{
        return items.map(item=>{
            return(
                <ListGroupItem>
                    <Row>        
                            <span className='priceSpan'>
                                {item.quantity} x ${item.price} --- {item.name}
                            </span>
                    </Row>
                </ListGroupItem>
            )
        })
    }
    const findOrder =()=>{
       const order= orders.filter(order=>order.id=== match.params.orderId)[0]
      return (
          <Card className='text-center'>
              <Card.Title>Order Details</Card.Title>
         
          <Card.Body>
              <Card.Text>Order Number: {order.id}</Card.Text>
              <Card.Text>Order Date: {order.orderDate.toDate().toDateString()}</Card.Text>
              <Card.Text>Order Total: ${order.orderTotal}</Card.Text>
              <Card.Text>Items:</Card.Text>
          </Card.Body>
          <ListGroup className='list-group-flush'>
              {renderItems(order.cartItems)}
          </ListGroup>
          </Card>
      )
    }



    return(
       <Container>
           <Col className='col-md-6 offset-md-3'>
           {orders ? findOrder() : null}
           </Col>
           
       </Container>
        )
}
const mapDispatchToProps = dispatch =>({
    fetchOrdersStart: ()=>dispatch(fetchOrdersStart())
})
const mapStateToProps=(state)=>({
    orders: state.order.allOrders
    
})
export default connect(mapStateToProps, mapDispatchToProps)(UserOrderDetails)