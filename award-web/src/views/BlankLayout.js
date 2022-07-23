import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const BlankLayout = () => (
  <div className="homepage">
    <ToastContainer />
    <Header/>
    <Outlet />
  </div>
);

export default BlankLayout;
