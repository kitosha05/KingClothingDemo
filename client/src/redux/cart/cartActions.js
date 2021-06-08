import cartActionTypes from './cartActionTypes'

export const toggleCartHidden = () => ({
    type: cartActionTypes.TOGGLE_CART_HIDDEN
})

export const addItem = item =>({
    type: cartActionTypes.ADD_ITEM,
    payload: item
})

export const addOneOrMoreOfAnItem = (item, quantity) =>({
    type: cartActionTypes.ADD_ONE_OR_MORE_OF_AN_ITEM,
    payload: {item, quantity}
})

export const removeItemFromCart = item =>({
    type: cartActionTypes.REMOVE_ITEM_FROM_CART,
    payload: item
})

export const reduceItemByOne = item => ({
    type: cartActionTypes.REDUCE_ITEM_BY_ONE,
    payload: item
})

export const clearCart = () =>({
    type:cartActionTypes.CLEAR_CART
})