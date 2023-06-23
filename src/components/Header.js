import React from "react";
import authService from "./auth/authServices";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SearchBox from "./SearchBox";

const Header = () => {
  let userLoggedIn = authService.getCurrentUser();
  const cart = useSelector((state) => state.cart);
  let data = {};
  if (userLoggedIn) {
    data = jwt_decode(userLoggedIn.token);
  }

  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    authService.logout();
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
          <Link className="navbar-brand" to="/">
            Shoping App
          </Link>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
              <Link className="nav-link"  to='/'>Products</Link>
              </li> */}

              <li className="nav-item">
                <SearchBox/>
              </li>

              {userLoggedIn && data.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    {" "}
                    Admin Panel{" "}
                  </Link>
                </li>
              )}
              {/* 
              <li className="nav-item"><Link  className="nav-link" to='/orders'>Orders</Link>
              </li> */}
            </ul>

           
             
             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                    {cart.length && (
                      <span className="badge bg-danger">
                        {cart.length && cart.length}
                      </span>
                    )}
                  </Link>
                </li>

            {userLoggedIn && 
              

                <li className="nav-item">
                <NavDropdown
              id="nav-dropdown-dark-example"
              title={userLoggedIn.username}
              menuVariant="dark"
            >
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/orders">
                orders
              </NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
               logout
              </NavDropdown.Item>
            </NavDropdown>

                </li>
                }
              

              {!userLoggedIn && 
                <div className="d-flex align-items-center">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                </div>
            }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
