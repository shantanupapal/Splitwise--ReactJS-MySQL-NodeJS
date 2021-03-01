import MainNavbar from "../layout/MainNavbar";
import "../../App.css";
import centerlogo from "../../images/centerlogo.svg";
import React, { Component } from "react";
import { connect } from "react-redux";
import { logIn } from "../../store/actions/loginActions";

class Login extends Component {
    state = {
        username: "", //email
        password: "",
    };

    handleChange = (e) => {
        // console.log(this.state);
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.logIn(this.state);
    };
    render() {
        const { authError } = this.props;
        const { loggedIn } = this.props;
        return (
            <div>
                <MainNavbar />
                <div className="container h-100 d-flex justify-content-center loginMain">
                    <div className="row align-items-center">
                        <div className="col forMainLogo">
                            <img src={centerlogo} alt="" />
                        </div>
                        <div className="col">
                            <div className="welcomeName">
                                <p>Welcome to Splitwise</p>{" "}
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group formForLogin">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group formForLogin">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-danger submitButton"
                                >
                                    Log in
                                </button>
                                <div>
                                    {authError ? <p>{authError}</p> : null}
                                    {loggedIn ? (
                                        <p>LoggedIn</p>
                                    ) : (
                                        <p>NotLoggedIn</p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        loggedIn: state.auth.loggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (credentials) => dispatch(logIn(credentials)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
