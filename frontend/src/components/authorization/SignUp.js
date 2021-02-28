import MainNavbar from "../layout/MainNavbar";
import "../../App.css";
import centerlogo from "../../images/centerlogo.svg";

const SignUp = () => {
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
                        <form action="">
                            <div className="form-group formForSignup">
                                <label htmlFor="name">
                                    Hi there! My name is
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                />
                            </div>
                            <div className="form-group formForSignup">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                />
                            </div>
                            <div className="form-group formForSignup">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                />
                            </div>
                            <button
                                type="submit"
                                class="btn btn-danger submitButton"
                            >
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
