// Importing the requirements
import http from "../../services/HttpClient";
import {
  GET_AWARD_LIST,
  GET_PRODUCT_LIST,
  SET_ERROR,
  GET_NOMINATION_LIST,
} from "../constant/types";

// Function to get the list of awards
const getAwardList = (params) => async (dispatch) => {
  try {
    const { data } = await http.get("/api/award-list");

    dispatch({
      type: GET_AWARD_LIST,
      payload: { list: data },
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting the list of awards !", error);
  }
};

// Function to get the product list
const getProductList = (params, parent) => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/getProductByParentId/${params}`);

    dispatch({
      type: GET_PRODUCT_LIST,
      payload: { list: data, parent },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting the Product List !", error);
  }
};

// Function to get the Nominations by Id
const getNominationById = (body) => async (dispatch) => {
  try {
    const { data } = await http.post("/api/get-nomination-by-id", body);

    dispatch({
      type: GET_NOMINATION_LIST,
      payload: { list: data },
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting the Nomination by Id !", error);
  }
};

export default {
  getAwardList,
  getProductList,
  getNominationById,
};
