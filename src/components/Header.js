import React from "react";
import authService from "./auth/authServices";
import { Link,useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const Header = () => {

  let userLoggedIn = authService.getCurrentUser();
  let data = {}
  if(userLoggedIn){
    data = jwt_decode(userLoggedIn.token)
  }

  const navigate = useNavigate();

  function handleLogout(e){
    e.preventDefault();
    authService.logout();
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link  className="navbar-brand"  to='/'>Shoping App</Link>
            
          
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link className="nav-link"  to='/'>Products</Link>
              </li>

              {userLoggedIn && data.role==="admin" &&<li className="nav-item">
                <Link className="nav-link" to='/admin'> Admin Panel </Link>
              </li>}

              <li className="nav-item"><Link  className="nav-link" to='/orders'>Orders</Link>
              </li>
            </ul>

           {!userLoggedIn && <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                 <Link  className="nav-link"  to='/login'>Login</Link>
                  
              </li>
              <li className="nav-item">
              <Link className="nav-link"   to='/signup'>Signup</Link>
              </li>
            </ul>}

           {userLoggedIn &&  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">

                <a href="" className="nav-link" >{userLoggedIn.username}</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  logout
                </button>
              </li>
            </ul>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
