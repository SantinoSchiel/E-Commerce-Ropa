import {
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR
} from '../action-types';

const initialState = {
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      // Guarda la información del usuario en el almacenamiento local
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;