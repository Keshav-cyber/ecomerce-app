import React from 'react'
import authService from './auth/authServices'
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const CheckAdmin = () => {
  console.log("check admin");
  let user = authService.getCurrentUser();
  if(!user){
    return <Navigate to="/login" />
  }
  let data = jwt_decode(user.token);
  console.log(data)
  
  if(data.role !== "admin"){
    authService.logout();
    return  Navigate("/login")
  }
  return <Outlet />
}

export default CheckAdmin
