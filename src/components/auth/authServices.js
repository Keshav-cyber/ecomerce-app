import axios from "axios";


const API_URL = "https://gclouddemo-384110.uc.r.appspot.com/r";

const signup = async({name, email, password,mobileNumber}) => {

    
  let response = await axios
    .post(API_URL + "/signup", {
      email,
      password,
      name,
      mobileNumber
    })
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (email, password) => {
  let params ={
    email,password
  }
  const response = await axios
        .post(API_URL + "/login", {}, {
            params
        });
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
   return response.data;
};

const logout = () => {
  console.log('item removed')
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;