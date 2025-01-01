import React from 'react';
import {  createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from './pages/Home_Components/Home';
import SignUp from './pages/admin/SignUpp';
import NotFoundPage from './pages/NotFoundPage';
import SignupVerify from './pages/admin/SignupVerify';
import SignupDetails from './pages/admin/SignupDetails';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';


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
  }
  ]);
  

function App() {
    
    return <RouterProvider router={router} />;
}

export default App;