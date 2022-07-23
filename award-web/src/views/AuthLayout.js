import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AuthHeader from "../components/header/AuthHeader";
import Sidebar from "../components/sidebar/Sidebar";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const AuthLayout = () => {
  const location = useLocation();
  const url = location.pathname;

 return(
  
  <div className={!url.includes("/auth") ? 'main' : 'main homepage'}>
      
      <ToastContainer />
      
      { !url.includes("/auth") && url!=='/' &&
        <Sidebar/>
      }
      
    <div className='rightsidebar'>
        <AuthHeader/>
        <Outlet /> 
    </div>
    </div>
  );
};

export default AuthLayout;
