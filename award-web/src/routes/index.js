// Importing all the requirements
import AddNominations from "../views/AddNomination/AddNominations";
import Login from "../views/Auth/Login/Login";
import SignUp from "../views/Auth/SignUp/SignUp";
import Cart from "../views/Cart/Cart";
import Checkout from "../views/Checkout/Checkout";
import Nominated from "../views/Nominated/Nominated";
import Register from "../views/Register/Register";
import Profile from "../views/Profile/Profile";
import Home from "../views/Home";
import { Navigate } from "react-router-dom";
import BlankLayout from "../views/BlankLayout";
import AuthLayout from "../views/AuthLayout";
import { useSelector } from "react-redux";
import Questionnaire from "../views/Questionnaire/Questionnaire";
import Policy from "../views/Policy/Policy";
import Terms from "../views/Policy/Terms";

// Exporting the Router
export default function Router(isLoggedin) {
    
    const isLoggedOut = useSelector((state) => state.user.isLoggedOut)
    console.log("Is the User Logged In", isLoggedin);
    console.log("Is the User Loggout", isLoggedOut);

    if(!isLoggedin && isLoggedOut){
        window.location.href="https://awards.channelier.com/"
    }
    
    let element = [
        {
            element:isLoggedin?<AuthLayout/>:isLoggedOut?<Navigate to="/auth/home"/>:<BlankLayout />,
            path:"/",
            children: [
                { path: "/", element: <Navigate to="/auth/home"/> },
                { path: "profile", element: <Profile /> },
                { path: "addnominations", element: <AddNominations /> },
                { path: "cart", element: <Cart /> },
                { path: "nominated", element: <Nominated /> },
                { path: "checkout", element: <Checkout /> },
                { path: "questionnaire", element: <Questionnaire/> },
                { path : "login", element: <Login />}
            ],
        },
        {
            element:isLoggedin?<AuthLayout/>:<BlankLayout />,
            path:"/auth",
            children: [
                { path: "home", element: <Home /> },
                { path: "login", element: <Login /> },
                { path: "signup", element: <SignUp /> },
                { path: "register", element: <Register /> },
                { path: "policy", element: <Policy/> },
                { path: "terms", element: <Terms/> },
              
            ],
        },
       
    ];
 
    return element;
}
