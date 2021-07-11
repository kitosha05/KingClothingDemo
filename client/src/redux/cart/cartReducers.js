import cartActionTypes from './cartActionTypes'
import {addItemToCart, reduceItemByOne, addOneOrMoreOfAnItem} from './cartUtils'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case cartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case cartActionTypes.ADD_ITEM:
            return{
                ...state,
                cartItems:addItemToCart(state.cartItems, action.payload.product, action.payload.optionCombo)
            }
        case cartActionTypes.REMOVE_ITEM_FROM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter(
                    cartItem=>cartItem.id !== action.payload.id
                )
            }
        case cartActionTypes.REDUCE_ITEM_BY_ONE:
            return{
                ...state,
                cartItems: reduceItemByOne(state.cartItems, action.payload)
            }
        case cartActionTypes.ADD_ONE_OR_MORE_OF_AN_ITEM:
            return{
                ...state,
                cartItems:addOneOrMoreOfAnItem(state.cartItems, action.payload)
            }
        case cartActionTypes.CLEAR_CART:
            return{
                ...state,
                cartItems:[]
            }
        default:
                return state
    }
}
export default cartReducer