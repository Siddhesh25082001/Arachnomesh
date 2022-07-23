// Importing the requirements
import { SAVE_CART, GET_CART, SET_ERROR } from "../constant/types";

const initialState = {
  cartList: [],
  errors: {},
};

// Card Reducer Function
const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CART:
      return {
        ...state,
        cartList: action.payload?.list,
        errors: {},
      };

    case GET_CART:
      return {
        ...state,
        cartList: action.payload?.list,
        errors: {},
      };

    case SET_ERROR:
      return {
        ...state,
        cartList: [],
        errors: { message: action.payload.message },
      };

    default:
      return state;
  }
};

export default CartReducer;
