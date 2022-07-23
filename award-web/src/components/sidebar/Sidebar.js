// Importing the requirements
import React from "react";
import { NavItem } from "react-bootstrap";
import logo from "../../assets/img/logo-channelier.png";
import { FaUser, FaShoppingCart, FaPlus, FaAward } from 'react-icons/fa';
import { NavLink} from "react-router-dom";

// Sidebar Function
function Sidebar() {

  // Sidebar UI
  return (

    <div className="sidebar">
    
      <div className="sidebar_logo">
       <img src={logo} alt="logo" className='logo'/> 
      </div>
    
      <NavItem>
    
        <NavLink to="/profile"  className="nav-link">
         <span><FaUser /></span>
         <span>Profile</span>
        </NavLink>

        <NavLink to="/addnominations"  className="nav-link">
         <span><FaPlus /></span>
         <span>Add Nominations</span>
        </NavLink>

        <NavLink to="/checkout" className="nav-link">
         <span><FaShoppingCart /></span>
         <span>Cart</span>
        </NavLink>

        
        <NavLink to="/nominated"  className="nav-link">
         <span><FaAward /></span>
         <span>Nominated</span>
        </NavLink>


      </NavItem>
    </div>
  );
}

export default Sidebar;
