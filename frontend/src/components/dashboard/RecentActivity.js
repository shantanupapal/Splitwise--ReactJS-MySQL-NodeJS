import React, { Component } from "react";
import LeftSideBar from "../layout/LeftSideBar";
import MainNavbar from "../layout/MainNavbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import backServer from "../../webConfig";

class RecentActivity extends Component {
    componentDidMount = () => {
        // const { loggedIn } = this.props;
        const name = localStorage.getItem("name");
        if (localStorage.getItem("user_id") === "undefined") {
            Axios.post(`${backServer}/senduserid`, { name: name })
                .then((response) => {
                    console.log("USED- ID: ", response.data);
                    localStorage.setItem("user_id", response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    render() {
        // console.log("Props");
        // console.log(this.props);
        const { loggedIn } = this.props;
        if (!loggedIn) return <Redirect to="/Login" />;
        const currency = localStorage.getItem("currency").split(" ")[0];
        // console.log(currency);
        const name = localStorage.getItem("name");
        let recent;
        if (name === "Michael") {
            recent = (
                <div>
                    <div
                        style={{
                            borderBottom: "1px solid #eee",
                            lineHeight: "30px",
                            padding: "5px",
                        }}
                    >
                        <span style={{ fontWeight: "bold" }}>You</span> added{" "}
                        <span style={{ fontWeight: "bold" }}>
                            "Food Arrangements"
                        </span>{" "}
                        to{" "}
                        <span style={{ fontWeight: "bold" }}>
                            "Farewell Party"
                        </span>
                        <br />
                        <span style={{ color: "#56d4b9" }}>
                            You get {currency}6.25
                        </span>
                    </div>

                    <div
                        style={{
                            borderBottom: "1px solid #eee",
                            lineHeight: "30px",
                            padding: "5px",
                        }}
                    >
                        <span style={{ fontWeight: "bold" }}>Logan Griffo</span>{" "}
                        added{" "}
                        <span style={{ fontWeight: "bold" }}>"Gifts"</span> to{" "}
                        <span style={{ fontWeight: "bold" }}>
                            "Farewell Party"
                        </span>
                        <br />
                        <span style={{ color: "#ff652f" }}>
                            You owe {currency}32.25
                        </span>
                    </div>
                </div>
            );
        }
        if (name === "Logan Griffo") {
            recent = (
                <div>
                    <div
                        style={{
                            borderBottom: "1px solid #eee",
                            lineHeight: "30px",
                            padding: "5px",
                        }}
                    >
                        <span style={{ fontWeight: "bold" }}>Michael</span>{" "}
                        added{" "}
                        <span style={{ fontWeight: "bold" }}>
                            "Food Arrangements"
                        </span>{" "}
                        to{" "}
                        <span style={{ fontWeight: "bold" }}>
                            "Farewell Party"
                        </span>
                        <br />
                        <span style={{ color: "#ff652f" }}>
                            You owe {currency}6.25
                        </span>
                    </div>

                    <div
                        style={{
                            borderBottom: "1px solid #eee",
                            lineHeight: "30px",
                            padding: "5px",
                        }}
                    >
                        <span style={{ fontWeight: "bold" }}>You</span> added{" "}
                        <span style={{ fontWeight: "bold" }}>"Gifts"</span> to{" "}
                        <span style={{ fontWeight: "bold" }}>
                            "Farewell Party"
                        </span>
                        <br />
                        <span style={{ color: "#56d4b9" }}>
                            You get {currency}32.25
                        </span>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <MainNavbar />
                <div className="container-fluid text-center">
                    <div className="row content align-items-center">
                        <div className="col-xl-3">
                            <LeftSideBar />
                        </div>
                        <div
                            className="col-xl-5"
                            style={{
                                boxShadow: "0 0 12px rgb(0 0 0 / 20%)",
                                height: "100vh",
                                marginTop: "50px",
                            }}
                        >
                            {recent}
                        </div>
                        <div className="col-xl-4"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log("This is State ");
    // console.log(state);
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, null)(RecentActivity);
