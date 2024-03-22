import {
    GET_PRODUCTS,
} from "./action-types.js";

const initialState = {
    products: [],
    allProducts: [],
    productsActive: false,
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {

        case GET_PRODUCTS:
            return {
                ...state,
                productsActive: true,
                allProducts: payload,
            };

        default:
            return { ...state };
    }
};

export default reducer;
