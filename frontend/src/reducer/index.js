import userReducer from './userReducer'
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import order from './order';
import cart from './cart';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    categories: categoryReducer,
    product: productReducer,
    order,
    cart
});

export default rootReducer;