import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/loginActions";
import logo2 from "../../images/logo2.svg";
import "../../App.css";
import cookie from "react-cookies";
import { render } from "react-dom";

class SignedInNav extends Component {
    // const username = document.cookie.value;
    // console.log("USER:");
    // console.log(username);
    // console.log("PROPS _ ");
    // console.log(props);

    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <nav className="navbar fixed-top mainNavBar">
                <div className="container-fluid">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-10 mainNav_img ">
                                <Link to="/">
                                    <img src={logo2} alt="" />
                                </Link>
                            </div>
                            <div className="col-6 col-md-2 ">
                                <button
                                    onClick={this.props.signOut}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(signOut());
        },
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInNav);
