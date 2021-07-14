import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Image from 'react-bootstrap/Image'

import { fetchOrdersStart } from '../../redux/orders/orderActions'

import './UserOrderDetails.scss'

const UserOrderDetails = ({ orders, fetchOrdersStart, match }) => {
    useEffect(() => {
        fetchOrdersStart()
    }, [])
    const renderItems = (items) => {
        return items.map((item) => {
            return (
                <ListGroupItem>
                    <Row className="justify-content-center align-items-center">
                        <Col>
                            <Image
                                className="product-thumbnail"
                                src={item.imageUrl}
                                rounded
                            />
                        </Col>
                        <Col className="justify-content-center align-items-center">
                            <span className="priceSpan">
                                {item.quantity} x ${item.price} --- {item.name}
                            </span>
                        </Col>
                    </Row>
                </ListGroupItem>
            )
        })
    }
    const findOrder = () => {
        const order = orders.filter(
            (order) => order.id === match.params.orderId
        )[0]
        return (
            <Card className="text-center">
                <Card.Title>
                    <h1>Order Details</h1>
                </Card.Title>

                <Card.Body>
                    <Card.Text>
                        <b>Order Number:</b> {order.id}
                    </Card.Text>
                    <Card.Text>
                        <b>Order Date:</b>{' '}
                        {order.orderDate.toDate().toDateString()}
                    </Card.Text>
                    <Card.Text>
                        <b>Order Total:</b> ${order.orderTotal}
                    </Card.Text>
                    <Card.Text>
                        <b>Items:</b>
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {renderItems(order.cartItems)}
                </ListGroup>
                <Card.Body>
                    <Row className="justify-space-between">
                        <Col>
                            <Link to="/user/order-history">
                                Back To Order History
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/user/profile">Back To Profile</Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }

    return (
        <Container>
            <Col className="col-md-6 offset-md-3">
                {orders ? findOrder() : null}
            </Col>
        </Container>
    )
}
const mapDispatchToProps = (dispatch) => ({
    fetchOrdersStart: () => dispatch(fetchOrdersStart()),
})
const mapStateToProps = (state) => ({
    orders: state.order.allOrders,
})
export default connect(mapStateToProps, mapDispatchToProps)(UserOrderDetails)
