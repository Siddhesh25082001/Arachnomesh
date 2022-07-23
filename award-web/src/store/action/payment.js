// Importing the Requirements
import http from "../../services/HttpClient";
import {
  GET_USER_NOMINATION,
  SET_ERROR,
  ZERO_PAYMENT,
  PAYMENT,
  GET_ORDER,
  REMOVE_ORDER,
} from "../constant/types";

// Function to get the User npminations by Id
const getUserNominationById = (body) => async (dispatch) => {
  try {
    const { data } = await http.post("/api/user-status/1/0", body);
    dispatch({
      type: GET_USER_NOMINATION,
      payload: { list: data.data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting the User Nomination by Id !", error);
  }
};

// Function to get the order of the bookings
const getOrder = (body) => async (dispatch) => {
  try {
    const { data } = await http.post("/api/get-order-id", body);

    dispatch({
      type: GET_ORDER,
      payload: { list: data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting the Orders !", error);
  }
};

// Function to remove the order
const removeOrder = (body) => async (dispatch) => {
  dispatch({
    type: REMOVE_ORDER,
  });
};

// Function for Payment with Zero Amount (Razorpay)
const paymentWithZeroAmount = (body, cb) => async (dispatch) => {
  try {
    const { data } = await http.post(
      "/api/confirm-booking-withZeroPayment",
      body
    );

    dispatch({
      type: ZERO_PAYMENT,
      payload: { list: data },
    });
    cb(data);
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Payment with Zero Payment !", error);
  }
};

// Function to confirm Booking
const confirmBooking = (body) => async (dispatch) => {
  try {
    const { data } = await http.post("/api/confirm-booking", body);

    dispatch({
      type: PAYMENT,
      payload: { list: data.data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Confirm Booking !", error);
  }
};

export default {
  getUserNominationById,
  getOrder,
  removeOrder,
  paymentWithZeroAmount,
  confirmBooking,
};
