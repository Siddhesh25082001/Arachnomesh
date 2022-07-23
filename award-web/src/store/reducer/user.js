// Importing the requirements
import { GET_USER, UPDATE_USER, SET_ERROR, VERIFY_OTP, USER_LOGIN, USER_LOGOUT, RESET_OTP } from "../constant/types";

const initialState =  {
  userDetail: [],
  userProfile: {},
  otpVerified: false,
  errors: {},
  isLoggedIn: false,
  isLoggedOut: false
};
  
// Use Reducer Function
const UserReducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case UPDATE_USER:
      return {
        ...state,
        userDetail: action.payload?.list,
        errors: {}
      }

    case VERIFY_OTP:
      return {
        ...state,
        otpVerified: action.payload?.otpVerification,
        errors: {}
      }

    case RESET_OTP:
      return {
        ...state,
        otpVerified: action.payload?.otpVerification,
        errors: {}
      }

    case GET_USER:
      return {
        ...state,
        userProfile:action.payload?.list,
        error: {}
      }
 
    case USER_LOGIN:
      return {
        ...state,
        userDetail: action.payload?.list,
        isLoggedIn: true,
        errors: {}
      }

    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isLoggedOut: true,
        errors: {}
      }

    case SET_ERROR:
        return {
          ...state,
          cartList: [],
          errors: {
            message: action.payload.message
          }
        }
    
    default:
      return state;
    
    }
  }
  
  export default UserReducer;
