import React from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetchCollectionsStart } from '../../redux/shop/shopActions'
import Button from '../CustomButton/CustomButton.js'
import { selectCollections } from '../../redux/shop/shopSelector'
import { addProductStart } from '../../redux/admin/adminActions'
class AddProductForm extends React.Component {
    state = {
        name: '',
        price: '',
        imageUrl: '',
        id: '',
        collection: '',
        description: '',
    }
    componentDidMount() {
        this.props.fetchCollectionsStart()
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const { name, price, imageUrl, collection, description } = this.state

        const product = {
            name,
            price,
            imageUrl,
            collection,
            description,
        }
        this.props.addProductStart(product)
    }
    onChange = (e) => {
        const { value, name } = e.target
        this.setState({ [name]: value })
    }

    renderCollectionTitles(collections) {
        let collectionTitles = []
        for (const [key, value] of Object.entries(collections)) {
            const formattedTitle = key.charAt(0).toUpperCase() + key.slice(1)
            collectionTitles.push(formattedTitle)
        }

        return collectionTitles.map((title) => {
            return <option value={title}>{title}</option>
        })
    }

    render() {
        const { collections } = this.props

        return (
            <div className="product-admin">
                <h2 className="title">Add A New Product</h2>

                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            onChange={this.onChange}
                            value={this.state.name}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="collection">
                        <Form.Label>Select A Collection</Form.Label>
                        <Form.Control
                            as="select"
                            name="collection"
                            onChange={this.onChange}
                            value={this.state.collection}
                            required
                        >
                            {collections
                                ? this.renderCollectionTitles(collections)
                                : null}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="description"
                            onChange={this.onChange}
                            value={this.state.description}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            name="price"
                            onChange={this.onChange}
                            value={this.state.price}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="imageUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="imageUrl"
                            onChange={this.onChange}
                            value={this.state.imageUrl}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit">Save New Product</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = createStructuredSelector({
    collections: selectCollections,
})

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
    addProductStart: (product) => dispatch(addProductStart(product)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm)
