
export const addItemToCart = (cartItems, product, optionCombo) => {
   
    const existingCartItem = cartItems.find(cartItem=>cartItem.id===product.id)
    if(existingCartItem){
        return cartItems.map(cartItem=>
            (cartItem.id===product.id) ? {...cartItem, optionCombo, quantity: cartItem.quantity+1} : cartItem
        )
    }

    return [...cartItems, {...product,optionCombo , quantity:1}]
}

export const reduceItemByOne = (cartItems, itemToBeReduced) =>{
    const targetItem = cartItems.find(cartItem=>cartItem.id === itemToBeReduced.id)
    if(targetItem.quantity===1){
        return cartItems.filter(cartItem=>cartItem.id!==itemToBeReduced.id)
    }
    return cartItems.map(cartItem=> (cartItem.id===targetItem.id) ? {...cartItem, quantity: cartItem.quantity-1} : cartItem)
}

export const addOneOrMoreOfAnItem = (cartItems, {item, quantity}) => {
    const existingCartItem = cartItems.find(cartItem=>cartItem.id===item.id)
    if(existingCartItem){
        return cartItems.map(cartItem=>
            (cartItem.id===item.id) ? {...cartItem, quantity: cartItem.quantity+quantity} : cartItem
        )
    }

    return [...cartItems, {...item, quantity: quantity}]
}