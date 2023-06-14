import React from 'react'
import { useState } from 'react';
import authService from './auth/authServices';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    
     const [userData,setUserData] = useState({
        name:"",
        email:"",
        password:"",
        mobileNumber:""
     })

  const [formErrors , setFormsErrors] = useState({});

  const navigate = useNavigate();


  function handleOnChange(e){
      const {name,value }= e.target
      setUserData((prev)=>{
        return {...prev,[name]:value}
      })
  }



  const handleSignup =async (e) => {
    e.preventDefault();
    let errors ={}
    if(!userData.name){
        errors.name = "name is required !!"
    }
    if(!userData.email){
        errors.email = "email is required !!"
    }
    if(!userData.password){
        errors.password = "password is required !!"
    }
    if(userData.password.length < 5){
        errors.password = "password must be 5 charactors long"
    }
    if(!userData.mobileNumber ){
        errors.mobileNumber = "mobile number is required !!"
    }
    setFormsErrors(errors);
    if(Object.keys(errors).length  > 0){
        return ;
    }
    console.log(userData)
    const data = await authService.signup(userData);
    console.log(data)
    if(data.token){
        navigate("/")
    }
  };

  return (
    <div className="row mt-5">
		<div className="col-md-4 offset-md-4">

			<form onSubmit={handleSignup} id="forms">
				<div>
					<label for="Email1" className="form-label ">Name </label> 
                    <input type="text" name="name" className="form-control" id="name"
                     value={userData.name}
                     onChange={handleOnChange}
                    />
					<div id="name-error" style={{color:"red"}}>{formErrors.name}</div>
				</div>
				<div>
					<label for="phone" className="form-label ">Phone Number </label> <input
						type="number" name="mobileNumber" className="form-control" id="phone"
                        value={userData.mobileNumber}
                        onChange={ handleOnChange}
                        />
					<div id="mobile-error" style={{color:"red"}} >{formErrors.mobileNumber}</div>
				</div>
				<div>
					<label for="email" className="form-label ">Email </label> <input
						type="email" name="email" className="form-control" id="email"
                        value={userData.email}
                        onChange={handleOnChange}
                        />
					<div id="email-error" style={{color:"red"}}>{formErrors.email}</div>
				</div>
				<div>
					<label for="password" className="form-label ">Password </label> <input
						type="password" name="password" className="form-control" id="password"
                        value={userData.password}
                        onChange={handleOnChange}
                        />
					<div id="password-error" style={{color:"red"}}>{formErrors.password}</div>
				</div>

				<div className="container text-center mt-4">
					<button type="submit"  name="action"
						className="btn btn-primary">SignUp</button>
				</div>
			</form>
		</div>


	</div>
  )
}

export default SignUp
