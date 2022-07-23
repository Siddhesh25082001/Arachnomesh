// Importing the requirements
import http from "../../services/HttpClient";
import {
  GET_CART,
  SAVE_CART,
  UPDATE_CART,
  REMOVE_CART,
  SET_ERROR,
} from "../constant/types";

// Function to Save Items in the cart
const saveCart = (body) => async (dispatch) => {
  try {
    const { data } = await http.post("/api/save-nominee", body);
    dispatch({
      type: SAVE_CART,
      payload: { list: data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Saving Items in the Cart !", error);
  }
};

// Functiont to Update the Items in the cart
const updateCart = (body) => async (dispatch) => {
  try {
    const { data } = await http.post("/api/update-nominee-details", body);
    dispatch({
      type: UPDATE_CART,
      payload: { list: data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Updating the Cart !", error);
  }
};

// Function to get the Cart Items
const getCart = (body) => async (dispatch) => {
  try {
    const { data } = await http.post("/api/cart", body);
    dispatch({
      type: GET_CART,
      payload: { list: data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting the Items to the Cart !", error);
  }
};

// Function to remove the Cart Items
const removeCart = (body) => async (dispatch) => {
  try {
    const { data } = await http.post("/api/remove-item", body);
    console.log(data);
    dispatch({
      type: REMOVE_CART,
      payload: { list: data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Removing the Items from Cart !", error);
  }
};

export default {
  saveCart,
  updateCart,
  getCart,
  removeCart,
};
