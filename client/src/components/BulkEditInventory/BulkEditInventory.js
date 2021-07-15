import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Form from 'react-bootstrap/Form'
import { fetchProductsStart } from '../../redux/shop/shopActions'
import { updateProduct } from '../../firebase/firebase.utils'

const BulkEditInventory = ({ products, collections, fetchProductsStart }) => {
    const [selectedCollection, setSelectedCollection] = useState('')

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null,
    })

    const [currentInventory, setCurrentInventory] = useState(null)
    const [currentCOGS, setCurrentCOGS] = useState(null)
    const [inventoryByOptionsState, setInventoryByOptionsState] = useState(null)

    useEffect(() => {
        if (!products) fetchProductsStart()
    }, [products, selectedCollection, inEditMode])

    const onSave = async ({ id, newInventory, newCOGS }) => {
        const productId = id
        const cogs = newCOGS

        //if product has options, update inventory per option
        if (inventoryByOptionsState) {
            const newInventoryByOptions = []
            for (const [key, value] of Object.entries(
                inventoryByOptionsState
            )) {
                const product = products.find((product) => product.id === id)
                const optionCombo = product.inventoryByOptions.find(
                    (optionCombo) =>
                        optionCombo.optionComboId.toString() === key
                )

                optionCombo.inventory = value
                newInventoryByOptions.push(optionCombo)
            }
            const product = { inventoryByOptions: newInventoryByOptions, cogs }
            await updateProduct({ productId, product })
            onCancel()
            return
        }

        const inventory = newInventory

        const product = {
            inventory,
            cogs,
        }
        await updateProduct({ productId, product })
        onCancel()
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null,
        })
        // reset the unit price state value
        setCurrentInventory(null)
        setCurrentCOGS(null)
        setInventoryByOptionsState(null)
    }
    const onEdit = ({ id, currentInventory, currentCOGS }) => {
        console.log('edit clicked')
        setInEditMode({
            status: true,
            rowKey: id,
        })
        const product = products.find((product) => product.id === id)
        const { inventoryByOptions } = product
        if (inventoryByOptions) {
            inventoryByOptions.forEach((optionCombo) => {
                const key = optionCombo.optionComboId
                setInventoryByOptionsState((prevState) => ({
                    ...prevState,
                    [key]: optionCombo.inventory,
                }))
            })
            setCurrentCOGS(currentCOGS)
            return
        }
        setCurrentInventory(currentInventory)
        setCurrentCOGS(currentCOGS)
    }

    const renderCollectionTitles = (collections) => {
        let collectionTitles = []
        for (const [key, value] of Object.entries(collections)) {
            collectionTitles.push(key.charAt(0).toUpperCase() + key.slice(1))
        }

        return collectionTitles.map((title) => {
            return <option value={title}>{title}</option>
        })
    }

    const onSelectCollection = async (e) => {
        const { value } = e.target
        await setSelectedCollection(value)
    }
    const changeInventory = async (event) => {
        await setCurrentInventory(event.target.value)
    }
    const changeCOGS = async (event) => {
        await setCurrentCOGS(event.target.value)
    }

    return (
        <div>
            <h1>Bulk Edit Inventory and COGS By Collection</h1>
            <Form>
                <Form.Group controlId="selectCollection">
                    <Form.Label>Select Collection </Form.Label>
                    <Form.Control
                        as="select"
                        name="selectCollection"
                        onChange={(e) => onSelectCollection(e)}
                        value={selectedCollection}
                        required
                    >
                        {collections
                            ? renderCollectionTitles(collections)
                            : null}
                    </Form.Control>
                </Form.Group>
            </Form>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Current Price</TableCell>
                        <TableCell>Current Inventory</TableCell>
                        <TableCell>Cost of Goods Sold</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!products || !selectedCollection
                        ? ''
                        : products
                              .filter(
                                  (product) =>
                                      product.collection === selectedCollection
                              )
                              .map((product) => {
                                  return (
                                      <TableRow key={product.id}>
                                          <TableCell>{product.name}</TableCell>
                                          <TableCell>
                                              ${product.price}
                                          </TableCell>
                                          <TableCell>
                                              {inEditMode.status &&
                                              inEditMode.rowKey ===
                                                  product.id ? (
                                                  product.inventoryByOptions ? (
                                                      product.inventoryByOptions.map(
                                                          (optionCombo) => {
                                                              const optionString =
                                                                  optionCombo.optionValues.join(
                                                                      ' '
                                                                  )
                                                              const id =
                                                                  optionCombo.optionComboId
                                                              return (
                                                                  <Form.Group>
                                                                      <Form.Label>
                                                                          {
                                                                              optionString
                                                                          }
                                                                      </Form.Label>
                                                                      <Form.Control
                                                                          name={
                                                                              id
                                                                          }
                                                                          value={
                                                                              inventoryByOptionsState[
                                                                                  id
                                                                              ]
                                                                          }
                                                                          onChange={(
                                                                              e
                                                                          ) => {
                                                                              setInventoryByOptionsState(
                                                                                  (
                                                                                      prevState
                                                                                  ) => ({
                                                                                      ...prevState,
                                                                                      [id]: e
                                                                                          .target
                                                                                          .value,
                                                                                  })
                                                                              )
                                                                              console.log(
                                                                                  inventoryByOptionsState
                                                                              )
                                                                          }}
                                                                          type="text"
                                                                      />
                                                                  </Form.Group>
                                                              )
                                                          }
                                                      )
                                                  ) : (
                                                      <input
                                                          value={
                                                              currentInventory
                                                          }
                                                          onChange={(event) =>
                                                              changeInventory(
                                                                  event
                                                              )
                                                          }
                                                      />
                                                  )
                                              ) : product.inventoryByOptions ? (
                                                  <ul>
                                                      {product.inventoryByOptions.map(
                                                          (optionCombo) => {
                                                              const optionString =
                                                                  optionCombo.optionValues.join(
                                                                      ' '
                                                                  )
                                                              const {
                                                                  inventory,
                                                              } = optionCombo
                                                              return (
                                                                  <li>
                                                                      {
                                                                          optionString
                                                                      }{' '}
                                                                      -{' '}
                                                                      {
                                                                          inventory
                                                                      }
                                                                  </li>
                                                              )
                                                          }
                                                      )}
                                                  </ul>
                                              ) : product.inventory ? (
                                                  product.inventory
                                              ) : (
                                                  0
                                              )}
                                          </TableCell>
                                          <TableCell>
                                              {inEditMode.status &&
                                              inEditMode.rowKey ===
                                                  product.id ? (
                                                  <input
                                                      value={currentCOGS}
                                                      onChange={(event) =>
                                                          changeCOGS(event)
                                                      }
                                                  />
                                              ) : product.cogs ? (
                                                  '$' + product.cogs
                                              ) : (
                                                  ''
                                              )}
                                          </TableCell>
                                          <TableCell>
                                              {inEditMode.status &&
                                              inEditMode.rowKey ===
                                                  product.id ? (
                                                  <React.Fragment>
                                                      <button
                                                          className={
                                                              'btn-success'
                                                          }
                                                          onClick={() =>
                                                              onSave({
                                                                  id: product.id,
                                                                  newInventory:
                                                                      currentInventory
                                                                          ? currentInventory
                                                                          : null,
                                                                  newCOGS:
                                                                      currentCOGS,
                                                              })
                                                          }
                                                      >
                                                          Save
                                                      </button>

                                                      <button
                                                          className={
                                                              'btn-secondary'
                                                          }
                                                          style={{
                                                              marginLeft: 8,
                                                          }}
                                                          onClick={() =>
                                                              onCancel()
                                                          }
                                                      >
                                                          Cancel
                                                      </button>
                                                  </React.Fragment>
                                              ) : (
                                                  <button
                                                      className={'btn-primary'}
                                                      onClick={() =>
                                                          onEdit({
                                                              id: product.id,
                                                              currentInventory:
                                                                  product.inventory
                                                                      ? product.inventory
                                                                      : '',
                                                              currentCOGS:
                                                                  product.cogs
                                                                      ? product.cogs
                                                                      : '',
                                                          })
                                                      }
                                                  >
                                                      Edit
                                                  </button>
                                              )}
                                          </TableCell>
                                      </TableRow>
                                  )
                              })}
                </TableBody>
            </Table>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchProductsStart: () => dispatch(fetchProductsStart()),
})
const mapStateToProps = (state) => ({
    products: state.shop.products,
    collections: state.shop.collections,
})
export default connect(mapStateToProps, mapDispatchToProps)(BulkEditInventory)
