import { ADD_TO_CART, REMOVE_FROM_CART, MOVE_FROM_CART } from '../action-types';

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || {},
};

const MAX_QUANTITY = 10;

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { id } = action.payload;
            const newItems = {
                ...state.items,
                [id]: Math.min((state.items[id] || 0) + 1, MAX_QUANTITY), // Limitar la cantidad a 10
            };
            localStorage.setItem('cartItems', JSON.stringify(newItems)); // Guardar en localStorage
            return {
                ...state,
                items: newItems,
            };
        case REMOVE_FROM_CART:
            const productIdToRemove = action.payload;
            let updatedItems;
            if ((state.items[productIdToRemove] || 0) > 1) {
                updatedItems = {
                    ...state.items,
                    [productIdToRemove]: (state.items[productIdToRemove] || 0) - 1,
                };
            } else {
                updatedItems = { ...state.items };
                delete updatedItems[productIdToRemove];
            }
            localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Guardar en localStorage
            return {
                ...state,
                items: updatedItems,
            };
        case MOVE_FROM_CART:
            const productIdToMove = action.payload;
            const { [productIdToMove]: quantity, ...remainingItems } = state.items;
            localStorage.setItem('cartItems', JSON.stringify(remainingItems)); // Guardar en localStorage
            return {
                ...state,
                items: remainingItems,
            };
        default:
            return state;
    }
};

export default cartReducer;