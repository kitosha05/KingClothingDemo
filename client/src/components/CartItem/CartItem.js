import React from 'react'
import { Link } from 'react-router-dom'
import './CartItem.scss'

const CartItem = ({ item }) => {
    const { name, price, imageUrl, quantity, collection } = item
    const formattedName = name.replace(/\s/g, '-').toLowerCase()
    const route = `/shop/${collection.toLowerCase()}/${formattedName}`
    return (
        <div className="cart-item">
            <img src={imageUrl} alt="item" />
            <div className="item-details">
                <span className="name">
                    <Link to={route}>{name}</Link>
                </span>
                {item.optionCombo ? (
                    <span className="options">
                        {item.optionCombo.optionValues.map((value) => {
                            return value
                        })}{' '}
                    </span>
                ) : null}
                <span className="price">
                    {quantity}x ${price}
                </span>
            </div>
        </div>
    )
}
export default React.memo(CartItem)
