// Importing the requirements
import {
  GET_AWARD_LIST,
  GET_PRODUCT_LIST,
  SET_ERROR,
  GET_NOMINATION_LIST,
} from "../constant/types";

const initialState = {
  awardList: [],
  productList: [],
  subProductList: [],
  subsubProductList: [],
  nominationList: [],
  errors: {},
};

// Category Reducer Function
const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AWARD_LIST:
      return {
        ...state,
        awardList: action.payload?.list,
        errors: {},
      };

    case GET_PRODUCT_LIST:
      if (action.payload.parent === "subsubproduct") {
        return {
          ...state,
          subsubProductList: action.payload?.list,
          errors: {},
        };
      }

      if (action.payload.parent === "subProduct") {
        return {
          ...state,
          productList: action.payload?.list,
          errors: {},
        };
      }

      if (action.payload.parent !== "lastlevel")
        return {
          ...state,
          subProductList: action.payload?.list,
          errors: {},
        };

    case GET_NOMINATION_LIST:
      return {
        ...state,
        nominationList: action.payload?.list,
        errors: {},
      };

    case SET_ERROR:
      return {
        ...state,
        items: [],
        errors: {
          message: action.payload.message,
        },
      };

    default:
      return state;
  }
};

export default CategoryReducer;
