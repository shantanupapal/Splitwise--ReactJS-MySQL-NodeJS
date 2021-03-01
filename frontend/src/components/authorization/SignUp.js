import MainNavbar from "../layout/MainNavbar";
import "../../App.css";
import centerlogo from "../../images/centerlogo.svg";
import React, { Component } from "react";

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    };
    render() {
        return (
            <div>
                <MainNavbar />
                <div className="container h-100 d-flex justify-content-center signUpMain">
                    <div className="row align-items-center">
                        <div className="col forMainLogo">
                            <img src={centerlogo} alt="" />
                        </div>
                        <div className="col">
                            <div className="welcomeName">
                                <p>Introduce Yourself</p>{" "}
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group formForSignup">
                                    <label htmlFor="name">
                                        Hi there! My name is
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group formForSignup">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group formForSignup">
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
                                    Sign up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
