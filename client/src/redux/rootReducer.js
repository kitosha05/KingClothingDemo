import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/userReducer.js'
import cartReducer from './cart/cartReducers.js'
import directoryReducer from './directory/directoryReducer'
import shopReducer from './shop/shopReducer'
import reviewsReducer from './reviews/reviewsReducer'
import orderReducers from './orders/orderReducers'
import adminReducer from './admin/adminReducers'
const persistConfig = {
    key: 'root',
    storage,
    whitelist:['cart']
}
 const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer,
    reviews: reviewsReducer,
    order: orderReducers,
    admin: adminReducer
})
export default persistReducer(persistConfig, rootReducer)