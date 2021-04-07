import React, { Component } from "react";
import LeftSideBar from "../layout/LeftSideBar";
import MainNavbar from "../layout/MainNavbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import backServer from "../../webConfig";

class RecentActivity extends Component {
    state = {
        activities: [],
    };
    componentDidMount = () => {
        const user_id = localStorage.getItem("user_id");

        Axios.post(`${backServer}/recentactivity`, { user_id: user_id })
            .then((response) => {
                console.log("Activities: ", response.data);
                this.setState({
                    activities: response.data,
                });
                // localStorage.setItem("user_id", response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    render() {
        // console.log("Props");
        // console.log(this.props);
        const { loggedIn } = this.props;
        if (!loggedIn) return <Redirect to="/Login" />;
        const currency = localStorage.getItem("currency").split(" ")[0];
        // console.log(currency);
        const all_activities = this.state.activities;

        const activities = all_activities.length ? (
            all_activities.map((activity) => {
                if (activity[5] === "payer") {
                    return (
                        <div>
                            <div
                                style={{
                                    borderBottom: "1px solid #eee",
                                    lineHeight: "30px",
                                    padding: "5px",
                                }}
                            >
                                <span style={{ fontWeight: "bold" }}>You</span>{" "}
                                added{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {activity[2]}
                                </span>{" "}
                                to{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {activity[1]}
                                </span>
                                <br />
                                <span style={{ color: "#56d4b9" }}>
                                    You paid {currency}
                                    {activity[3]}
                                </span>
                            </div>
                        </div>
                    );
                } else if (activity[5] === "borrower") {
                    return (
                        <div>
                            <div
                                style={{
                                    borderBottom: "1px solid #eee",
                                    lineHeight: "30px",
                                    padding: "5px",
                                }}
                            >
                                <span style={{ fontWeight: "bold" }}>
                                    {activity[6]}
                                </span>{" "}
                                added{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {activity[2]}
                                </span>{" "}
                                to{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {activity[1]}
                                </span>
                                <br />
                                <span style={{ color: "#ff652f" }}>
                                    You owe {currency}
                                    {activity[4]}
                                </span>
                            </div>
                        </div>
                    );
                }
            })
        ) : (
            <div>No recent Activities</div>
        );

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
                            <div className="container dashboardHeader">
                                <div className="row align-items-center">
                                    <div className="col-sm-6">
                                        <h2>Recent Activity</h2>
                                    </div>
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-3"></div>
                                </div>
                            </div>
                            {activities}
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
