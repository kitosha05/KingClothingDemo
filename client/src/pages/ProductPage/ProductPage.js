import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { selectProduct } from '../../redux/shop/shopSelector'
import CustomButton from '../../components/CustomButton/CustomButton'
import { addItem } from '../../redux/cart/cartActions'
import { Helmet } from 'react-helmet'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import ProductAccordion from '../../components/ProductAccordion/ProductAccordion'
import ImageGallery from '../../components/ImageGallery/ImageGallery'
import PlainSpinner from '../../components/PlainSpinner/PlainSpinner'
import './ProductPage.scss'
import WriteReviewForm from '../../components/WriteReviewForm/WriteReviewForm'
import Form from 'react-bootstrap/Form'

const ProductPage = ({ product, currentUser, allReviews, addItem }) => {
    const [quantity, setQuantity] = useState(1)
    const [productReviews, setProductReviews] = useState([])
    const [showError, setShowError] = useState(false)
    const [optionsState, setOptionsState] = useState(() => {
        if (product) {
            if (product.options) {
                let optionsObject = {}
                product.options.map((option) => {
                    const { optionName } = option
                    const keyString = 'selected' + optionName
                    optionsObject = { ...optionsObject, [keyString]: null }
                })
                return optionsObject
            }
        }
        return null
    })
    const dropDownLabel = `Quantity: ${quantity}`
    const handleSelect = (e) => {
        setQuantity(e)
    }

    useEffect(() => {
        if (product) filterReviews()
        console.log(optionsState)
    }, [allReviews, product])

    const filterReviews = () => {
        const productReviews = !allReviews
            ? []
            : allReviews.filter((review) => review.productId === product.id)
        setProductReviews(productReviews)
    }

    const addToCart = () => {
        //check quantity vs inventory

        //handle products with options by finding and adding option combo to cart item
        let optionCombo = null
        if (product.options) {
            let keys = []
            if (!optionsState) {
                setShowError(true)
                return
            }

            const values = Object.entries(optionsState).map(([key, value]) => {
                keys.push(key)
                return `${value}`
            })

            if (values.includes(`null`)) {
                setShowError(true)
                return
            }

            if (values.length === 1) {
                optionCombo = product.inventoryByOptions.find((optionCombo) =>
                    optionCombo.optionValues.includes(values[0])
                )
            }
            if (values.length === 2) {
                optionCombo = product.inventoryByOptions.find(
                    (optionCombo) =>
                        optionCombo.optionValues.includes(values[0] + ' ') &&
                        optionCombo.optionValues.includes(values[1] + ' ')
                )
            }
            if (quantity > optionCombo.inventory) {
                setShowError(true)
                return
            }

            for (let i = 1; i <= quantity; i++) {
                addItem({ product, optionCombo })
                console.log('item added!')
                console.log(optionsState)
            }
            keys.map((key) =>
                setOptionsState((prevState) => ({ ...prevState, [key]: null }))
            )
            setShowError(false)
        } else {
            //handle products with no options
            for (let i = 1; i <= quantity; i++) {
                addItem({ product, optionCombo })
            }
        }
    }
    if (!product) return <PlainSpinner />
    return (
        <Container className="mt-3 col-md-8 offset-md-2 justify-content-center align-content-center">
            <Helmet>
                <meta
                    name="title"
                    content={`${product.name} - King Clothing`}
                />
                <meta name="description" content={product.description} />
            </Helmet>

            <Card className="text-center product-card">
                <Row className="justify-content-center">
                    <Col xs="8" lg="6" className="col-xs-8 offset-xs-2 mb-1">
                        <Container>
                            <ImageGallery imageUrl={product.imageUrl} />
                            {/* <Card.Img   src={product.imageUrl} />  */}
                        </Container>
                    </Col>

                    <Col md="6">
                        <Card.Body className="product-details">
                            <Row className="mt-3 mb-3 justify-content-center align-items-center">
                                <Card.Title
                                    className="product-page-title"
                                    as="h1"
                                >
                                    {product.name}
                                </Card.Title>
                            </Row>
                            <Row>
                                <h3 className="item-price">
                                    Price: ${product.price}
                                </h3>
                            </Row>
                            <Row className="mb-5">
                                <Col className="justify-content-center">
                                    <Row className="mt-2 mb-3">
                                        <Col>
                                            <div className="adjust-quantity">
                                                <Dropdown
                                                    onSelect={handleSelect}
                                                >
                                                    <Dropdown.Toggle
                                                        variant="light"
                                                        id="dropdown-basic"
                                                    >
                                                        {dropDownLabel}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            eventKey="1"
                                                            active
                                                        >
                                                            1
                                                        </Dropdown.Item>
                                                        <Dropdown.Item eventKey="2">
                                                            2
                                                        </Dropdown.Item>
                                                        <Dropdown.Item eventKey="3">
                                                            3
                                                        </Dropdown.Item>
                                                        <Dropdown.Item eventKey="4">
                                                            4
                                                        </Dropdown.Item>
                                                        <Dropdown.Item eventKey="5">
                                                            5
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Col>
                                        <Col>
                                            <CustomButton
                                                onClick={() => addToCart()}
                                            >
                                                Add To Cart
                                            </CustomButton>
                                            {showError ? (
                                                <span className="missing-options-error-msg">
                                                    Please Select Options
                                                </span>
                                            ) : null}
                                        </Col>
                                    </Row>

                                    {product.options ? (
                                        <h4>Select Options</h4>
                                    ) : null}
                                    {product.options
                                        ? product.options.map((option) => {
                                              const { optionName } = option
                                              const keyString =
                                                  'selected' + optionName

                                              return (
                                                  <Row className="product-options-row justify-content-center">
                                                      <Col xs="2">
                                                          {optionName}:
                                                      </Col>
                                                      <Col
                                                          xs="8"
                                                          className="product-option-radio-buttons"
                                                      >
                                                          <Row className="text-left">
                                                              <Form>
                                                                  {option.optionValues.map(
                                                                      (
                                                                          value
                                                                      ) => {
                                                                          return (
                                                                              <Form.Check
                                                                                  inline
                                                                                  label={
                                                                                      value
                                                                                  }
                                                                                  name={
                                                                                      value
                                                                                  }
                                                                                  onChange={(
                                                                                      e
                                                                                  ) => {
                                                                                      setOptionsState(
                                                                                          (
                                                                                              prevState
                                                                                          ) => ({
                                                                                              ...prevState,
                                                                                              [keyString]:
                                                                                                  value,
                                                                                          })
                                                                                      )
                                                                                  }}
                                                                                  checked={
                                                                                      optionsState
                                                                                          ? optionsState[
                                                                                                keyString
                                                                                            ] ===
                                                                                            value
                                                                                          : false
                                                                                  }
                                                                                  type="radio"
                                                                                  id={
                                                                                      value
                                                                                  }
                                                                              />
                                                                          )
                                                                      }
                                                                  )}
                                                              </Form>
                                                          </Row>
                                                      </Col>
                                                  </Row>
                                              )
                                          })
                                        : null}
                                </Col>
                            </Row>
                            <Row className="justify-content-center align-items-center">
                                <ProductAccordion
                                    product={product}
                                    reviews={productReviews}
                                />
                            </Row>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            {currentUser ? (
                <WriteReviewForm
                    productId={product.id}
                    currentUser={currentUser}
                />
            ) : (
                <h3>Sign In To Write A Review</h3>
            )}
        </Container>
    )
}
const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => dispatch(addItem(item)),
})
const mapStateToProps = (state, ownProps) => ({
    product: selectProduct(ownProps.match.params.productId)(state),
    currentUser: state.user.currentUser,
    allReviews: state.reviews.allReviews,
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
