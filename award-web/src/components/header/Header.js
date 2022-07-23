// Imports the requirements
import React, { useEffect, useRef, useState } from 'react';
import logo from "../../assets/img/logo.png";
import {Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Header Function
function Header() {

 const location = useLocation()
 const url = location.pathname

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
      scrollTop >= 200 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
  };

  // Header UI
  return (   

      <Navbar expand = "lg" className = 'header'>
        <Navbar.Brand href = "https://awards.channelier.com"> <img src = {logo} alt = "Logo" className = 'logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`navlinks ${url.includes("/home") ? "text-white" : "text-black"}`}>
          <Nav.Link href = "https://awards.channelier.com/?login=false">Home</Nav.Link>
             <Nav.Link href = "https://awards.channelier.com/#2021/?login=false">2021</Nav.Link>
            <Nav.Link href = "https://awards.channelier.com/#section-about/?login=false">About</Nav.Link>
            <Nav.Link href = "https://awards.channelier.com/#benefit-sec/?login=false">Benefits</Nav.Link>  
            <Nav.Link href = "https://awards.channelier.com/false/?login=false">Categories</Nav.Link>  
            <Nav.Link href = "https://awards.channelier.com/#footer/false/login=false">Contact</Nav.Link> 
            <Nav.Link href = "/auth/login">Login</Nav.Link>              
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
