import MainNavbar from "../layout/MainNavbar";
import "../../App.css";
import centerlogo from "../../images/centerlogo.svg";
import LeftSideBar from "../layout/LeftSideBar";

const Login = () => {
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
                        <form action="">
                            <div className="form-group formForLogin">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                />
                            </div>
                            <div className="form-group formForLogin">
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
                                Log in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
