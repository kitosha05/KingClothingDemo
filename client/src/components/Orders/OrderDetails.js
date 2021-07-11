import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Image from 'react-bootstrap/Image'

import { fetchOrdersStart } from '../../redux/orders/orderActions'

import './OrderDetails.scss'


const OrderDetails =({  orders})=>{
        const [order, setOrder]=useState(null)
        const {orderId} = useParams()
   
    useEffect(()=>{
      if(orders)setOrder(findOrder(orderId))
      
    },[orderId, orders])
   
    const renderItems = (items) =>{
        return items.map(item=>{
            return(
                <ListGroupItem>
                    <Row className='justify-content-center align-items-center'>  
                        <Col>
                            <Image className='product-thumbnail' src={item.imageUrl} rounded/>
                        </Col>
                        <Col className='justify-content-center align-items-center'>
                        <span className='priceSpan'>
                       {item.name}   --- {item.quantity} x ${item.price} 
                            </span>
                        </Col>      
                           
                    </Row>
                </ListGroupItem>
            )
        })
    }
    const findOrder =(orderId)=>{
       return orders.filter(order=>order.id=== orderId)[0]
    }
    const calcCOGS =(order)=>{
        let cogs=0
        order.cartItems.map(item=>{
            cogs+= item.quantity *item.cogs
        })
        return cogs
    }
    const createOrderCard = (order)=>{
        const cogs = calcCOGS(order)
        const shippingCost = order.actualShippingCost ? order.actualShippingCost : 0
        return (

            <Card className='text-center'>
                <Card.Title><h1>Order Details</h1></Card.Title>
           
            <Card.Body>
                <Row>
                    <Col>
                    <Card.Text><b>Order Number:</b> {order.id}</Card.Text>
                <Card.Text><b>Order Date:</b> {order.orderDate.toDate().toDateString()}</Card.Text>
                <Card.Text><b>Customer Name:</b> {order.billingName}</Card.Text>
                <Card.Text><b>Shipping Method:</b> {order.shippingMethod}</Card.Text>
                <Card.Text><b>Order Status:</b> {order.status}</Card.Text>
                    </Col>
                    <Col>
                    <Card.Text className='order-total'><b>Order Total:</b>  ${order.total}</Card.Text>
                     <Card.Text className='order-costs'><b> - Shipping Cost:</b> ${shippingCost}</Card.Text>
                     <Card.Text className='order-costs'><b> - Cost of Goods Sold:</b> ${cogs}</Card.Text>
                     <Card.Text className='order-margin'><b>Gross Margin:</b> ${order.total-shippingCost-cogs}</Card.Text>
                    </Col>
                </Row>
            
                
            </Card.Body>
            
            <ListGroup className='list-group-flush'>
            <h3>Items</h3>
                {renderItems(order.cartItems)}
            </ListGroup>
            <Card.Body>
                <Row className='justify-content-center'>
                   
                    <Link to='/admin/orders'>Back To All Orders</Link>
                    
                </Row>
                
                   
              </Card.Body>
            </Card>
        )
    }
      
    
return(
       <Container>
           <Col className='col-md-6 offset-md-3'>
           {orders && order ? createOrderCard(order) : null}
           </Col>
           
       </Container>
        )
}
const mapDispatchToProps = dispatch =>({
    fetchOrdersStart: ()=>dispatch(fetchOrdersStart())
})
const mapStateToProps=(state, ownProps)=>({
    orders: state.order.allOrders
   
    
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)