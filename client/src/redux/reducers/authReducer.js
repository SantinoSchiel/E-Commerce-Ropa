import {
    LOGIN_USER,
    LOGOUT_USER
} from '../../redux/action-types';

const initialState = {
    isLoggedIn: false,
    userData: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isLoggedIn: true,
                userData: action.payload,
            };
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                userData: null,
            };
        default:
            return state;
    }
};

export default authReducer;