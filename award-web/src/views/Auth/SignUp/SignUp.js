// Importing the Requirments
import React  from 'react';
import { Container} from 'react-bootstrap';
import OtpLogin from '../OtpLogin/OtpLogin';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Function to Render the Sign Up Form
function SignUp() {

  return (   
  
    <Container>
      <ToastContainer />
      <div className='loginDiv'>
        <h2>Sign Up</h2>
        <h6>Register</h6>
        <OtpLogin/>
        <p className='signupTxt'>Already have an account? <a href="/auth/login">Login</a></p>
      </div>
    </Container>
    
  );

}

// Exporting the Sign Up Function
export default SignUp;