// redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import favorites from './WishlistReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  favorites: favorites,
});

export default rootReducer;
