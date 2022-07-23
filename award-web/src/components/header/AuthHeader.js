// Importing the Requirements
import { React, useEffect } from 'react';
import logo from "../../assets/img/logo.png";
import {Navbar, Nav, NavDropdown  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import user from '../../store/action/user';
import { useDispatch,useSelector } from 'react-redux';

// Authentication Header Function
function AuthHeader() {

  const location = useLocation()
  const url = location.pathname

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);

  // Function to Logout User
  const logoutUser = () => {
    dispatch(user.logoutUser())
  }

  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
        window.removeEventListener('scroll', isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {

      const header = document.querySelector('.header');
      const scrollTop = window.scrollY;
    
      if (scrollTop >= 200) {
        
        const navbar = document.querySelector('#basic-navbar-nav');
        console.log(navbar.classList);
        
        if (navbar.classList.contains("show")) {
          navbar.classList.remove("show")
          return
        }
        
        header.classList.add('is-sticky')
      }
      
      else{
        header.classList.remove('is-sticky');
      }
    
  };

  // Authentication Header UI
  return (   

      <Navbar className = 'header' expand = "lg">
        <Navbar.Brand href="#home"> <img src = {logo} alt = "logo" className = 'Logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls = "basic-navbar-nav" />
        <Navbar.Collapse id = "basic-navbar-nav">
        <Nav className = {`navlinks ${url.includes("/home") ? "text-white" : "text-black"}`}>
            <Nav.Link href = "https://awards.channelier.com/?login=true">Home</Nav.Link>
            <Nav.Link href = "https://awards.channelier.com/#2021/?login=true">2021</Nav.Link>
            <Nav.Link href = "https://awards.channelier.com/#section-about/?login=true">About</Nav.Link>
            <Nav.Link href = " https://awards.channelier.com/#benefit-sec/?login=true">Benefits</Nav.Link>  
            <Nav.Link href = "https://awards.channelier.com//?login=true">Categories</Nav.Link>  
            <Nav.Link href = "https://awards.channelier.com/#footer/?login=true">Contact</Nav.Link> 
            
            <NavDropdown title = "Profile" className = 'cstom-dropdown' id = "basic-nav-dropdown">
            <NavDropdown.Item as = {Link} to="/profile">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href = "#">{userDetail?.user?.companyName}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick = {() => logoutUser()}>Logout</NavDropdown.Item>
          </NavDropdown>    
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default AuthHeader;
