// Importing Requirements
import React  from 'react';
import { Container } from 'react-bootstrap';
import OtpLogin from '../OtpLogin/OtpLogin';
import { useDispatch,useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Function to Render the Login Form
function Login() {

  const userDetail = useSelector( (state) => state.user.userDetail)

  return (   
    <Container>
      <ToastContainer />
      
      <div className='loginDiv'> 
        { userDetail.isMobileUpdated ? <h2>Update Mobile Number</h2> : <h2>Login</h2> }
        <OtpLogin/>
      </div>
     </Container>
  );

}

// Exprting the Login Function
export default Login;