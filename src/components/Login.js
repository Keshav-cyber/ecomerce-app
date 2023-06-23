
import React from 'react'
import { useState } from 'react';
import authService from './auth/authServices';
import {  useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors,setLoginErrors] = useState({});

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let errors ={}
      if (email === "" ) { 
           errors.email ="please enter your email !!"
      }if(password === ""){
        errors.password = "please enter your password !!"
      }
      setLoginErrors(errors);
      if (Object.keys(errors).length > 0) {
        return;
      }
      await authService.login(email,password).then(val =>  navigate("/")).catch(err=>console.log(err))
      
      
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="row mt-5">
        <div className="col-md-4 offset-md-4">
   
           <form  onSubmit={handleLogin} >
           <div>
                <label for="Email1" className="form-label ">Email </label> 
                <input type="email" name = "email" className="form-control" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)}/> 
                    <div id="email-error" style={{color:"red"}} >{loginErrors.email}</div>
            </div>
            <div>
                 <label for="password" className="form-label ">Password </label>
                 <input type="password" name = "password" className="form-control" id="password"  value={password}
                 onChange={(e) => setPassword(e.target.value)} />
                 <div id="password-error" style={{color:"red"}}>{loginErrors.password}</div>
            </div>

            <div className="container text-center mt-4">
                <button type="submit" className="btn btn-warning">Login</button>
            </div>
           </form>
       </div>
    </div>
  )
}

export default Login
