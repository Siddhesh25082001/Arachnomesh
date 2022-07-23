// Importing the requirements
import {
  GET_USER_NOMINATION,
  SET_ERROR,
  GET_ORDER,
  ZERO_PAYMENT,
  PAYMENT,
  REMOVE_ORDER,
} from "../constant/types";

const initialState = {
  userNomination: [],
  zeroPaymentDetail: [],
  userPayment: [],
  orderData: [],
  errors: {},
};

// Payment Reducer Function
const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_NOMINATION:
      return {
        ...state,
        userNomination: action.payload?.list,
        errors: {},
      };

    case ZERO_PAYMENT:
      return {
        ...state,
        zeroPaymentDetail: action.payload?.list,
        errors: {},
      };

    case PAYMENT:
      return {
        ...state,
        userPayment: action.payload?.list,
        errors: {},
      };

    case GET_ORDER:
      return {
        ...state,
        orderData: action.payload?.list,
        errors: {},
      };

    case REMOVE_ORDER:
      return {
        orderData: [],
      };

    case SET_ERROR:
      return {
        ...state,
        cartList: [],
        errors: {
          message: action.payload.message,
        },
      };

    default:
      return state;
  }
};

export default PaymentReducer;
