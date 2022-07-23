// Importing the requirements
import { GET_QUESTION, SET_ERROR, GET_PARTONE_QUESTION, SAVE_ALL_QUESTION, GET_ANSWER, GET_PART_B, CLEAR_ANSWER } from "../constant/types";

const initialState = {  
  questionList: [],
  answerList: [],
  partBAnswer: [],
  errors: {},
  partOneQuestion: []
};
  
// Card Reducer Function
const CartReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case GET_QUESTION:
      return {
        ...state,
        questionList: action.payload?.list,
        errors: {}
      }
      
    case GET_ANSWER:
      return {
        ...state,
        answerList: action.payload?.list,
        errors:{}
      }
      
    case GET_PART_B:
      return {
        ...state,
        partBAnswer: action.payload?.list,
        errors: {}
      }
    
    case GET_PARTONE_QUESTION:
      return {
        ...state,
        partOneQuestion: action.payload?.list,
        errors: {}
      } 
    
    case CLEAR_ANSWER:
      return {
        answerList: []
      }
  
    case SAVE_ALL_QUESTION:
      return {
        ...state,
        errors:{}
      }
    
    case SET_ERROR:
      return {
        ...state,
        questionList: [],
        errors:{message:action.payload.message}
      }
    
    default:
      return state;
  }
}
  
export default CartReducer;
