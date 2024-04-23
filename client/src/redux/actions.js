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