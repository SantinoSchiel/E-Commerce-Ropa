// redux/store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Importa 'redux-thunk' sin usar la exportación predeterminada

import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;