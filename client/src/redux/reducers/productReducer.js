import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SEARCH_PRODUCTS,
  RESET_PRODUCTS,
} from '../action-types';

const initialState = {
  allProducts: [],
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allProducts: action.payload,
        products: action.payload,
        error: null,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEARCH_PRODUCTS:
      const { searchTerm, category, gender } = action.payload;
      const searchLower = searchTerm.toLowerCase();
      const filteredProducts = state.allProducts.filter(product => {
        const matchesSearchTerm = product.name.toLowerCase().includes(searchLower);
        const matchesCategory = category ? product.category.toLowerCase() === category.toLowerCase() : true;
        const matchesGender = gender ? product.gender.toLowerCase() === gender.toLowerCase() : true;
        return matchesSearchTerm && matchesCategory && matchesGender;
      });
      return {
        ...state,
        products: filteredProducts,
      };
    case RESET_PRODUCTS:
      return {
        ...state,
        products: state.allProducts,
      };
    default:
      return state;
  }
};

export default productReducer;