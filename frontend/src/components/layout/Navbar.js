import React from "react";
import "./Navbar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav class="navbar fixed-top">
            <div class="container-fluid">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-10 nav_img ">
                            <img src={logo} alt="" />
                            <Link to="/" className="nav_name">
                                <span>Splitwise</span>
                            </Link>
                        </div>
                        <div className="col-6 col-md-2 ">
                            <Link to="/Login" className="login_name">
                                <span>Log in</span>
                            </Link>
                            <Link to="/Signup" className="signup_name">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
