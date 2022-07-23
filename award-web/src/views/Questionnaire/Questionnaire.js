// Importing the Requirements
import { React, useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FaArrowLeft } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import question from "../../store/action/questionnaire";
import storage from "../../services/localStorage";
import { useLocation, useNavigate } from "react-router-dom";

import './Questionnaire.css'
import tick from './tick.png'

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Function Questionnaire to render the Questionnaire template
function Questionnaire() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  let { state } = useLocation();
  let isFinalSubmit = false;
  
  const [key, setKey] = useState("partA");
  const [isPartASaved, setisPartASaved] = useState(false);
  const [isPartBSaved, setisPartBSaved] = useState(false);
  const [isPartCSaved, setisPartCSaved] = useState(false);
  const [isPartDSaved, setisPartDSaved] = useState(false);
  const [isSameShipping, setIsSameShipping] = useState(false);
  const [partAvalidated, setpartAvalidated] = useState(false);
  const [partBvalidated, setpartBvalidated] = useState(false);
  const [partCvalidated, setpartCvalidated] = useState(false);
  const [partDvalidated, setpartDvalidated] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [backClick, setIsBackClick] = useState({
    isBackClick: false,
    currentTab: ""
  });

  const allQuestions = useSelector((state) => state.question.questionList);
  const userDetail = useSelector((state) => state.user.userDetail);
  
  let allAnswers = useSelector((state) => state.question.answerList.answers);
  isFinalSubmit = useSelector((state) => state.question.answerList.isFinalSubmitted);
  
  const partOneAnswer = useSelector((state) => state.question.partOneQuestion);
  const partSecondAnswer = useSelector((state) => state.question.partBAnswer);
  const [existingNominationId,setexistingNominationId]=useState("")
  const [isSelectedWeb,setIsSelectedWeb]=useState(false)
  const [isSelectedSocial,setIsSelectedSocial]=useState(false)
  const [isSelectedWebText,setIsSelectedWebText]=useState(false)
  const [isSelectedSocialText,setIsSelectedSocialText]=useState(false)

  // Part-A Questions
  const partAObject = [

    {  
      nominationId: state?.nominationId,
      userId: storage.getUserId(),
      productName: "",
      brandLogo: "",
      productImage: "",
      introVideo: "",
      sampleAcceptance: true,
      billingAddress: "",
      shippingAddress: "",
      gst: "",
    }
    
  ]

  // Part-B Questions
  const partBObject = [
    {
      
      "qc-001": {
        questionId: "",
        answerType: "",
        value: {
          field: { text: "" }
        },
      },
    
      "qc-002": {
        questionId: "",
        answerType: "",
        value: {
          field: { text: "" }
        },
      },
   
      "qc-003": {
        questionId: "",
        answerType: "",
        value: {
          field: { text: "" }
        },
      },
   
      "qc-004": {
        questionId: "",
        answerType: "",
        value: {
          field: { text: "" }
        },
      },
   
      "qc-005": {
        questionId: "",
        answerType: "",
        value: {
          field: { text: "" }
        },
      },
   
      "qc-006": {
        questionId: "",
        answerType: "",
        value: {
          field: {
            opt_0: false,
            opt_1: false,
            opt_2: false,
            opt_3: false,
            opt_4: false,
            opt_5: false,
            opt_6: false,
            opt_7: false,
            opt_8: false,
            opt_9: false,
            opt_10: false,
            opt_11: false,
            opt_12: false,
            opt_13: false,
            opt_14: false,
          }
        },
      },

    },
  ]

  // Part-C Questions
  const partCObject = [
    
    {
    
      "qc-007": {
        questionId: "",
        answerType: "",
        value: {
          field:{
            selected: ""
          }
        },
      },

      "qc-008": {
        questionId: "",
        answerType: "",
        value: {
          field:{
            selected: ""
          }
        },
      },

      "qc-009": {
        amazon: "",
        flipkart: "",
        bigBasket: "",
        grofers: "",
        companyWebsite: "",
        questionId: "",
        answerType: "",
        value: {
          field:{
            opt_0: false,
            text_0: "",
            opt_1: false,
            text_1: "",
            opt_2: false,
            text_2: "",
            opt_3: false,
            text_3: "",
            opt_4: false,
            text_4: ""
          }
        },
      },
      
      "qc-010": {
        instagram: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        others: "",
        questionId: "",
        answerType: "",
        value: {
          field:{
            opt_0: false,
            text_0: "",
            opt_1: false,
            text_1: "",
            opt_2: false,
            text_2: "",
            opt_3: false,
            text_3: "",
            opt_4: false,
            text_4: ""
          }
        },
      },

      "qc-011": {
        questionId: "",
        answerType: "",
        value: {
          field:{
            opt_0: "",
            opt_1: "",
            opt_2: "",
            opt_3: "",
            opt_4: ""
          }
        },
      },
    
    },
  ]

  // Part-D Questions
  const partDObject=   [
    
    {
    
      "qc-012": {
        questionId: "",
        answerType: "",
        value: {
          field: {
            text: ""
          }
        },
      },
    
      "qc-013": {
        questionId: "",
        answerType: "",
        value: {
          field: {
            text: ""
          }
        },
      },
    
      "qc-014": {
        questionId: "",
        answerType: "",
        value: {
          field: { 
            text: ""
          }
        },
      },
    
      "qc-015": {
        questionId: "",
        answerType: "",
        value: {
          field: {
            text: ""
          }
        },
      },

      "qc-016": {
        questionId: "",
        answerType: "",
        value: {
          field: {
            text: ""
          }
        },
      },

    },
  ]

  const [partAinputFields, setpartAinputFields] = useState(partAObject);
  const [partBinputFields, setpartBinputFields] = useState(partBObject);
  const [partCinputFields, setpartCinputFields] = useState(partCObject);
  const [partDinputFields, setpartDinputFields] = useState(partDObject);

  // Use Effect for getting the user id from local storage
  useEffect(() => {
    dispatch(question.getPartBAnswer(storage.getUserId()));
  }, [])

  useEffect(() => {
    
    if (state?.nominationId) {
      setexistingNominationId(state?.nominationId)
      dispatch(question.getQuestionList(state?.nominationId));
      dispatch(question.getAnswerByNomination(state?.nominationId));
      dispatch(question.getPartoneQuestion(state?.nominationId));
    }
    
    return() => {
      setisPartASaved(false);
      setisPartBSaved(false);
      setisPartCSaved(false);
      setisPartDSaved(false);
      setIsSameShipping(false);
      setpartAvalidated(false);
      setpartBvalidated(false);
      setpartCvalidated(false);
      setpartDvalidated(false);
      setpartCinputFields(partCObject)
      setpartDinputFields(partDObject)
      clearAnswer()
    
      allAnswers = []
    } 

  }, [state]);

  useEffect(() => {
    
    if(isFinalSubmit) {
      console.log('Final Submit');
      return;
    }

    else{

      if(backClick.isBackClick) {

        if(backClick.currentTab === "partB") {
          backClick.isBackClick = false;
          changeTab("partA");
        }

        if(backClick.currentTab === "partC") {
          backClick.isBackClick = false;
          changeTab("partB");
        }

        if(backClick.currentTab === "partD") {
          backClick.isBackClick = false;
          changeTab("partC");
        }
      }

      else{
      
        if(partAvalidated && isPartASaved)  changeTab("partB")
        if(partBvalidated && isPartBSaved && partAvalidated && isPartASaved)  changeTab("partC")
        if(partCvalidated && isPartCSaved)  changeTab("partD")
        if(partDvalidated && isPartDSaved)  handleModal()
      }
    }

  });

  // Function to clear all answers
  const clearAnswer = () => {
    dispatch(question.clearAnswer())
  }

  // Function to Navigate to the Nomination Page
  const navigateToNomination = () => {
    navigate("/nominated")
  }

  // Function to save the contents of Part-A
  const savePartA = (event) => {

    if(partAvalidated && isPartASaved){
      changeTab("partB")
    }

    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      toast.warn("Please Fill All Required Fields !")
    } 
    
    else {

      if(isFinalSubmit){
        toast.warn("Questionnaire can't be Edited after the Final Submit!")
        return
      }
     
      let formData = new FormData()
      formData.append('productImage', partAinputFields[0].productImage)
      formData.append('brandLogo', partAinputFields[0].brandLogo)
      formData.append('nominationId', state?.nominationId)
      formData.append('userId', storage.getUserId())
      formData.append('productName', partAinputFields[0].productName)
      formData.append('sampleAcceptance', partAinputFields[0].sampleAcceptance)
      formData.append('billingAddress', partAinputFields[0].billingAddress)
      formData.append('shippingAddress', partAinputFields[0].shippingAddress)
      formData.append('gst', partAinputFields[0].gst)
      // formData.append('introVideo', partAinputFields[0].introVideo)

      dispatch(
        question.savePartoneQuestion(formData, saved)
      );

      setisPartASaved(true);
    }
    
    setpartAvalidated(true);
  };

  // Function to save the contents of Part-B
  const savePartB = (event) => {

    if(partBvalidated && isPartBSaved){
      changeTab("partC")
    }
  
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      toast.warn("Please Fill All Required !")
    } 
    
    else {

      if(isFinalSubmit){
        toast.warn("Questionnaire Can't be Edited after the Final !")
        return
      }

      let partbData = {
        nominationId: existingNominationId,
        isFinalSubmission: false,
        answers: [],
      };

      const firstObject = partBinputFields[0];
      const partBinputKeys = Object.keys(firstObject);
     
      partBinputKeys.forEach((key) => {
        const questionid = firstObject[key]["questionId"];
        let existedAnswer = allAnswers.find(x => x.questionId === questionid);
      
        let answerObject = {
          questionId: questionid,
          userId: storage.getUserId(),
          answeredBy: "user",
          mapId: key,
          answerType: firstObject[key]["answerType"],
          nominationId: existedAnswer?.nominationId
        };
        
        if(existedAnswer){
          answerObject["_id"]=existedAnswer?._id
        }
        
        if (firstObject[key]["answerType"] === "TEXT") {
          answerObject["field"] = firstObject[key]["value"]['field'];
        }
        
        if (firstObject[key]["answerType"] === "MULTI_SELECT") {
          answerObject["field"] = firstObject[key]["value"]["field"];
        }
       
        partbData.answers.push(answerObject);
      });

      dispatch(
        question.saveAllQuestion(partbData, saved)
      );

      setisPartBSaved(true);
    }
    
    setpartBvalidated(true);
  };

  // Function to save the contents of Part-C
  const savePartC = (event) => {
    
    if(partCvalidated && isPartCSaved){
      changeTab("partD")
    }

    const form = event.currentTarget;
    event.preventDefault();
 
    if (form.checkValidity() === false ) {
      event.stopPropagation();
      toast.warn("Please Fill All Required !")
    } 
    
    else {

      if(isFinalSubmit){
        toast.warn("Questionnaire Can't be Edited after the Final !")
        return
      }
      
      let partcData = {
        nominationId:existingNominationId,
        isFinalSubmission: false,
        answers: [],
      };
      
      const firstObject = partCinputFields[0];
      const partCinputKeys = Object.keys(firstObject);
      partCinputKeys.forEach((key) => {
        const questionid=firstObject[key]["questionId"];
        let existedAnswer = allAnswers.find(x => x.questionId === questionid);
       
        let answerObject = {
          questionId: questionid,
          userId: storage.getUserId(),
          answeredBy: "user",
          mapId: key,
          answerType: firstObject[key]["answerType"],
          nominationId:existingNominationId,
         
        };
        if(existedAnswer){
          answerObject["_id"]=existedAnswer?._id
        }
       
        if (firstObject[key]["answerType"] === "TEXT") {
          answerObject.field = firstObject[key]["value"];
         
        }

        if (firstObject[key]["answerType"] === "SINGLE_SELECT") {
          answerObject.field = firstObject[key]["value"]["field"];
        }

        if (firstObject[key]["answerType"] === "MULTI_SELECT") {
          answerObject.field = firstObject[key]["value"]["field"];
        }

        if (firstObject[key]["answerType"] === "SUB_QUEST") {
          answerObject.field = firstObject[key]["value"]["field"];
        }

        partcData.answers.push(answerObject)
       
      });
      
      dispatch(
        question.saveAllQuestion(partcData, saved)
      );
     
      setisPartCSaved(true);
    }
    
    setpartCvalidated(true);
  };

  // Function to save the contents of Part-D
  const savePartD = (event) => {
    
    const form = event.currentTarget; 
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      toast.warn("Please Fill All Required Fields !")
    } 
    
    else {

      if(isFinalSubmit){
        toast.warn("Questionnaire Can't be Edited after the Final !")
        return
      }

      let partdData = {
        nominationId: existingNominationId,
        isFinalSubmission: true,
        answers: [],
      };

      const firstObject = partDinputFields[0];
      const partDinputKeys = Object.keys(firstObject);
      
      partDinputKeys.forEach((key) => {
      
        const questionid = firstObject[key]["questionId"];
        let existedAnswer = allAnswers.find(x => x.questionId === questionid);
        
        let answerObject = {
          questionId: questionid,
          userId: storage.getUserId(),
          answeredBy: "user",
          mapId: key,
          answerType: firstObject[key]["answerType"],
          nominationId: existingNominationId,
        };
        
        if(existedAnswer){
          answerObject["_id"]=existedAnswer?._id
        }
        
        if (firstObject[key]["answerType"] === "TEXT") {
          answerObject["field"] = firstObject[key]["value"];
        }

        partdData.answers.push(answerObject);
       
      });

      dispatch(
        question.saveAllQuestion(partdData, handleModal)
      );
      
      setisPartDSaved(true);
    }

    setpartDvalidated(true);
  };

  const handleModal = () => {
    setShowPopup(true);
  }

  // Handle Part-D Change
  const handlePartdChange = (event, index, questionId) => {

    let data = [...partDinputFields];
    data[0][event.target.name]["questionId"] = questionId;
    data[0][event.target.name]["answerType"] = "TEXT";
    data[index][event.target.name]["value"] = {
      text: event.target.value,
    };

    setpartDinputFields(data);
    if (!isFinalSubmit) {
      setisPartDSaved(false);
    }
    
  };

  // Handle Part-C Change
  const handlePartcChange = (event, mapId, questionId) => {

    let data = [...partCinputFields];
    const firstObject = partCinputFields[0];
    
    if (mapId === "qc-007") {
      data[0][event.target.name]["questionId"] = questionId;
      data[0][event.target.name]["answerType"] = "SINGLE_SELECT";
      data[0][event.target.name]["value"]["field"] = {
          selected: event.target.id,
      };
    }

    if (mapId === "qc-008") {
      data[0][event.target.name]["questionId"] = questionId;
      data[0][event.target.name]["answerType"] = "SINGLE_SELECT";
      data[0][event.target.name]["value"]["field"] = {
          selected: event.target.id,
      };
    }

    if (mapId === "qc-009" || mapId === "qc-010") {
      
      const data_1 = firstObject[mapId];
      const keys = Object.keys(data_1);
      let id = event.target.id;
      id = id.split("-");
      
      data[0][event.target.name]["questionId"] = questionId;
      data[0][event.target.name]["answerType"] = "MULTI_SELECT";
      data[0][event.target.name][id[0]] = event.target.value;
      
      const prevValue = data[0][event.target.name]["value"]["field"];
      const previousState = prevValue[`opt_${id[1]}`]

      if(event.target.value === "on"){
        
        if(mapId === "qc-009"){
          if(previousState) setIsSelectedWeb(false)          
          else              setIsSelectedWeb(true)
        }

        if(mapId === "qc-010"){
          if(previousState) setIsSelectedSocial(false)
          else              setIsSelectedSocial(true)
        }

      }
      
      keys.forEach((key, index) => {
      
        if (data_1[key] !== "" && key !== "value" && key !== "questionId") {
        
          if(data_1[id[0]] ==="on" ){
            data[0][event.target.name]["value"]["field"] = {
              ...prevValue,
              [`opt_${id[1]}`]:previousState?false:true,
              [`text_${id[1]}`]: "",
            
            };
          }

          else{
            if(data_1[id[0]] !== "on" && data_1[id[0]] !== ""){
              data[0][event.target.name]["value"]["field"] = {
                ...prevValue,
                [`text_${id[1]}`]: data_1[id[0]]
              };
            }
          }
        }

      });

    }

    if (mapId === "qc-011") {
      
      let id = event.target.id;
      const partialKey = id.split("-")[0];
      const completeKey = id.split("-")[1];
      let name = event.target.name;
      name = name.substr(1, name.length);
      const prevValue = data[0][name]["value"]["field"];
      data[0][name]["questionId"] = questionId;
      data[0][name]["answerType"] = "SUB_QUEST";
      data[0][name]["value"]["field"] = {
        ...prevValue,
        [`${partialKey}`]: completeKey,
      };
    }

    setpartCinputFields(data);
    if (!isFinalSubmit) {
      setisPartCSaved(false);
    }
    
  };

  // Handle Part-B Change
  const handlePartbChange = (event, mapId, questionId) => {
  
    let data = [...partBinputFields];

    if (mapId !== "qc-006") {
      data[0][event.target.name]["questionId"] = questionId;
      data[0][event.target.name]["answerType"] = "TEXT";
      data[0][event.target.name]["value"]["field"] = {
        text: event.target.value,
      };
    } 
    
    else {

      data[0][event.target.name]["answerType"] = "MULTI_SELECT";
      data[0][event.target.name]["questionId"] = questionId;
      const prevValue = data[0][event.target.name]["value"]["field"];
      const previousState=prevValue[`${event.target.id}`];
      data[0][event.target.name]["value"]["field"] = {
        ...prevValue,
        [`${event.target.id}`]: previousState?false:true,
      };
    }
    
    setpartBinputFields(data);
    if (!isFinalSubmit) {
      setisPartBSaved(false);
    }
    
  };

  // Function to saved the changes
  const saved = () => {
    toast.success("All Details Saved Successfully !")
    return;
  }

  // Function to change the Tabs

  const changeTab = (k) => {

    console.log(k, "pressed");

    if (k === "partB" && partAvalidated && isPartASaved) {
      console.log("Part-B", partBvalidated, isPartBSaved)
      setKey(k);
      return;
    }

    else if (k === "partC" && partBvalidated && isPartBSaved && isPartASaved && partAvalidated) {
      console.log("Part-C", partCvalidated, isPartCSaved)
      setKey(k)
      return;
    }
    
    else if (k === "partD" && partCvalidated && isPartCSaved) {
      console.log("Part-D", partDvalidated, isPartDSaved)
      setKey(k);
      return;
    }
    
    else if (k === "partA") {
      console.log("Part-A", partAvalidated, isPartASaved)
      setKey(k);
      return;
    }

    else toast.warn("Please Fill the Current Part before proceeding to the Next Part !");

  };

  // Function to upload the file
  const readUploadFile = (event, flag) => {

    const fileName = event.target.files[0].name;
   
    let fileSizeInMB = event.target.files["0"].size / 1024;
    fileSizeInMB = fileSizeInMB / 1024;
    let fileFormat = event.target.files["0"].name.split(".")[1];

    if (fileFormat !== "jpeg" && fileFormat !== "png" &&  fileFormat !== "jpg") {
      toast.warn("File Format Not Supported !");
      return;
    }

    if (fileSizeInMB > 10) {
      toast.warn("Maximum file size allowed is 10MB !");
      return;
    }
    event.preventDefault();
   
    if (event.target.files) {

      console.log(event.target.files);
      
      if (flag === "brandLogo") {
        partAinputFields[0].brandLogo =event.target.files[0]
      }
        
      if (flag === "productImage") {
          partAinputFields[0].productImage = event.target.files[0]
      }
      
      if (flag === "companyLogo") {
          partAinputFields[0].companyLogo = event.target.files[0]
      }
  
    }
  };

  // Function to upload the video
  const readUploadVideo = (event, flag) => {

    const fileName = event.target.files[0].name;
    let fileSizeInMB = event.target.files["0"].size / 1024;
    fileSizeInMB = fileSizeInMB / 1024;
    let fileFormat = event.target.files["0"].name.split(".")[1];

    if (fileFormat !== "mp4" && fileFormat !== "avi") {
      toast.warn("File Format Not Supported !");
      return;
    }

    if (parseInt(fileSizeInMB) > 10) {
      toast.warn("Maximum file size allowed is 10MB !");
      return;
    }
    event.preventDefault();

    if (event.target.files) {
      if (flag === "video") {
        partAinputFields[0].introVideo = event.target.files[0];
      }
     
    }
  };

  // Function triggers if Delivery and Shipping address are different
  const onChangeInput = (value, flag) => {

    if(isSameShipping && flag === "shippingAddress"){
      return
    }
    let data = [...partAinputFields];

    if(flag === "sampleAcceptance"){
      data[0][flag] = value==="yes" ? true : false;
      setpartAinputFields(data);
      return;
    }

    data[0][flag] = value;
    setpartAinputFields(data);
  };

  // Function triggers if Delivery and Shipping address are same
  const sameShippingAddress = (e) => {

    const sameShipping = !isSameShipping;
    
    setIsSameShipping(sameShipping);
    let data = [...partAinputFields];

    if (sameShipping) {
      data[0].shippingAddress = data[0].billingAddress;
    } 
    
    else {
      data[0].shippingAddress = "";
    }
    
    setpartAinputFields(data);
  };

  useEffect(() => {
   
    if (partOneAnswer&&Object.keys(partOneAnswer).length) {
   
      // console.log(partOneAnswer);
      if(partOneAnswer.billingAddress&& partOneAnswer.billingAddress===partOneAnswer.shippingAddress && partOneAnswer.billingAddress!==""){
        setIsSameShipping(true);
      }
      
      onChangeInput(partOneAnswer._id,"_id")
      onChangeInput(partOneAnswer.brandLogo,"brandLogo")
      onChangeInput(partOneAnswer.companyLogo,"companyLogo")
      onChangeInput(partOneAnswer.productImage,"productImage")
      // onChangeInput(partOneAnswer. introVideo," introVideo")
      
      let data = [...partAinputFields];
      data[0]["productName"] = partOneAnswer?.productName
      data[0]["billingAddress"] = partOneAnswer?.billingAddress
      data[0]["shippingAddress"] = partOneAnswer?.shippingAddress
      data[0]["gst"] = partOneAnswer?.gst
      data[0]["sampleAcceptance"] = partOneAnswer?.sampleAcceptance
      data[0]["productImage"] = partOneAnswer?.productImage?.image
      data[0]["brandLogo"] = partOneAnswer?.brandLogo?.image
      // data[0]["introVideo"] = partOneAnswer?.introVideo

      setpartAinputFields(data);
      setpartAvalidated(true)
      setisPartASaved(true)
      
  }
  
  else{
    setpartAinputFields(partAObject);
    setpartAvalidated(false)
    setisPartASaved(false)
    setIsSameShipping(false);
  }

  }, [partOneAnswer])

  useEffect(() => {
    
    if (partSecondAnswer&&partSecondAnswer.length&&allQuestions&& allQuestions.length) {
    
      console.log("#####");
      let bData = [...partBinputFields];
      console.log(allQuestions.length);
      
      for (let index = 0; index < allQuestions.length; index++) {
        console.log("%%%%%%");
        let question = allQuestions[index];
        let existedAnswer = partSecondAnswer.find(x => x.questionId === question._id);
      
        if(existedAnswer){
          console.log("@@@@@");
        
          if(question.mapId==="qc-001" || question.mapId==="qc-002" || question.mapId==="qc-003"|| question.mapId==="qc-004"|| question.mapId==="qc-005"){
            bData[0][question.mapId.toString()].value.field.text=existedAnswer?.field?.text
            bData[0][question.mapId.toString()].questionId=question._id
            bData[0][question.mapId.toString()].answerType = question.answerType
            setisPartBSaved(true)
            setpartBvalidated(true)
          }

          if(question.mapId==="qc-006"){
            bData[0][question.mapId.toString()].value.field=existedAnswer.field
            bData[0][question.mapId.toString()].questionId=question._id
            bData[0][question.mapId.toString()].answerType = question.answerType
          }
        }

      }
    
    }
  }, [partSecondAnswer,allQuestions])
  

  useEffect(() => {
    
    if (allAnswers?.length && allQuestions?.length) {    
    let cData = [...partCinputFields];
    console.log("###")
    let dData = [...partDinputFields];
    
    for (let index = 0; index < allQuestions.length; index++) {
    
      console.log("%%%%")
      let question = allQuestions[index];
      let existedAnswer = allAnswers.find(x => x.questionId === question._id);
    
      if(existedAnswer){
        console.log("***")
        
        if((question.mapId==="qc-007" || question.mapId==="qc-008")){
          console.log("888")
          cData[0][question.mapId.toString()].value.field.selected=existedAnswer?.field?.selected
          cData[0][question.mapId.toString()].questionId=question._id
          cData[0][question.mapId.toString()].answerType = question.answerType
          setisPartCSaved(true)
          setpartCvalidated(true)
        }
        if(question.mapId==="qc-009" ||question.mapId==="qc-010"){
          cData[0][question.mapId.toString()].value.field.opt_0=existedAnswer?.field?.opt_0
          cData[0][question.mapId.toString()].value.field.opt_1=existedAnswer?.field?.opt_1
          cData[0][question.mapId.toString()].value.field.opt_2=existedAnswer?.field?.opt_2
          cData[0][question.mapId.toString()].value.field.opt_3=existedAnswer?.field?.opt_3
          cData[0][question.mapId.toString()].value.field.opt_4=existedAnswer?.field?.opt_4
          cData[0][question.mapId.toString()].questionId=question?._id
          cData[0][question.mapId.toString()].answerType = question?.answerType

          if (question.mapId==="qc-009") {
            cData[0][question.mapId.toString()].value.field.text_0=existedAnswer?.field?.text_0
            cData[0][question.mapId.toString()].value.field.text_1=existedAnswer?.field?.text_1
            cData[0][question.mapId.toString()].value.field.text_2=existedAnswer?.field?.text_2
            cData[0][question.mapId.toString()].value.field.text_3=existedAnswer?.field?.text_3
            cData[0][question.mapId.toString()].value.field.text_4=existedAnswer?.field?.text_4
          }

          if (question.mapId==="qc-010") {
            cData[0][question.mapId.toString()].value.field.text_0=existedAnswer?.field?.text_0
            cData[0][question.mapId.toString()].value.field.text_1=existedAnswer?.field?.text_1
            cData[0][question.mapId.toString()].value.field.text_2=existedAnswer?.field?.text_2
            cData[0][question.mapId.toString()].value.field.text_3=existedAnswer?.field?.text_3
            cData[0][question.mapId.toString()].value.field.text_4=existedAnswer?.field?.text_4
          }
            
          setIsSelectedSocial(true)
          setIsSelectedWeb(true)
        }
        
        if(question.mapId==="qc-011"){ 
          cData[0][question.mapId.toString()].value.field.opt_0=existedAnswer?.field?.opt_0
          cData[0][question.mapId.toString()].value.field.opt_1=existedAnswer?.field?.opt_1
          cData[0][question.mapId.toString()].value.field.opt_2=existedAnswer?.field?.opt_2
          cData[0][question.mapId.toString()].value.field.opt_3=existedAnswer?.field?.opt_3
          cData[0][question.mapId.toString()].value.field.opt_4=existedAnswer?.field?.opt_4
          cData[0][question.mapId.toString()].questionId=question?._id
          cData[0][question.mapId.toString()].answerType = question?.answerType
        }

        if(question.mapId==="qc-012"|| question.mapId==="qc-013"|| question.mapId==="qc-014"|| question.mapId==="qc-015"||question.mapId==="qc-016"){
          dData[0][question.mapId.toString()].value.field.text=existedAnswer?.field?.text
          dData[0][question.mapId.toString()].questionId=question?._id
          dData[0][question.mapId.toString()].answerType = question?.answerType
          setisPartDSaved(true)
          setpartDvalidated(true)
        }

  
      }

    }
    
  }
   
  }, [allAnswers,allQuestions])

  // Render the Questionnaire UI
  return (

    <div className = "questionnaire_main">

      <ToastContainer />
    
      <div className = "title_div">
        <h4>Channelier FMCG Awards 2022 Questionnaire</h4>
      </div>

      <div className = "tab_inner_div">
        
        <Tabs id="controlled-tab-example" activeKey = {key} onSelect = {(k) => changeTab(k)} className = "mb-3 tab_bar">

          {/* Tab-A Content */}
          <Tab eventKey = "partA" title = "Part A">

            <div className = "inner_form">
            
              <Form noValidate validated = {partAvalidated} onSubmit = {savePartA}>
            
                <Form.Group className = "form_row">
                  <Form.Label>Product / Brand name <span className = "required">*</span></Form.Label>
                  <Form.Control disabled = {isFinalSubmit ? true : false} required type = "text" placeholder = "Enter Product Name"
                    value = {partAinputFields[0].productName || state?.productName }
                    onChange = {(e) =>
                      onChangeInput(e.target.value, "productName")
                    }
                  />
                </Form.Group>

                {
                  partOneAnswer && partOneAnswer?.brandLogo?.image !== "" ? (
                      <>
                        <Form.Label>
                          Brand Logo (jpg, png){" "}
                        </Form.Label> &nbsp;
                        <a target = "_blank" href = {partOneAnswer?.brandLogo?.image}>View Brand Image</a>
                        <br/>
                      </>
                  
                    ): 
                    (
                      <Form.Group  className = "form_row">
                        <Form.Label>Upload Brand Logo (jpg, png){" "}<span className = "required">*</span></Form.Label>
                        <Form.Control disabled = {isFinalSubmit ? true : false} required type = "file" id = "brandLogo" onChange = {(e) => readUploadFile(e, "brandLogo")} accept = ".png,.jpeg,.jpg" />
                      </Form.Group>
                    ) 
                }

                {
                  partOneAnswer && partOneAnswer?.productImage?.image !== "" ? (
                    <>
                     <Form.Label>Product Image (jpg, png){" "}</Form.Label>&nbsp;
                      <a target = "_blank" href = {partOneAnswer?.productImage?.image}>View Product Image</a>
                      <br/>
                    </>
                  ):
                  
                  (
                    <Form.Group  className = "form_row">
                      <Form.Label>Upload Product Image (jpg, png){" "}<span className = "required">*</span></Form.Label>
                      <Form.Control disabled = {isFinalSubmit ? true : false} required type = "file" id = "productImage" onChange = {(e) => readUploadFile(e, "productImage")} accept = ".png,.jpeg,.jpg" />
                    </Form.Group>
                  )
                }

                <Form.Group  className = "form_row">

                  <Form.Label>
                    Can you send the product sample to the below mentioned address? (Minimum quantity : 3)
                    <br/>
                    <strong>
                      Contact Person Name :- Ankur Gupta 
                      <br/> 
                      Address: A-102, Sunshine Helios, Sector 78, Noida - 201301 
                      <br/> 
                      Mobile Number: <a href = "tel:+8882113578">8882113578</a>
                    </strong>   
                  </Form.Label>
                  
                  <div onChange = {(e) => onChangeInput(e.target.id, "sampleAcceptance")}>
                    <Form.Check disabled = {isFinalSubmit ? true : false} required id = "yes" name = "acceptqance" type = "radio" label = "Yes" checked = {partAinputFields[0]?.sampleAcceptance} />
                    <Form.Check disabled = {isFinalSubmit ? true : false} required id = "no" name = "acceptqance" type = "radio" label = "No" checked = {!partAinputFields[0]?.sampleAcceptance} />
                  </div>

                </Form.Group>

                <Form.Group controlId = "formTextarea" className = "form_row">
                  <Form.Label>Enter your Billing Address</Form.Label>
                  <Form.Control 
                    value = {partAinputFields[0].billingAddress} 
                    onChange = {(e) => onChangeInput(e.target.value, "billingAddress")} 
                    disabled = {isFinalSubmit ? true : false} 
                    as = "textarea"
                    placeholder = "Type here..."
                    style = {{ height: "80px" }}
                  />
                </Form.Group>

                <Form.Group controlId = "formTextarea1" className = "form_row mb-3">
                  <Form.Label>Enter your Shipping Address</Form.Label>
                  <Form.Control
                    value = {partAinputFields[0].shippingAddress}
                    onChange = {(e) =>
                      onChangeInput(e.target.value, "shippingAddress")
                    }
                    disabled = {isFinalSubmit ? true : false}
                    as = "textarea"
                    placeholder = "Type here..."
                    style = {{ height: "80px" }}
                  />
                </Form.Group>

                <Form.Group controlId = "formBasicCheckbox1" className = "form_row">
                  <Form.Check
                    disabled = {isFinalSubmit ? true : false}
                    className = "pd-basic"
                    type = "checkbox"
                    label = "same as Billing Address"
                    checked = {isSameShipping}
                    onChange = {(e) => sameShippingAddress(e)}
                  />
                </Form.Group>

                <Form.Group className = "form_row" controlId = "formBasicEmail">
                  <Form.Label>GSTIN</Form.Label>
                  <Form.Control
                    disabled = {isFinalSubmit ? true : false}
                    type = "text"
                    placeholder = "Enter GSTIN"
                    value={partAinputFields[0].gst}
                    onChange = {(e) => onChangeInput(e.target.value, "gst")}
                  />
                </Form.Group>

                <div className = "form_btns">
                  <Button
                    type = "submit"
                    className = "custom_btn brown_btn me-3"
                    // onClick={() => changeTab("partB")}
                  >
                    Next
                  </Button>
                  {/* <Button type = "submit" className = "custom_btn white_border_btn">
                    Save
                  </Button> */}
                </div>

              </Form>
            </div>
          </Tab>

          {/* Tab-B Content */}
          <Tab eventKey = "partB" title = "Part B">

            <div className = "inner_form">
            
              <Form noValidate validated = {partBvalidated} onSubmit = {savePartB}>
            
                {allQuestions?.slice(0, 6).map((item, index) =>
                    partBinputFields?.map((input, index) =>
                    
                    item.answerType === "TEXT" ? (
                      
                      <Form.Group key = {index} className = "form_row" >
                        <Form.Label>{item.text} <span className = "required">*</span></Form.Label>
                        <Form.Control
                          disabled = {isFinalSubmit ? true : false}
                          required
                          as="textarea"
                          onChange = {(e) =>
                            handlePartbChange(e, item?.mapId,item?._id)
                          }
                          name={item.mapId}
                          value = {input[item.mapId.toString()].value?.field?.text !== "" ? input[item.mapId.toString()].value?.field?.text : ""}
                          placeholder = "Your text..."
                          style = {{ height: "80px" }}
                        />
                      </Form.Group>
                    ) : 
                    
                    item.answerType === "MULTI_SELECT" ? (
                    
                      <Form.Group
                        key = {index}
                        className = "form_row"
                      >
                        <Form.Label>{item.text}</Form.Label>

                        <div
                          onChange = {(e) =>
                            handlePartbChange(e, item?.mapId,item?._id)
                          }
                          checked={input[item.mapId.toString()].value?.field}
                        >
                            
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_0"
                            type = "checkbox"
                            label = "Beat management"
                            checked = {input[item.mapId.toString()].value?.field?.opt_0 ? true : false}
                          />
                          
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_1"
                            type = "checkbox"
                            label = "Multiple levels of channel partners"
                            checked = {input[item.mapId.toString()].value?.field?.opt_1 ? true : false}
                          />
                              
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_2"
                            type = "checkbox"
                            label = "Custom Schemes and Pricing for Outlets"
                            checked = {input[item.mapId.toString()].value?.field?.opt_2? true : false}
                          />
                              
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_3"
                            type = "checkbox"
                            label = "Login for Channel Partners"
                            checked = {input[item.mapId.toString()].value?.field?.opt_3 ? true : false}
                          />
                          
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_4"
                            type = "checkbox"
                            label = "Works offline"
                            checked = {input[item.mapId.toString()].value?.field?.opt_4 ? true : false}
                          />

                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_5"
                            type = "checkbox"
                            label = "Custom Forms and surveys"
                            checked = {input[item.mapId.toString()].value?.field?.opt_5 ? true : false}
                          />
                              
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_6"
                            type = "checkbox"
                            label = "Module for delivery person, merchandiser"
                            checked = {input[item.mapId.toString()].value?.field?.opt_6 ? true : false}
                          />
                          
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_7"
                            type = "checkbox"
                            label = "Measure Productivity "
                            checked = {input[item.mapId.toString()].value?.field?.opt_7 ? true : false}
                          />
                          
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            type = "checkbox"
                            label = "Predictive Analytics"
                            id = "opt_8"
                            name = {item.mapId}
                            checked = {input[item.mapId.toString()].value?.field?.opt_8 ? true : false}
                          />

                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_9"
                            type = "checkbox"
                            label = "Targets and Achievements"
                            checked={input[item.mapId.toString()].value?.field?.opt_9 ? true : false}
                          />
                              
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_10"
                            type = "checkbox"
                            label = "Daily Tasks Scheduling"
                            checked = {input[item.mapId.toString()].value?.field?.opt_10 ? true : false}
                          />
                              
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_11"
                            type = "checkbox"
                            label = "Inventory visibility at retailer outlets"
                            checked = {input[item.mapId.toString()].value?.field?.opt_11 ? true : false}
                          />
                              
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_12"
                            type = "checkbox"
                            label = "Track Payment Status"
                            checked = {input[item.mapId.toString()].value?.field?.opt_12 ? true : false}
                          />
                              
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_13"
                            type = "checkbox"
                            label = "Reminders for Follow-ups "       
                            checked = {input[item.mapId.toString()].value?.field?.opt_13 ? true : false}
                          />
                          
                          <Form.Check
                            disabled = {isFinalSubmit ? true : false}
                            name = {item.mapId}
                            id = "opt_14"
                            type = "checkbox"
                            label="Track Location "
                            checked = {input[item.mapId.toString()].value?.field?.opt_14?true:false}
                          />

                        </div>

                      </Form.Group>
                    ) : 
                    
                    (
                      ""
                    )
                  )
                )}

                <div className = "form_btns">
                  
                  <Button
                    type = "button"
                    className = "custom_btn white_border_btn me-3"
                    onClick={() => {
                      setIsBackClick({
                        ...backClick, 
                        isBackClick: true,
                        currentTab: "partB"
                      });
                      changeTab("partA");
                    }}
                  >
                    Back
                  </Button>

                  <Button
                    type = "submit"
                    className = "custom_btn brown_btn me-3"
                    // onClick={() => changeTab("partC")}
                  >
                    Next
                  </Button>

                  {/* <Button type = "submit" className = "custom_btn brown_border_btn">
                    Save
                  </Button> */}

                </div>

              </Form>

            </div>
          
          </Tab>

          {/* Tab-C Content */}
          <Tab eventKey = "partC" title = "Part C">

            <div className = "inner_form">
              <Form noValidate validated = {partCvalidated} onSubmit = {savePartC}>
            
                {allQuestions?.slice(6, 11).map((item, index) => (
            
                  <Form.Group key = {index}  className = "form_row">
                
                    <Form.Label>{item.text} <span className = "required">*</span></Form.Label>
                    
                    {item.mapId === "qc-007" && (
                      <div onChange = {(e) => handlePartcChange(e, item.mapId, item?._id)} checked={partCinputFields[0]["qc-007"]["value"]["fields"]} >
                        
                        <Form.Check
                          disabled = {isFinalSubmit ? true : false}
                          required
                          id = "1"
                          name = {item.mapId}
                          type  = "radio"
                          label = "1-5 SKU"     
                          checked = {partCinputFields[0]["qc-007"]["value"]["field"]?.selected === "1" ? true : false}
                        />
                        
                        <Form.Check
                          disabled = {isFinalSubmit ? true : false}
                          required
                          id = "2"
                          name = {item.mapId}
                          type = "radio"
                          label = "6-10 SKU"
                          checked = {partCinputFields[0]["qc-007"]["value"]["field"]?.selected === "2" ? true : false}
                        />

                        <Form.Check
                          disabled = {isFinalSubmit ? true : false}
                          required
                          id = "3"
                          name = {item.mapId}
                          type = "radio"
                          label = "16-20 SKU"
                          checked = {partCinputFields[0]["qc-007"]["value"]["field"]?.selected === "3" ? true : false}
                        />
                        
                        <Form.Check
                          disabled = {isFinalSubmit ? true : false}
                          required
                          id = "4"
                          name = {item.mapId}
                          type = "radio"
                          label = "More than 20 SKUs"
                          checked = {partCinputFields[0]["qc-007"]["value"]["field"]?.selected === "4" ? true : false}
                        />

                    </div>
                    )}

                    {item.mapId === "qc-008" && (

                      <div
                        onChange = {(e) =>
                          handlePartcChange(e, item.mapId, item?._id)
                        }
                        checked={partCinputFields[0]["qc-008"]["value"]}
                      >
                      
                        <Form.Check
                          disabled = {isFinalSubmit ? true : false}
                          required
                          id = "1"
                          name = {item.mapId}
                          type = "radio"
                          label = "0 States"                          
                          checked = {partCinputFields[0]["qc-008"]?.value?.field?.selected === "1" ? true : false}
                        />

                        <Form.Check
                          disabled = {isFinalSubmit ? true : false}
                          required
                          id = "2"
                          name = {item.mapId}
                          type = "radio"
                          label = "1-5 States"
                          checked = {partCinputFields[0]["qc-008"]?.value?.field?.selected === "2" ? true : false}
                        />

                        <Form.Check
                          disabled = {isFinalSubmit ? true : false}
                          required
                          id = "3"
                          name = {item.mapId}
                          type = "radio"
                          label = "11-15 States"
                          checked = {partCinputFields[0]["qc-008"]?.value?.field?.selected === "3" ? true : false}
                        />
                        
                        <Form.Check
                          disabled = {isFinalSubmit ? true : false}
                          required
                          id = "4"
                          name = {item.mapId}
                          type = "radio"
                          label = "16-20 States"
                          checked = {partCinputFields[0]["qc-008"]?.value?.field?.selected === "4" ? true : false}
                        />
                        
                        <Form.Check
                          disabled = {isFinalSubmit ? true : false}
                          required
                          id = "5"
                          name = {item.mapId}
                          type = "radio"
                          label = "More than 20 states"
                          checked = {partCinputFields[0]["qc-008"]?.value?.field?.selected === "5" ? true : false}
                        />
                      </div>
                    )}

                    {item.mapId === "qc-009" && (

                      <div className = "check-box-group" >
                      
                        <div className = "radio_input">
                      
                          <Form.Check 
                            type = "checkbox" required={isSelectedWeb?false:true}  
                            disabled = {isFinalSubmit ? true : false}  
                            id = "amazon-0"  
                            name = {item.mapId}  
                            onChange = {(e) =>
                                handlePartcChange(e, item.mapId, item?._id)
                            }   
                            label = "Amazon" checked = {partCinputFields[0]["qc-009"]?.value?.field?.opt_0} 
                          />
                      
                          <Form.Control
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            value = {
                              partCinputFields[0]["qc-009"]?.value?.field?.text_0
                            } 
                            disabled = {isFinalSubmit ? true : false}
                            type = "text"
                            required = {isSelectedWeb ? false : true}
                            name = {item.mapId}
                            id = "amazon-0"
                            placeholder = "Paste your url here"
                          />    

                        </div>

                        <div className = "radio_input">
                          
                          <Form.Check 
                            type = "checkbox" 
                            required = {isSelectedWeb?false:true}  
                            disabled = {isFinalSubmit ? true : false} 
                            id = "flipkart-1"  
                            name = {item.mapId}  
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }   label = "Flipkart" checked = {partCinputFields[0]["qc-009"]?.value?.field?.opt_1} 
                          />

                          <Form.Control
                            type = "text"
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            value = {
                              partCinputFields[0]["qc-009"]?.value?.field?.text_1
                            }
                            disabled = {isFinalSubmit ? true : false}
                            required = {isSelectedWeb?false:true}
                            name = {item.mapId}
                            id = "flipkart-1"
                            placeholder = "Paste your url here"
                          />

                        </div>

                        <div className = "radio_input">

                          <Form.Check 
                            type = "checkbox" 
                            required = {isSelectedWeb ? false : true}  
                            disabled = {isFinalSubmit ? true : false}   
                            id = "bigBasket-2"  
                            name = {item.mapId}  
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }   
                            label = "BigBasket" checked = {partCinputFields[0]["qc-009"]?.value?.field?.opt_2} 
                          />
                          
                          <Form.Control
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            value = {
                              partCinputFields[0]["qc-009"]?.value?.field?.text_2
                            }
                            disabled = {isFinalSubmit ? true : false}
                            type = "text"
                            required={isSelectedWeb ? false:true}
                            name={item.mapId}
                            id="bigBasket-2"
                            placeholder = "Paste your url here"
                          />

                        </div>

                        <div className = "radio_input">

                          <Form.Check 
                            type = "checkbox" 
                            required = {isSelectedWeb? false : true}  
                            disabled = {isFinalSubmit ? true : false} 
                            id = "grofers-3"  
                            name = {item.mapId}  
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }   
                            label="Grofers" checked={partCinputFields[0]["qc-009"]?.value?.field?.opt_3} 
                          />
                          
                          <Form.Control
                            type = "text"
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            value = {
                              partCinputFields[0]["qc-009"]?.value?.field?.text_3
                            }
                            disabled = {isFinalSubmit ? true : false}
                            required = {isSelectedWeb?false:true}
                            name = {item.mapId}
                            id = "grofers-3"
                            placeholder = "Paste your url here"
                          />

                        </div>

                        <div className = "radio_input">

                          <Form.Check type = "checkbox" 
                            required={isSelectedWeb?false:true}  
                            disabled = {isFinalSubmit ? true : false}   
                            id = "companyWebsite-4"  
                            name = {item.mapId}  
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }   
                            label = "Company website" checked = {partCinputFields[0]["qc-009"]?.value?.field?.opt_4} 
                          />
                          
                          <Form.Control
                            type = "text"
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            disabled = {isFinalSubmit ? true : false}
                            name = { item.mapId}
                            required = {isSelectedWeb ? false : true}
                            id = "companyWebsite-4"
                            value = {
                              partCinputFields[0]["qc-009"]?.value?.field?.text_4
                            }
                            placeholder = "Paste your url here"
                          />

                        </div>

                        {/* <div className = "radio_input"></div> */}
                        
                      </div>
                    )}
                    
                    {item.mapId === "qc-010" && (

                      <div className = "group-checkbox-2">

                        <div className = "radio_input">
                         
                          <Form.Check 
                            type = "checkbox" 
                            required = {isSelectedSocial ? false : true}  
                            disabled = {isFinalSubmit ? true : false}   
                            id = "instagram-0"  
                            name = {item.mapId}  onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }   
                            label = "Instagram" checked = {partCinputFields[0]["qc-010"]?.value?.field?.opt_0} 
                          />
                          
                          <Form.Control
                            type = "text"  
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            disabled = {isFinalSubmit ? true : false}
                            value = {
                              partCinputFields[0]["qc-010"]?.value?.field?.text_0
                            }
                            required = {isSelectedSocial ? false : true} 
                            name = {item.mapId}
                            id = "instagram-0"
                            placeholder = "Paste your url here"
                          />

                        </div>

                        <div className = "radio_input">

                          <Form.Check 
                            type = "checkbox" 
                            required = {isSelectedSocial ? false : true}  
                            disabled = {isFinalSubmit ? true : false}   
                            id = "twitter-1"  
                            name = {item.mapId}  
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }   
                            label="Twitter" checked = {partCinputFields[0]["qc-010"]?.value?.field?.opt_1} 
                          />
                          
                          <Form.Control
                            type = "text"
                            disabled = {isFinalSubmit ? true : false}
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            name = {item.mapId}
                            id = "twitter-1"
                            required = {isSelectedSocial ? false : true} 
                            value = {
                              partCinputFields[0]["qc-010"]?.value?.field?.text_1
                            }
                            placeholder = "Paste your url here"
                          />

                        </div>

                        <div className = "radio_input">

                          <Form.Check 
                            type = "checkbox" 
                            required = {isSelectedSocial ? false : true}  
                            disabled = {isFinalSubmit ? true : false}     
                            id = "facebook-2"  
                            name = {item.mapId}  
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }   
                            label = "Facebook" checked = {partCinputFields[0]["qc-010"]?.value?.field?.opt_2} 
                          />
                          
                          <Form.Control
                            type = "text"
                            disabled = {isFinalSubmit ? true : false}
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            required = {isSelectedSocial?false:true} 
                            name = {item.mapId}
                            id = "facebook-2"
                            value = {
                              partCinputFields[0]["qc-010"]?.value?.field?.text_2
                            }
                            placeholder = "Paste your url here"
                          />

                        </div>

                        <div className = "radio_input">
                          
                          <Form.Check 
                            type = "checkbox" 
                            required = {isSelectedSocial ? false : true}  
                            disabled = {isFinalSubmit ? true : false}   
                            id = "linkedin-3" 
                            name = {item.mapId}  
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }   
                            label = "Linkedin" checked = {partCinputFields[0]["qc-010"]?.value?.field?.opt_3} 
                          />

                          <Form.Control
                            type = "text"
                            disabled = {isFinalSubmit ? true : false}
                            required = {isSelectedSocial?false:true} 
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            name = {item.mapId}
                            id = "linkedin-3"
                            value = {
                              partCinputFields[0]["qc-010"]?.value?.field?.text_3
                            }
                            placeholder = "Paste your url here"
                          />

                        </div>

                        <div className = "radio_input">

                          <Form.Check 
                            type = "checkbox" 
                            required = {isSelectedSocial ? false : true}  
                            disabled = {isFinalSubmit ? true : false}    
                            id = "others-4"  
                            name = {item.mapId}  
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }   
                            label = "Other"
                            checked = {partCinputFields[0]["qc-010"]?.value?.field?.opt_4} 
                          />
                          
                          <Form.Control
                            type = "text"
                            disabled = {isFinalSubmit ? true : false}
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            value = {
                              partCinputFields[0]["qc-010"]?.value?.field?.text_4
                            }
                            required = {isSelectedSocial?false:true} 
                            name = {item.mapId}
                            id = "others-4"
                            placeholder = "Paste your url here"
                          />

                        </div>

                      </div>

                    )}
                    
                    {item.mapId === "qc-011" && (
                      <>
                        <Form.Group className = "form_row" >
                          
                          <Form.Label>
                            Environmentally friendly packaging
                          </Form.Label>
                          
                          <div
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            checked={partCinputFields[0]["qc-011"]["value"]}
                          >
                            
                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_0-1"
                              name = {`0${item.mapId}`}
                              type = "radio"
                              label = "Yes"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_0 === "1" ? true : false}
                            />

                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_0-2"
                              name = {`0${item.mapId}`}
                              type = "radio"
                              label = "No"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_0 === "2" ? true : false}
                            />

                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_0-3"
                              name = {`0${item.mapId}`}
                              type = "radio"
                              label = "Dont know"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_0 === "3" ? true : false}
                            />

                          </div>

                        </Form.Group>

                        <Form.Group className = "form_row">
                          
                          <Form.Label>
                            Is the material biodegradable/green packaging?{" "}
                            <span className = "required">*</span>
                          </Form.Label>
                          
                          <div
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            checked={partCinputFields[0]["qc-011"]["value"]}
                          >
                            
                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_1-1"
                              name = {`1${item.mapId}`}
                              type = "radio"
                              label = "Yes"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_1 === "1" ? true : false}
                            />

                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_1-2"
                              name = {`1${item.mapId}`}
                              type = "radio"
                              label = "No"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_1 === "2" ? true : false}
                            />

                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_1-3"
                              name = {`1${item.mapId}`}
                              type = "radio"
                              label = "Dont know"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_1 === "3" ? true : false}
                            />

                          </div>

                        </Form.Group>

                        <Form.Group className = "form_row">
                          
                          <Form.Label>
                            Packaging meets standard specified by regulatory
                            body{" "}
                            <span className = "required">*</span>
                          </Form.Label>
                          
                          <div
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            checked={partCinputFields[0]["qc-011"]["value"]}
                          >

                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_2-1"
                              name = {`2${item.mapId}`}
                              type = "radio"
                              label = "Yes"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_2 === "1" ? true : false}
                            />

                            <Form.Check
                              required
                              disabled = {isFinalSubmit ? true : false}
                              id = "opt_2-2"
                              name = {`2${item.mapId}`}
                              type  = "radio"
                              label = "No"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_2 === "2" ? true : false}
                            />

                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_2-3"
                              name = {`2${item.mapId}`}
                              type = "radio"
                              label = "Dont know"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_2 === "3" ? true : false}
                            />

                          </div>

                        </Form.Group>

                        <Form.Group className = "form_row">
                          
                          <Form.Label>Is the package reusable?<span className = "required">*</span></Form.Label>
                          
                          <div
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            checked={partCinputFields[0]["qc-011"]["value"]}
                          >
                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_3-1"
                              name = {`3${item.mapId}`}
                              type = "radio"
                              label = "Yes"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_3 === "1" ? true : false}
                            />
                            
                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_3-2"
                              name = {`3${item.mapId}`}
                              type = "radio"
                              label = "No"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_3 === "2" ? true : false}
                            />

                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_3-3"
                              name = {`3${item.mapId}`}
                              type = "radio"
                              label = "Dont know"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_3 === "3" ? true : false}
                            />

                          </div>

                        </Form.Group>

                        <Form.Group className = "form_row">
                          
                          <Form.Label>
                            Does it follow packaging and labelling regulation in
                            India?{" "}
                            <span className = "required">*</span>
                          </Form.Label>
                          
                          <div
                            onChange = {(e) =>
                              handlePartcChange(e, item.mapId, item?._id)
                            }
                            checked={partCinputFields[0]["qc-011"]["value"]}
                          >
                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_4-1"
                              name = {`4${item.mapId}`}
                              type = "radio"
                              label = "Yes"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_4 === "1" ? true : false}
                            />
                            
                            <Form.Check
                              required
                              disabled = {isFinalSubmit ? true : false}
                              id = "opt_4-2"
                              name = {`4${item.mapId}`}
                              type = "radio"
                              label = "No"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_4 === "2" ? true : false}
                            />
 
                            <Form.Check
                              disabled = {isFinalSubmit ? true : false}
                              required
                              id = "opt_4-3"
                              name = {`4${item.mapId}`}
                              type = "radio"
                              label = "Dont know"
                              checked = {partCinputFields[0]["qc-011"]?.value?.field?.opt_4 === "3" ? true : false}
                            />

                          </div>
                          
                        </Form.Group>
                      </>
                    )}

                  </Form.Group>
                ))}

                <div className = "form_btns">
                  
                  <Button
                    type = "button"
                    className = "custom_btn white_border_btn me-3"
                    onClick={() => {
                      setIsBackClick({
                        isBackClick: true,
                        currentTab: "partC"
                      });
                      changeTab("partB")
                    }}
                  >
                    Back
                  </Button>

                  <Button
                    type = "submit"
                    className = "custom_btn brown_btn me-3"
                    // onClick={() => changeTab("partD")}
                  >
                    Next
                  </Button>
                  
                  {/* <Button type = "submit" className = "custom_btn brown_border_btn">
                    Save
                  </Button> */}
                
                </div>

              </Form>

            </div>
          </Tab>

          {/* Tab-D Content */}
          <Tab eventKey = "partD" title = "Part D">

            <div className = "inner_form">
            
              <Form noValidate validated = {partDvalidated} onSubmit = {savePartD}>
            
                {allQuestions?.slice(11, 17).map((item) =>

                  partDinputFields?.map((input, index) => (
                    
                    <Form.Group key = {index} controlId = "formTextarea" className = "form_row">
                      <Form.Label>{item.text} <span className = "required">*</span></Form.Label>
                      <Form.Control 
                        disabled = {isFinalSubmit ? true : false} 
                        required 
                        onChange = {(e) => handlePartdChange(e, index, item?._id)} 
                        name = {item.mapId}
                        value = {input[item.mapId.toString()]?.value?.field?.text !== "" ? input[item.mapId.toString()]?.value?.field?.text : ""}
                        as = "textarea"
                        placeholder = "Your text..."
                        style = {{ height: "80px" }}
                      />
                    </Form.Group>
                    
                  ))
                )}

                {
                  partOneAnswer && partOneAnswer?.introVideo !== "" ? (
                    <>
                      <Form.Label>Intro Video  (mp4, avi )</Form.Label>&nbsp;
                      <a target="_blank" href={partOneAnswer?.introVideo}>View Intro video</a>
                    </>

                  ):

                  (
                    <Form.Group  className = "form_row">
                      <Form.Label>Please Upload a Video Intro of why you should win this award (mp4, avi )</Form.Label>
                      <Form.Control disabled = {isFinalSubmit ? true : false} type = "file" onChange = {(e) => readUploadVideo(e, "video")} accept = ".mp4,.avi" />
                    </Form.Group>
                  )
                }, 

                <div className = "form_btns">
                  <Button type = "button" className = "custom_btn white_border_btn me-3" onClick={() => {
                    setIsBackClick({
                      isBackClick: true,
                      currentTab: "partD"
                    });
                    changeTab("partC");
                  }} >Back</Button>
                  <Button type = "submit" className = "custom_btn brown_btn">Submit</Button>
                </div>

              </Form>

            </div>

          </Tab>

        </Tabs>

      </div>

      <div className= {`popupContainer ${showPopup ? 'show' : ''}`} >
        <div className="popup">
            <img src = {tick} alt = "Success" />
            <h2>Questionnaire Saved !</h2>
            <p>To complete the nomination, Please send the samples</p>
            <div className="buttons">
                <button id="close" className="btn btns btn-dark" type="button"><a href = '/nominated'>Go to Questionnaire</a></button>
            </div>
        </div>
      </div>
      
    </div>
  );
}

export default Questionnaire;