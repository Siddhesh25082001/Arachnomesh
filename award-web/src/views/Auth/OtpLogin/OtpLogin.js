// Importing require modules and other requirements
import React, { useEffect, useState }  from 'react';
import { FloatingLabel, Form, Button} from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import user from '../../../store/action/user'

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Function to implement OTP Logic
function OtpLogin() {

  const [otp, setOtp] = useState("");
  const [isOtpSent,setIsOtpSent] = useState(false)
  const otpVerification = useSelector( (state ) => state.user.otpVerified)
  const userDetail = useSelector( (state) => state.user.userDetail)
  const [validated, setValidated] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const [mobile, setMobile] = useState(userDetail?.phone || "");

  const dispatch = useDispatch()
  const navigate = useNavigate();

  console.log("OTP Verification Responses", otpVerification);

  // Function to send otp to user
  const sendOtpToUser = () => {

    if(mobile !== "" && mobile.length === 10){
      
      setIsOtpSent(true);
      console.log("OTP Sent Successfully !")

      const mobileDetailObject = {
        number: mobile
      }
      dispatch(user.sendOtp(mobileDetailObject, showOtpSent))
    
    }
    else  toast.warn("Please Enter a Valid Mobile Number !")

  }

  // Function to verify otp
  const verifyOtp = () => {
    
    const loginDetailObject = {
      number: mobile,
      OTP: otp,
      id: userDetail.id
    }

    dispatch(user.verifyOtp(loginDetailObject))
  
  }

  // Function to confirm whether the otp is sent or not
  const showOtpSent = () => {
    toast.success("OTP Sent Successfully !")
  } 

  // Use Effect for OTP Verification
  useEffect(() => {

    console.log("OTP Verification", otpVerification)

    if(otpVerification === 1) {
      const loginObject = {
          phone: mobile,
          query: "insert"
      }
      dispatch(user.loginUser(loginObject))
    }

    if (otpVerification === -1) {
      toast.warn("Incorrect OTP !")
    }

    return () => dispatch(user.resetOtp())
   
  }, [otpVerification])

  // Use Effect for checking whether OTP entered is correct or not
  useEffect(() => {

    // If the otp send is correct, navigating the user to profile page
    if(userDetail && userDetail?.token && userDetail?.user?.tandc === "on")  navigate('/profile')
    // If the otp send is not correct, navigating the user back to register or login page
    else{

      if(userDetail && userDetail?.token && userDetail?.user?.tandc === "off" && userDetail?.user?.phone !== '')   navigate('/auth/register')
      else  navigate('/auth/login')

   }
  }, [userDetail])
  
  // Function that triggers on Submit Button to send otp to the user
  const handleSubmit = (event) => {
    
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false)   event.stopPropagation();
    else  sendOtpToUser();

    setValidated(true);
  
  };

  // Function that triggers on Verify button
  const handleOtpSubmit = (event) => {
    
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false)   event.stopPropagation();
    else  verifyOtp();

    setOtpValidated(true);
  
  };

  return (   
    
      <>

        <ToastContainer />
        
        {!isOtpSent &&

          <>
            <h6>Welcome back</h6>
            <Form noValidate validated={validated} onSubmit = {handleSubmit}>
            
              <FloatingLabel  controlId = "floatingInput" label = "Mobile number" className = "mb-1">
                <Form.Control required type = "phone" placeholder = "Mobile Number" value = {mobile} onChange = {(e) => setMobile(e.target.value)} />
                <Form.Control.Feedback type = "invalid">Mobile Number is Required.</Form.Control.Feedback>
              </FloatingLabel>
              
              <p className = 'warningTxt'>*Do not add 0 or +91 before your Mobile Number</p>
          
              <Button type = 'submit' className='custom_btn brown_btn w-100 mb-2' >Submit</Button>
            
            </Form>
          </>

        }
        
        {isOtpSent &&
          <>
            
            <h6>
              <span className = 'back' onClick={() => setIsOtpSent(false)} >
                <FiArrowLeft />
              </span> 
              Welcome back
            </h6>
            
            <Form noValidate validated = {otpValidated} onSubmit = {handleOtpSubmit}>
            
              <FloatingLabel controlId = "floatingInput" label = "Mobile number"  className = "mb-1">
                <Form.Control required type = "phone" placeholder = "Mobile Number" value = {mobile} onChange = {(e) => setMobile(e.target.value)} />
                <Form.Control.Feedback type = "invalid">Mobile number is Required</Form.Control.Feedback>
              </FloatingLabel>
              
              <p className = 'warningTxt'>*Do not add 0 or +91 before your Mobile Number</p>

              <FloatingLabel controlId = "floatingInput" label = "Enter your OTP" className = "mb-2">
                <Form.Control required type = "phone" placeholder = "Enter your OTP" value = {otp} onChange = {(e) => setOtp(e.target.value)} />
                <Form.Control.Feedback type = "invalid">OTP is Required</Form.Control.Feedback>
              </FloatingLabel>
          
              <p className = 'text-end'> <Button className = 'link_btn' variant = 'Link' onClick = {() => sendOtpToUser()}>Resend OTP</Button></p>

              <Button type = 'submit' className = 'custom_btn brown_btn w-100 mb-2' >Verify</Button>
        
            </Form>

          </>
        }

      </>
  );

}

// Exporting OTP Login Form
export default OtpLogin;