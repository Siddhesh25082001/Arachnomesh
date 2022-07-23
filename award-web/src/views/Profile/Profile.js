// Importing the Requirements
import { React, useState,useEffect } from "react";
import { FloatingLabel, Form, Button, Toast } from "react-bootstrap";
import user from '../../store/action/user'
import { useDispatch, useSelector } from "react-redux";
import storage from '../../services/localStorage';
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Function to Display the Profile details
function Profile() {

  const [showA, setShowA] = useState(false);
  
  const [firstName, setFirstName] = useState( "")
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("")
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [base64, setBase64] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [validated, setValidated] = useState(false);
  
  const userProfile = useSelector((state) => state.user.userProfile)
  const userDetail = useSelector((state) => state.user.userDetail);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toggleShowA = () => setShowA(!showA);

  // Use Effect for Getting the current logged in user from local storage
  useEffect(() => {
  
    // Getting the user Id from local storage
    dispatch(user.getUserById({"_id": storage.getUserId()}))  
    
  }, []);

  useEffect(() => {

    console.log("User Detail on Profile Page", userDetail);
    if(userDetail.isMobileUpdated === true) {
      navigate('/login', userDetail);
    }
    
  });

  // Use Effect for Setting each field of the New Registering Company 
  useEffect(() => {

    if(userProfile){
      setFirstName(userProfile?.name)
      setEmail(userProfile?.email)
      setPhone(userProfile?.phone)
      setCompanyName(userProfile?.companyName)
      setCompanyWebsite(userProfile?.website)
      setBase64Image(userProfile?.companyLogo)
      setBase64(userProfile?.companyLogo)
    }

  }, [userProfile])
  
  // Function to update the Company profile
  const updateUser = () => {
    
    let formData = new FormData();
    formData.append('companyLogo', base64)
    formData.append('name', firstName)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('companyName', companyName)
    formData.append('website', companyWebsite)
    formData.append('tandc', "on")
    formData.append('id', storage.getUserId())

    let oldNumber = (typeof userDetail.user === 'undefined') ? userDetail.phone : userDetail.user.phone;
    let newNumber = phone;

    // Previous and New Phone Numbers are same 
    if (oldNumber === newNumber) {
      dispatch(user.updateUser(formData, notification));
    }

    // Previous and New Phone Numbers are different
    else {
      dispatch(user.updateUser(formData));
    }

  };

  // Function to Handle Submit Action
  const handleSubmit = (event) => {

    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false)   event.stopPropagation();
    else                                  updateUser();

    setValidated(true);
  };

  // Function to navigate to the add nomination page
  const notification = () => {
    toast.success("Profile Updated Successfully!")
    setTimeout(() => navigate('/addnominations'), 6000);
  }

  // Function to upload the files (Here, the Company Logo)
  const readUploadFile = (event) => {

    const fileName = event.target.files[0].name;
    
    let fileSizeInMB = event.target.files["0"].size / 1024;
    fileSizeInMB = fileSizeInMB / 1024;
    
    let fileFormat = event.target.files["0"].name.split(".")[1];

    // Only following types of files are supported
    if (fileFormat !== "jpg" && fileFormat !== "png" && fileFormat !== "jpeg") {
      toast.warn("File format not supported !");
      return;
    }

    // Restricting the size of the file
    if (fileSizeInMB > 10) {
      toast.warn("Maximum file size allowed is 10MB !");
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

  // Profile UI
  return (  

    <div className="nominee_workflow">

        <ToastContainer />

        <h4 className="mb-4">My Profile</h4>

        <div className="personal_details">

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
          
            <div className="inner_form">
        
              {/* Name */}
              <FloatingLabel controlId = "floatingInput" label = "Name*" className = "mb-4">
                <Form.Control required type = "text" placeholder = "Name" value = {firstName} onChange = {(e) => setFirstName(e.target.value)} />
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

              {/* Phone Number */}
              <FloatingLabel controlId="floatingInput" label="Mobile number*" className="mb-4">
                <Form.Control required value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" placeholder="Mobile Number" />
                <Form.Control.Feedback type="invalid">
                  Please Enter your Mobile Number
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
                <Form.Label>Upload Company Logo ( jpg, png, jpeg ).</Form.Label>
                <Form.Control type = "file"  onChange = {(e) => readUploadFile(e)}/>
              </Form.Group>
              {base64Image&&base64Image!==""&&
                <div className = "user_img text-center mb-4">
                <img src = {base64Image} className = "img_icon" alt="user" />
              </div>}

              <div className="form_btns text-center">
                <Button type="button" className="custom_btn cancel_btn me-2">
                  Cancel
                </Button>
                <Button  type="submit" className="custom_btn brown_btn">
                  Save
                </Button> 
              </div>

          </div>
        </Form>
      </div>  
  </div>

  );
}

// Exporting Profile UI
export default Profile;