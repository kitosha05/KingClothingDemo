import './CollectionItem.scss'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { addItem } from '../../redux/cart/cartActions'
import Button from '../CustomButton/CustomButton'
import ReactStars from 'react-rating-stars-component'
import { fetchReviewsStart } from '../../redux/reviews/reviewSagas'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import {
    setFavItemStart,
    removeFavItemStart,
    checkUserSession,
} from '../../redux/user/userActions'

import Zoom from 'react-reveal/Zoom'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

const configStars = {
    size: 25,
    edit: false,
}

const CollectionItem = ({
    item,
    addItem,
    collectionRoute,
    averageRating,
    currentUser,
    setFavItemStart,
    removeFavItemStart,
}) => {
    const history = useHistory()
    const [showModal, setShowModal] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [optionsState, setOptionsState] = useState(() => {
        if (item) {
            if (item.options) {
                let optionsObject = {}
                item.options.map((option) => {
                    const { optionName } = option
                    const keyString = 'selected' + optionName
                    optionsObject = { ...optionsObject, [keyString]: null }
                })
                return optionsObject
            }
        }
        return null
    })

    const [isFavorite, setIsFavorite] = useState(() => {
        if (currentUser) {
            if (currentUser.favItems) {
                if (currentUser.favItems.length > 0)
                    return currentUser.favItems.includes(item.id)
            }
        }
        return false
    })

    const { id, name, price, imageUrl, options, inventoryByOptions } = item
    const productUrl = name.toLowerCase().replace(/\b \b/g, '-')

    useEffect(() => {
        if (currentUser) {
            if (isFavorite) setFavItemStart(currentUser.id, id)
            if (!isFavorite) removeFavItemStart(currentUser.id, id)
        }
    }, [isFavorite])

    const onClick = async (e) => {
        setIsFavorite(!isFavorite)
    }

    const addToCart = () => {
        if (item.inventoryByOptions) {
            if (!optionsState) {
                setShowErrorMessage(true)
                return
            }
            let optionCombo = null

            const values = Object.entries(optionsState).map(
                ([key, value]) => `${value}`
            )
            console.log(values)
            if (values.includes(`null`)) {
                setShowErrorMessage(true)
                return
            }
            setShowErrorMessage(false)
            if (values.length === 1) {
                optionCombo = item.inventoryByOptions.find((optionCombo) =>
                    optionCombo.optionValues.includes(values[0] + ' ')
                )
            }
            if (values.length === 2) {
                optionCombo = item.inventoryByOptions.find(
                    (optionCombo) =>
                        optionCombo.optionValues.includes(values[0] + ' ') &&
                        optionCombo.optionValues.includes(values[1] + ' ')
                )
            }
            addItem({ product: item, optionCombo })
            setOptionsState({})
            setShowModal('')
            return
        }

        addItem({ product: item, optionCombo: null })
        setOptionsState({})
        setShowModal('')
    }

    return (
        <Zoom bottom>
            <div className="collection-item">
                <div
                    className="image"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />

                <div className="collection-footer">
                    <Link to={`/shop/${collectionRoute}/${productUrl}`}>
                        <span className="name">{name}</span>
                    </Link>

                    <span className="price">${price}</span>
                </div>
                <div className="stars">
                    <ReactStars {...configStars} value={averageRating} />
                </div>
                <Row className="view-product mb-2 mt-2 justify-content-center align-items-center">
                    <Button
                        className="view-product-button custom-button inverted"
                        onClick={() =>
                            history.push(
                                `/shop/${collectionRoute}/${productUrl}`
                            )
                        }
                    >
                        View Item
                    </Button>
                </Row>
                {currentUser ? (
                    <span
                        className="fave-item-span"
                        onClick={(e) => onClick(e)}
                    >
                        {isFavorite ? (
                            <FavoriteIcon className="fav-icon-filled" />
                        ) : (
                            <FavoriteBorderIcon className="fav-icon-open" />
                        )}
                    </span>
                ) : (
                    ''
                )}

                <Button
                    className="custom-button add-to-cart inverted"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (inventoryByOptions) {
                            setShowModal(id)
                            return
                        }
                        addItem({ product: item, optionCombo: null })
                    }}
                    inverted
                >
                    Add To Cart
                </Button>
                {options && inventoryByOptions ? (
                    <Modal
                        dialogClassName="options-modal"
                        show={showModal === id}
                        onHide={() => {
                            setShowErrorMessage(false)
                            setShowModal('')
                        }}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Select Product Options</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row className="modal-image-row">
                                <Image
                                    className="collection-item-modal-image"
                                    src={imageUrl}
                                />
                            </Row>

                            {item.options.map((option) => {
                                const { optionName } = option
                                const keyString = 'selected' + optionName

                                return (
                                    <Row className="product-options-row">
                                        <span>{optionName}: </span>
                                        <Form>
                                            {option.optionValues.map(
                                                (value) => {
                                                    return (
                                                        <Form.Check
                                                            inline
                                                            label={value}
                                                            name={value}
                                                            onChange={(e) => {
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
                                                            id={value}
                                                        />
                                                    )
                                                }
                                            )}
                                        </Form>
                                    </Row>
                                )
                            })}
                            {showErrorMessage ? (
                                <span>Please Select Product Options</span>
                            ) : null}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setShowModal('')
                                    setShowErrorMessage(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    addToCart()
                                }}
                            >
                                Add To Cart
                            </Button>
                        </Modal.Footer>
                    </Modal>
                ) : null}
            </div>
        </Zoom>
    )
}
const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => dispatch(addItem(item)),
    fetchReviewsStart: (productName) =>
        dispatch(fetchReviewsStart(productName)),
    setFavItemStart: (userId, productId) =>
        dispatch(setFavItemStart(userId, productId)),
    removeFavItemStart: (userId, productId) =>
        dispatch(removeFavItemStart(userId, productId)),
    checkUserSession: () => dispatch(checkUserSession()),
})
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    favItems: state.user.favItems,
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem)
