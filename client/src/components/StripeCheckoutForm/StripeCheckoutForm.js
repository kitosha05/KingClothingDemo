import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useParams } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './StripeCheckoutForm.scss'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from '../CustomButton/CustomButton'
import { updateOrder, updateProduct } from '../../firebase/firebase.utils'
import { clearCart } from '../../redux/cart/cartActions'
import { clearCheckout } from '../../redux/orders/orderActions'

const renderItems = (items) => {
    return items.map((item) => {
        return (
            <Row className="justify-content-center align-items-center mt-2">
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
        )
    })
}

const CheckoutForm = ({
    values,
    nextStep,
    clearCart,
    checkoutId,
    clearCheckout,
    products,
}) => {
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const [shippingCharge, setShippingCharge] = useState(0)
    const stripe = useStripe()
    const elements = useElements()
    const { cartItems } = useSelector((state) => state.cart)
    const params = useParams()

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        const orderDetails = { cartItems, ...values }
        if (cartItems) {
            window
                .fetch('/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails),
                })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    setClientSecret(data.clientSecret)
                })
        }
        if (values.shippingMethod === 'standardShipping') setShippingCharge(10)
    }, [cartItems])

    const cardStyle = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#32325d',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    }

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty)
        setError(event.error ? event.error.message : '')
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        })

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`)
            setProcessing(false)
        } else {
            //on successfull payment...
            setError(null)
            setProcessing(false)
            setSucceeded(true)
            //clear cart, update Order status depending on shipping method,move to next step
            let orderStatus = ''
            let shippingFee = 0
            if (values.shippingMethod === 'pickUp') {
                orderStatus = 'Prepare For Pickup'
            } else {
                orderStatus = 'Prepare For Shipping'
                if (values.shippingMethod === 'standardShipping')
                    shippingFee = 10
            }
            const order = {
                billingName: values.billingName,
                billingEmail: values.billingEmail,
                shippingMethod: values.shippingMethod,
                shippingCity: values.shippingCity,
                shippingState: values.shippingState,
                shippingStreetAddress: values.shippingStreetAddress,
                shippingZipcode: values.shippingZipcode,
                shippingFee,
                status: orderStatus,
                total: getCartTotal(cartItems) + shippingFee,
                cartItems: cartItems,
                orderDate: new Date(),
            }
            const orderId = params.orderId
            const updatedOrder = updateOrder({ order, orderId })
            updateInventory(cartItems)

            sendOrderConfirmation({ orderId, order })
            clearCart()
            clearCheckout()
            nextStep()
        }
    }

    const updateInventory = async (cartItems) => {
        await cartItems.map((cartItem) => {
            const { optionCombo, quantity } = cartItem
            const productId = cartItem.id
            if (optionCombo) {
                const { optionComboId } = optionCombo
                const { inventoryByOptions } = products.find(
                    (product) => product.id === cartItem.id
                )
                const objIndex = inventoryByOptions.findIndex(
                    (obj) => obj.optionComboId === optionComboId
                )
                const inventory = parseInt(
                    inventoryByOptions[objIndex].inventory
                )
                inventoryByOptions[objIndex].inventory = inventory - quantity
                const product = { inventoryByOptions }
                console.log(product)
                updateProduct({ product, productId })
            } else {
                const objIndex = products.findIndex(
                    (obj) => obj.id === cartItem.id
                )
                products[objIndex].inventory -= quantity
                const product = products[objIndex]
                updateProduct({ product, productId })
            }
        })
    }

    const sendOrderConfirmation = ({ orderId, order }) => {
        const confirmedOrder = { id: orderId, ...order }
        window.fetch('/email/order-confirmation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(confirmedOrder),
        })
    }
    const getCartTotal = (cartItems) => {
        let subTotal = 0
        cartItems.map((item) => {
            subTotal += item.quantity * item.price
        })
        return subTotal
    }

    return (
        <Col className="col-md-6 offset-md-3 text-center">
            <Card>
                <h1>Review Your Order</h1>
                <Row className="mt-2">
                    <Col>
                        <Card.Title as="h2">Items In Order</Card.Title>
                        {cartItems ? renderItems(cartItems) : ''}
                    </Col>
                    <Col>
                        <Card.Title as="h2">Shipping Details</Card.Title>
                        <Card.Body>
                            <Card.Text>
                                <b>Shipping Method:</b> {values.shippingMethod}
                            </Card.Text>
                            {values.shippingMethod === 'pickUp' ? (
                                <Card.Body>
                                    <Card.Text>Pick Up Instructions:</Card.Text>
                                    <Card.Text> Instructions...</Card.Text>
                                </Card.Body>
                            ) : (
                                <Card.Body>
                                    <Card.Text>
                                        <b>Ship To:</b> {values.recipientName}
                                    </Card.Text>
                                    <Card.Text>
                                        {values.shippingStreetAddress}
                                    </Card.Text>
                                    <Card.Text>
                                        {values.shippingCity},{' '}
                                        {values.shippingState}{' '}
                                        {values.shippingZipcode}
                                    </Card.Text>
                                </Card.Body>
                            )}
                            <Card.Body>
                                <Card.Text>
                                    <b>Subtotal: </b>${getCartTotal(cartItems)}
                                </Card.Text>
                                <Card.Text>
                                    <b>Shipping: </b>
                                    {shippingCharge}
                                </Card.Text>
                                <Card.Text>
                                    <b>Order Total: </b>$
                                    {getCartTotal(cartItems) + shippingCharge}
                                </Card.Text>
                            </Card.Body>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <Card>
                <Card.Title>
                    <b>Payment Details</b>
                </Card.Title>
                <form id="payment-form" onSubmit={handleSubmit}>
                    <CardElement
                        id="card-element"
                        options={cardStyle}
                        onChange={handleChange}
                    />
                    <Button
                        className="custom-checkout-button"
                        disabled={processing || disabled || succeeded}
                        id="submit"
                    >
                        <span id="button-text">
                            {processing ? (
                                <div className="spinner" id="spinner"></div>
                            ) : (
                                'Pay now'
                            )}
                        </span>
                    </Button>
                    {/* Show any error that happens when processing the payment */}
                    {error && (
                        <div className="card-error" role="alert">
                            {error}
                        </div>
                    )}
                    {/* Show a success message upon completion */}
                    <p
                        className={
                            succeeded
                                ? 'result-message'
                                : 'result-message hidden'
                        }
                    >
                        Payment succeeded, see the result in your
                        <a href={`https://dashboard.stripe.com/test/payments`}>
                            {' '}
                            Stripe dashboard.
                        </a>{' '}
                        Refresh the page to pay again.
                    </p>
                </form>
            </Card>
        </Col>
    )
}
const mapDispatchToProps = (dispatch) => ({
    clearCart: () => dispatch(clearCart()),
    clearCheckout: () => dispatch(clearCheckout()),
})
const mapStateToProps = (state) => ({
    checkoutId: state.order.checkoutId,
    products: state.shop.products,
})
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
