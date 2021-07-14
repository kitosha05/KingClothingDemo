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

    useEffect(() => {
        if (!products) fetchProductsStart()
    }, [products, selectedCollection, inEditMode])

    const onSave = async ({ id, newInventory, newCOGS }) => {
        // updateInventory({id, newUnitPrice});
        const productId = id
        const inventory = newInventory
        const cogs = newCOGS
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
    }
    const onEdit = ({ id, currentInventory, currentCOGS }) => {
        console.log('edit clicked')
        setInEditMode({
            status: true,
            rowKey: id,
        })
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

    //    const renderInventoryByOptionInputs = (product)=>{
    //        const productOptions = product.options
    //        const numberOfOptions=productOptions.length
    //        productOptions[0].optionValues.map(value=>{
    //         for (let i=1;i<numberOfOptions; i++){
    //             re
    //         }

    //        })

    //    }

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
                                                  <input
                                                      value={currentInventory}
                                                      onChange={(event) =>
                                                          changeInventory(event)
                                                      }
                                                  />
                                              ) : product.inventory ? (
                                                  product.inventory
                                              ) : (
                                                  ''
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
                                                                      currentInventory,
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
