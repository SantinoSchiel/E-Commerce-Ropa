import axios from "axios";
// import Swal from "sweetalert2";
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    LOAD_CART_FROM_LOCAL_STORAGE,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    MOVE_FROM_CART,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    LOGOUT_USER,
    LOGIN_USER,
    GET_ADMIN,
    SEARCH_PRODUCTS,
    RESET_PRODUCTS,
} from "./action-types";

const URL_API = import.meta.env.VITE_URL_API;

export const fetchProducts = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });

        try {
            // Realiza una solicitud al backend para obtener los productos
            const { data } = await axios.get(`${URL_API}/product`);

            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_PRODUCTS_FAILURE,
                payload: error.message,
            });
        }
    };
};

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const moveFromCart = productId => ({
    type: MOVE_FROM_CART,
    payload: productId,
});


export const loadCartFromLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    return { type: LOAD_CART_FROM_LOCAL_STORAGE, payload: cartItems };
};

export const addToWishlist = (productId) => {
    localStorage.setItem('wishlist', JSON.stringify([...getWishlist(), productId]));
    return {
        type: ADD_TO_WISHLIST,
        payload: productId,
    };
};

export const removeFromWishlist = (productId) => {
    const updatedWishlist = getWishlist().filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    return {
        type: REMOVE_FROM_WISHLIST,
        payload: productId,
    };
};

const getWishlist = () => {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
};

// export const createAdmin = (adminData) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.post(`${URL_API}/admin`, adminData); // La ruta '/api/admin' debe ser sustituida por la ruta correcta de tu backend
//             dispatch({ type: CREATE_ADMIN_SUCCESS, payload: response.data });
//         } catch (error) {
//             dispatch({ type: CREATE_ADMIN_ERROR, payload: error.message });
//         }
//     };
// };

export const createUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${URL_API}/customer`, userData);
            // console.log(response.data, 'response.data');
            dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
            return response.data;
        } catch (error) {
            console.log(error, 'error');
            console.log(error.message, 'error.message');

            dispatch({ type: CREATE_USER_ERROR, payload: error.message });
            return error;
        }
    };
};

export const getUsers = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL_API}/customer`);
            // console.log(response.data, 'response.data');
            dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
            return response.data;
        } catch (error) {
            // console.log(error, 'error');
            // console.log(error.message, 'error.message');

            dispatch({ type: CREATE_USER_ERROR, payload: error.message });
            return error;
        }
    };
}

export const getAdmins = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL_API}/admin`);
            console.log(response.data, 'data GET ADMIN');
            dispatch({ type: GET_ADMIN, payload: response.data });
            return response.data;
        } catch (error) {
            console.log(error, 'error EN GET ADMIN');
        }
    };
}

export const loginUser = (userData) => {
    return {
        type: LOGIN_USER,
        payload: userData,
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    };
};

export const searchProducts = (searchTerm, category = null, gender = null) => {
    return {
        type: SEARCH_PRODUCTS,
        payload: { searchTerm, category, gender },
    };
};

export const resetProducts = () => {
    return {
        type: RESET_PRODUCTS,
    };
};