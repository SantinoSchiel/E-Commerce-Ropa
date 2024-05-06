// WishlistReducer.js
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../action-types';

const initialState = {
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
};

const WishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const newWishlistAdd = [...state.wishlist, action.payload];
      localStorage.setItem('wishlist', JSON.stringify(newWishlistAdd));
      return {
        ...state,
        wishlist: newWishlistAdd,
      };
    case REMOVE_FROM_WISHLIST:
      const newWishlistRemove = state.wishlist.filter(productId => productId !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(newWishlistRemove));
      return {
        ...state,
        wishlist: newWishlistRemove,
      };
    default:
      return state;
  }
};

export default WishlistReducer;