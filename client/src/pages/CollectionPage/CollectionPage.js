import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import CollectionItem from '../../components/CollectionItem/CollectionItem'
import ImageWithOverlay from '../../components/ImageWithOverlay/ImageWithOverlay'

import {
    selectCollection,
    selectProductsByCollection,
} from '../../redux/shop/shopSelector'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './CollectionPage.scss'
import PlainSpinner from '../../components/PlainSpinner/PlainSpinner'

const CollectionPage = ({ collection, match, products, allReviews }) => {
    if (!products || !collection || !allReviews) {
        return <PlainSpinner />
    }
    const { title } = collection

    const productsInCollection = (collection) => {
        return products.filter((product) => product.collection === collection)
    }

    const averageRating = (productId) => {
        const productReviews = allReviews.filter(
            (review) => review.productId === productId
        )
        let subTotal = 0
        productReviews.map((review) => {
            subTotal += review.reviewRating
        })
        return subTotal / productReviews.length
    }

    return (
        <Col className=" col-md-10 offset-md-1 collection-page justify-content-center align-items-center">
            <Helmet>
                <meta name="title" content={`${title} - King Clothing`} />
                <meta
                    name="description"
                    content={`Shop The Latest In ${title} From King Clothing`}
                />
            </Helmet>
            <Row>
                <h1>{title}</h1>
            </Row>

            <Row className="items justify-content-center align-items-center">
                {productsInCollection(title).map((item) => (
                    <Col xs="6" md="4" lg="3">
                        <CollectionItem
                            key={item.id}
                            item={item}
                            averageRating={averageRating(item.id)}
                            collectionRoute={title.toLowerCase()}
                        />
                    </Col>
                ))}
            </Row>
        </Col>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state),
    products: state.shop.products,
    allReviews: state.reviews.allReviews,
})

export default connect(mapStateToProps)(CollectionPage)
