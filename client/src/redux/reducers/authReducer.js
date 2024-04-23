// redux/reducers/authReducer.js
const initialState = {
    isAuthenticated: false,
    // Otros estados relacionados con la autenticación que puedas necesitar
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
        };
      // Otros casos para manejar acciones relacionadas con la autenticación
      default:
        return state;
    }
  };
  
  export default authReducer;
  