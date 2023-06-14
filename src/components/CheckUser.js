import React from 'react'
import authService from './auth/authServices'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const CheckUser = () => {

  let user = authService.getCurrentUser();
  let navigate = useNavigate();
  console.log("check user")
  if(!user){
    return <Navigate to="/login"/>
  }

  return <Outlet />
}

export default CheckUser
