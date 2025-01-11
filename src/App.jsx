import React from 'react';
import {  createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from './pages/Home_Components/Home';
import SignUp from './pages/signup/SignUpp';
import NotFoundPage from './pages/NotFoundPage';
import SignupVerify from './pages/signupVerify/SignupVerify';
import SignupDetails from './pages/signupDetails/SignupDetails';
import Login from './pages/login/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin-login/AdminLogin';
import Classrom from './pages/classroom/Classroom';


const router = createBrowserRouter([{
    path:"/",
    element: <Home/> ,
    errorElement: <NotFoundPage/>  
  },
  {
    path:"/signup",
    element: <SignUp/>
  },
  {
    path:"/signup-verify",
    element: <SignupVerify/>
  },
  {
    path:"/signup-details",
    element: <SignupDetails/>
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/admin-login",
    element:<AdminLogin/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/classroom",
    element:<Classrom/>
  }

  ]);
  

function App() {
    
    return <RouterProvider router={router} />;
}

export default App;