// Importing the requirements
import http from "../../services/HttpClient";
import storage from "../../services/localStorage";
import {
  UPDATE_USER,
  SET_ERROR,
  GET_USER,
  SEND_OTP,
  USER_LOGIN,
  VERIFY_OTP,
  USER_LOGOUT,
  RESET_OTP,
} from "../constant/types";

// Function to Send the OTP 
const sendOtp = (body, cb) => async (dispatch) => {
  
  try {
    const { data } = await http.post("/api/send-otp", body);
    dispatch({
      type: SEND_OTP,
      payload: { list: data },
    });
    cb();
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Sending the OTP !", error);
  }
};

// Function to Verify the OTP
const verifyOtp = (body) => async (dispatch) => {
  
  try {
    let { data } = await http.post("/api/verify-otp", body);
    console.log("Data", data);
    
    if(data.status === 1) data = 1;
    else                  data = -1;

    dispatch({
      type: VERIFY_OTP,
      payload: { otpVerification: data}
    })

    // dispatch({
    //   type: VERIFY_OTP,
    //   payload: { otpVerification: data },
    // });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error occurred in Verifying the OTP !", error);
  }
};

// Function to Verify the OTP
const resetOtp = (body) => async (dispatch) => {
    
    dispatch({
      type: RESET_OTP,
      payload: { otpVerification: 2}
    })

}

// Function to Create the New User Profile
const createUser =
  (body, cb = () => {}) =>

  async (dispatch) => {
  
    try {
      const { data } = await http.post("/api/create-user", body);
      dispatch({
        type: UPDATE_USER,
        payload: { list: data },
      });
      cb();
    } 
    
    catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: { message: `storage error: ${error}` },
      });
      console.log("Some Error Occured in Creating a New User Profile !", error);
    }
  };

// Function to Login the User
const loginUser = (body) => async (dispatch) => {
  
  try {
    const { data } = await http.post("/api/user-login", body);
    storage.setUser(data);
    dispatch({
      type: USER_LOGIN,
      payload: { list: data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Logging the User !", error);
  }
};

// Function to Logout the User
const logoutUser = () => (dispatch) => {
  
  try {
    const data = storage.removeUser();
    dispatch({
      type: USER_LOGOUT,
      payload: { list: data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Logging out the User !", error);
  }
};

// Function to Get the User
const getUser = () => (dispatch) => {
  
  try {
  
    const data = storage.getUser();
    if (data && data.token) {
      dispatch({
        type: USER_LOGIN,
        payload: { list: data },
      });
    }
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting the User Profile !", error);
  }
};

// Function to Get the User by ID
const getUserById = (body) => async (dispatch) => {
  try {
    const { data } = await http.post("/api/get-user-by-id", body);
    dispatch({
      type: GET_USER,
      payload: { list: data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting the User ID !", error);
  }
};

// Function to Update the User Profile
const updateUser =
  (body, cb = () => {}) =>
  
  async (dispatch) => {
  
    try {
      const { data } = await http.post("/api/update-user-profile", body);
      dispatch({
        type: UPDATE_USER,
        payload: { list: data },
      });
      cb();
    } 
    
    catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: { message: `storage error: ${error}` },
      });
      console.log("Some Error Occured in Updating the User Profile !", error);
    }
  };

export default {
  sendOtp,
  verifyOtp,
  createUser,
  loginUser,
  logoutUser,
  getUser,
  getUserById,
  updateUser,
  resetOtp
};
