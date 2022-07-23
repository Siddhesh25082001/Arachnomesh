// Importing the requirements
import http from "../../services/HttpClient";
import {
  GET_QUESTION,
  SET_ERROR,
  SAVE_PARTONE_QUESTION,
  GET_PARTONE_QUESTION,
  SAVE_ALL_QUESTION,
  GET_ANSWER,
  GET_PART_B,
  CLEAR_ANSWER,
} from "../constant/types";

// Function to Get the Question List
const getQuestionList = (id) => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/award/question/${id}`);

    dispatch({
      type: GET_QUESTION,
      payload: { list: data?.questions },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting the Question List", error);
  }
};

// Function to Get the Part One Question
const getPartoneQuestion = (nominationId) => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/get-user-profile/${nominationId}`);
    dispatch({
      type: GET_PARTONE_QUESTION,
      payload: { list: data.userProfile },
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting the Part One Question", error);
  }
};

// Function to Get the Part-B Answer
const getPartBAnswer = (userId) => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/award/partBanswer/${userId}`);
    dispatch({
      type: GET_PART_B,
      payload: { list: data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting Part-B Answer", error);
  }
};

// Function to Save Part One Question
const savePartoneQuestion = (data, cb) => async (dispatch) => {
  try {
    const { userProfile } = await http.post(`/api/save-user-profile`, data);

    dispatch({
      type: SAVE_PARTONE_QUESTION,
      payload: { list: userProfile },
    });
    cb();
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Saving Part One Question", error);
  }
};

// Function to Save All Question
const saveAllQuestion = (data, cb) => async (dispatch) => {
  try {
    const { result } = await http.post(`/api/award/answer`, {
      data: JSON.stringify(data),
    });

    dispatch({
      type: SAVE_ALL_QUESTION,
      payload: { list: result },
    });
    cb();
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Saving All Questions", error);
  }
};

// Function to Get the Answer by Nomination 
const getAnswerByNomination = (nominationId) => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/award/answer/${nominationId}`);

    dispatch({
      type: GET_ANSWER,
      payload: { list: data },
    });
  } 
  
  catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: { message: `storage error: ${error}` },
    });
    console.log("Some Error Occured in Getting the Answer by Nomination", error);
  }
};

// Function to Clear the Answer
const clearAnswer = () => (dispatch) => {
  dispatch({
    type: CLEAR_ANSWER,
  });
};

export default {
  getQuestionList,
  getPartoneQuestion,
  getPartBAnswer,
  savePartoneQuestion,
  saveAllQuestion,
  getAnswerByNomination,
  clearAnswer,
};
