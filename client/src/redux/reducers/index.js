// redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  // Puedes agregar más reducers aquí si los necesitas para otras partes de tu aplicación
});

export default rootReducer;
