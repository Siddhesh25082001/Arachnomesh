// Importing the Requirements
import React, { useState, useEffect } from "react";
import { FloatingLabel, Form, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import storage from '../../services/localStorage';
import user from "../../store/action/user";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Function to Register for New Company
function Register() {

  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [tandc, setTAndC] = useState(false);
  const [base64, setBase64] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const userDetail = useSelector((state) => state.user.userDetail);
  const userProfile = useSelector((state) => state.user.userProfile);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  console.log("User Detail", userDetail);

  // Use Effect for Getting the current logged in user from local storage
  useEffect(() => {
  
    // Getting the user Id from local storage
    dispatch(user.getUserById({"_id": storage.getUserId()}))  
    
  }, [])

  // Use Effect for Setting each field of the New Registering Company 
  useEffect(() => {
    
    if (userProfile) {
      setFullName(userProfile?.name);
      setEmail(userProfile?.email);
      setCompanyName(userProfile?.companyName);
      setCompanyWebsite(userProfile?.website);
      setBase64Image(userProfile?.companyLogo)
      setBase64(userProfile?.companyLogo);
      userProfile?.tandc === "off" ? setTAndC(false) : setTAndC(true);
    }

  }, [userProfile]);

  // Function to update the Company profile
  const createUser = () => {

    let formData = new FormData();
    formData.append('companyLogo', base64)
    formData.append('name', fullName)
    formData.append('email', email)
    formData.append('companyName', companyName)
    formData.append('website', companyWebsite)
    formData.append('tandc', "on")
    formData.append('id', storage.getUserId())

    dispatch(user.createUser(formData, goToProfile));

  };

  // Function to navigate to the add nomination page
  const goToProfile = () => {
    console.log('Profile Created Successfully !'); 
    toast.success("Profile Created Successfully !")
    setTimeout(() => navigate('/addnominations'), 6000);
  }

  // Setting and Unsetting the Terms and Conditions Flag
  const onTermAndCondition = (flag) => {
    
    if (flag === "false") {
      setTAndC(true);
      console.log("Term and Conditions Accepted !");
    }
    else {
      setTAndC(false);
      console.log("Term and Conditions Not Accepted !");
    }

  };

  // Function to upload the files (Here, the Company Logo)
  const readUploadFile = (event) => {

    const fileName = event.target.files[0].name;
    
    let fileSizeInMB = event.target.files["0"].size / 1024;
    fileSizeInMB = fileSizeInMB / 1024;
    
    let fileFormat = event.target.files["0"].name.split(".")[1];

    // Only following types of files are supported
    if (fileFormat !== "jpg" && fileFormat !== "png" && fileFormat !== "jpeg") {
      toast.warning("File Format Not Supported !");
      return;
    }

    // Restricting the size of the file
    if (fileSizeInMB > 10) {
      toast.warning("Maximum file size allowed is 10MB");
      return;
    }

    // To prevent the default events
    event.preventDefault();

    if (event.target.files) {

      setBase64(event.target.files[0]);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const data = e.target.result;
        setBase64Image(data);      
      };
      
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Function to Handle Submit Action
  const handleSubmit = (event) => {

    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false)   event.stopPropagation();
    else                                  createUser();

    setValidated(true);
  };

  // Register UI 
  return (
    <>
      <Container>

        <ToastContainer />

        <div className = "loginDiv">
        
          <h2>Sign Up</h2>
          <h6>Register</h6>

          <Form noValidate validated = {validated} onSubmit = {handleSubmit}>

            {/* Name */}
            <FloatingLabel controlId = "floatingInput" label = "Name*" className = "mb-4">
              <Form.Control required type = "text" placeholder = "Name" value = {fullName} onChange = {(e) => setFullName(e.target.value)} />
              <Form.Control.Feedback type = "invalid">
                Please Enter your Name
              </Form.Control.Feedback>
            </FloatingLabel>

            {/* Email */}
            <FloatingLabel controlId = "floatingInput" label = "Email address*" className = "mb-4">
              <Form.Control required type = "text" placeholder = "Email address" value = {email} onChange = {(e) => setEmail(e.target.value)} />
              <Form.Control.Feedback type = "invalid">
              Please Enter your Email
              </Form.Control.Feedback>
            </FloatingLabel>

            {/* Company Name */}
            <FloatingLabel controlId = "validationCustom03" label = "Company name*" className = "mb-4">
              <Form.Control required type = "text" placeholder = "Company name" value = {companyName} onChange = {(e) => setCompanyName(e.target.value)} />
              <Form.Control.Feedback type = "invalid">
              Please Enter your Company Name
              </Form.Control.Feedback>
            </FloatingLabel>

            {/* Company Website */}
            <FloatingLabel controlId = "floatingInput" label = "Company website*" className = "mb-4">
              <Form.Control required value = {companyWebsite} onChange = {(e)=>setCompanyWebsite(e.target.value)} type = "text" placeholder = "Company Website" />
              <Form.Control.Feedback type = "invalid">
              Please Enter your Company Website
              </Form.Control.Feedback>
            </FloatingLabel>

            {/* File Upload */}
            <Form.Group controlId = "companylogo" className = "mb-4 custom_file text-center">
              <Form.Label>Upload Company Logo ( jpg, png ).</Form.Label>
              <Form.Control type = "file"  onChange = {(e) => readUploadFile(e)}/>
            </Form.Group>
            {base64Image&&base64Image!==""&&
              <div className = "user_img text-center mb-4">
              <img src = {base64Image} className = "img_icon" alt="user" />
            </div>}

            {/* Terms and Conditions */}
            <Form.Group controlId = "formFile" className = "mb-4 ">
              <input  required  value = {tandc} onChange = {(e) => onTermAndCondition(e.target.value)}  type = "checkbox" />
              <label>
                &nbsp; I accept the <a href = "https://awards.channelier.com/privacy-policy.html"> Privacy Policy </a>and <a href = "https://awards.channelier.com/terms-use.html">Terms of Use</a> 
              </label>
              <Form.Control.Feedback type = "invalid">
                 Please accept Terms and Condition
              </Form.Control.Feedback>
            </Form.Group>

            <Button type = "submit" className = "custom_btn brown_btn w-100 mb-2">
              Submit
            </Button>

          </Form>
        </div>

      </Container>
    </>
  );
}

// Exporting the Register UI
export default Register;