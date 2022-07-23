import React ,{useEffect,useState} from 'react';
import './assets/css/custom.css';
import Router from './routes';
import user from './store/action/user'
import { useDispatch,useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function App() {
  const isLoggedin=useSelector((state)=>state.user.isLoggedIn)
 
  
  const dispatch=useDispatch();
  useEffect(() => {
   dispatch(user.getUser())
  }, [])

  const [isLogged,setIsLogged]=useState();

    useEffect(() => {
     setIsLogged(isLoggedin)
    }, [isLoggedin])
    const routing = useRoutes(Router((isLogged)));

  
 
  return (
    <>
    {routing}
    </>
  );
}

export default App;
