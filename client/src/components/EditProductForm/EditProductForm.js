import React from 'react'
import { updateProduct } from '../../firebase/firebase.utils.js'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import {
    fetchCollectionsStart,
    fetchProductsStart,
} from '../../redux/shop/shopActions'
import { editProductStart } from '../../redux/admin/adminActions'
import Button from '../CustomButton/CustomButton.js'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PlainSpinner from '../PlainSpinner/PlainSpinner.js'
class EditProductForm extends React.Component {
    state = {
        options: [],
        editOptionsMode: false,
        newOptionName: '',
        newOptionValues: '',
        name: '',
        price: '',
        imageUrl: '',
        id: '',
        collection: '',
        description: '',
        selectedProduct: '',
        selectedCollection: '',
    }
    componentDidMount() {
        this.props.fetchCollectionsStart()
    }
    getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min)
    }
    onSubmit = async (e) => {
        e.preventDefault()
        const { name, price, imageUrl, collection, description, id } =
            this.state
        //if more than one option exists get option combination input names and grab inventory values from state
        let inventoryByOptions = []
        if (this.state.options.length > 1) {
            this.getOptionCombinations().map((optionString) => {
                let inputName = optionString
                    .join('')
                    .replace(/\s/g, '')
                    .toLowerCase()
                const quant = this.state[inputName]
                const optionComboId = this.getRandomInt(1000000, 9000000)
                inventoryByOptions.push({
                    optionValues: optionString,
                    inventory: quant,
                    optionComboId,
                })
            })
        }
        if (this.state.options.length === 1) {
            const { optionValues } = this.state.options[0]
            optionValues.map((value) => {
                const quant = this.state[value]
                const optionComboId = this.getRandomInt(1000000, 9000000)
                inventoryByOptions.push({
                    optionValues: value,
                    inventory: quant,
                    optionComboId,
                })
            })
        }

        const product = {
            name,
            price,
            imageUrl,
            collection,
            description,
            id,
            inventoryByOptions,
        }
        this.props.editProductStart(product)
    }
    saveProductOption = async (e) => {
        e.preventDefault()
        const { newOptionName, newOptionValues } = this.state
        const values = newOptionValues.split(',')
        const newOption = { optionName: newOptionName, optionValues: values }
        const product = { options: [newOption, ...this.state.options] }
        const productId = this.state.selectedProduct
        await updateProduct({ product, productId })
        await this.props.fetchProductsStart()
        this.setState({ editOptionsMode: false })
    }
    onChange = async (e) => {
        const { value, name } = e.target
        await this.setState({ [name]: value })
    }
    onSelectCollection = async (e) => {
        const { value } = e.target
        await this.setState({ selectedCollection: value })
    }

    onSelectProduct = async (e) => {
        const { value } = e.target
        await this.setState({ selectedProduct: value })
        const { selectedProduct, selectedCollection } = this.state
        const product = this.props.products.find(
            ({ id }) => id === selectedProduct
        )
        const {
            price,
            imageUrl,
            description,
            id,
            name,
            options,
            inventoryByOptions,
        } = product
        if (options) {
            this.setState({ options })
        } else {
            this.setState({ options: [] })
        }
        if (inventoryByOptions) {
            this.setState({ inventoryByOptions })
        }
        await this.setState({
            price,
            id,
            imageUrl,
            name,
            description,
            collection: selectedCollection,
        })
    }
    renderCollectionTitles(collections) {
        let collectionTitles = []
        for (const [key, value] of Object.entries(collections)) {
            collectionTitles.push(key.charAt(0).toUpperCase() + key.slice(1))
        }

        return collectionTitles.map((title) => {
            return <option value={title}>{title}</option>
        })
    }

    renderProductsInCollection(products, selectedCollection) {
        return products.map((product) => {
            if (product.collection === selectedCollection)
                return <option value={product.id}>{product.name}</option>
        })
    }

    getOptionCombinations() {
        let optionCombinations = []

        this.state.options[0].optionValues.map((optionOneVal) => {
            const { optionName } = this.state.options[0]
            const secondOptionName = this.state.options[1].optionName
            this.state.options[1].optionValues.map((secondVal) => {
                const optionCombo = {
                    [optionName]: optionOneVal,
                    [secondOptionName]: secondVal,
                }
                const optionString = Object.entries(optionCombo).map(
                    ([key, value]) => `${value} `
                )
                optionCombinations.push(optionString)
            })
        })

        return optionCombinations
    }

    render() {
        const { selectedProduct, selectedCollection } = this.state
        const { collections, products } = this.props

        if (!collections || !products) return <PlainSpinner />

        return (
            <div className="product-admin">
                <Card className="mb-5">
                    <Card.Title>
                        <h4>Select a Product To Edit</h4>
                    </Card.Title>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="selectCollection">
                                <Form.Label>
                                    First, Narrow Products by Collection
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    name="selectCollection"
                                    onChange={this.onSelectCollection}
                                    value={selectedCollection}
                                    required
                                >
                                    {collections
                                        ? this.renderCollectionTitles(
                                              collections
                                          )
                                        : null}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="selectProduct">
                                <Form.Label>Then, Select A Product</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="selectProduct"
                                    onChange={this.onSelectProduct}
                                    value={selectedProduct}
                                    required
                                >
                                    {selectedCollection
                                        ? this.renderProductsInCollection(
                                              products,
                                              selectedCollection
                                          )
                                        : null}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Title>
                        <h4>Edit Selected Product</h4>
                    </Card.Title>
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
                        <h3>Product Options</h3>

                        {this.state.editOptionsMode ? (
                            <div>
                                <h4>Add Product Option</h4>
                                <Form.Group>
                                    <Form.Label>
                                        Option Name (ex: Size OR Color)
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="newOptionName"
                                        onChange={this.onChange}
                                        value={this.state.newOptionName}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Option Values Separated By Commas(ex:
                                        Small, Medium, Large OR Red, White, Blue
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="newOptionValues"
                                        onChange={this.onChange}
                                        value={this.state.newOptionValues}
                                    />
                                </Form.Group>
                                <Button
                                    onClick={(e) => this.saveProductOption(e)}
                                >
                                    Save Product Option
                                </Button>
                            </div>
                        ) : (
                            <div>
                                {this.state.options.length > 0 ? (
                                    <h5> Inventory By Product Option</h5>
                                ) : null}
                                {this.state.options.length > 0 ? (
                                    //    renderProductOptions()

                                    this.state.options.length > 1 ? (
                                        this.getOptionCombinations().map(
                                            (optionString) => {
                                                let inputName = optionString
                                                    .join('')
                                                    .replace(/\s/g, '')
                                                    .toLowerCase()
                                                return (
                                                    <Row>
                                                        <Col>
                                                            {optionString}
                                                        </Col>
                                                        <Col>
                                                            <Form.Group>
                                                                <Row>
                                                                    <Col>
                                                                        <Form.Label>
                                                                            Adjust
                                                                            Inventory
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name={
                                                                                inputName
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                this.setState(
                                                                                    {
                                                                                        [inputName]:
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                    }
                                                                                )
                                                                                console.log(
                                                                                    this
                                                                                        .state
                                                                                )
                                                                            }}
                                                                            value={
                                                                                this
                                                                                    .state[
                                                                                    inputName
                                                                                ]
                                                                                    ? this
                                                                                          .state[
                                                                                          inputName
                                                                                      ]
                                                                                    : 0
                                                                            }
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                )
                                            }
                                        )
                                    ) : (
                                        this.state.options[0].optionValues.map(
                                            (value) => {
                                                return (
                                                    <Row>
                                                        <Col>{value}</Col>
                                                        <Col>
                                                            <Form.Group>
                                                                <Row>
                                                                    <Col>
                                                                        <Form.Label>
                                                                            Adjust
                                                                            Inventory
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name={
                                                                                value
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                this.setState(
                                                                                    {
                                                                                        [value]:
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                    }
                                                                                )
                                                                                console.log(
                                                                                    this
                                                                                        .state
                                                                                )
                                                                            }}
                                                                            value={
                                                                                this
                                                                                    .state[
                                                                                    value
                                                                                ]
                                                                                    ? this
                                                                                          .state[
                                                                                          value
                                                                                      ]
                                                                                    : 0
                                                                            }
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                )
                                            }
                                        )
                                    )
                                ) : (
                                    <h5>Product Has No Options</h5>
                                )}
                                {this.state.options.length < 2 ? (
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            this.setState({
                                                editOptionsMode: true,
                                            })
                                        }}
                                    >
                                        Add Product Option (eg: size or color)
                                    </Button>
                                ) : null}
                            </div>
                        )}
                        <Row className="mt-5 justify-content-center">
                            <Button>Save Changes</Button>
                        </Row>
                    </Form>
                </Card>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    collections: state.shop.collections,
    products: state.shop.products,
})

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
    editProductStart: (product) => dispatch(editProductStart(product)),
    fetchProductsStart: () => dispatch(fetchProductsStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm)
