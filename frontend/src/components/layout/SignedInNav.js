import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/loginActions";
import "../../App.css";
const SignedInNav = (props) => {
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
                            <button
                                onClick={props.signOut}
                                className="mainNavLogin_name"
                            >
                                <span>Log out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(signOut());
        },
    };
};

export default connect(null, mapDispatchToProps)(SignedInNav);
