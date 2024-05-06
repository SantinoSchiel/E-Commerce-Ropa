import {
    CREATE_ADMIN_SUCCESS,
    CREATE_ADMIN_ERROR,
} from '../action-types';

const initialState = {
    admin: null,
    error: null,
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ADMIN_SUCCESS:
        return {
          ...state,
          admin: action.payload,
          error: null,
        };
      case CREATE_ADMIN_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default adminReducer;  