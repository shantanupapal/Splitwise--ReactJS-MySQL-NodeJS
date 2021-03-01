import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
const SignedInNav = () => {
    return (
        <nav className="navbar fixed-top mainNavBar">
            <div className="container-fluid">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-10 mainNav_img ">
                            <NavLink to="/">
                                <p>Username Dropdown</p>
                            </NavLink>
                        </div>
                        <div className="col-6 col-md-2 ">
                            <NavLink to="/" className="mainNavLogin_name">
                                <span>Log out</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SignedInNav;
