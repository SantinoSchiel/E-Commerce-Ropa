// redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './userReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import favorites from './WishlistReducer';
import user from './userReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  favorites: favorites,
  user: user,
  isLoggedIn: auth,
});

export default rootReducer;
