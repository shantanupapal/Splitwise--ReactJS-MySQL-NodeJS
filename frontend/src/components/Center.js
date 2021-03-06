import React, { Component } from "react";
import Dashboard from "./dashboard/Dashboard";
import LeftSideBar from "./layout/LeftSideBar";
import MainNavbar from "./layout/MainNavbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Center extends Component {
    render() {
        console.log("Props");
        console.log(this.props);
        const { loggedIn } = this.props;
        if (!loggedIn) return <Redirect to="/Login" />;

        return (
            <div>
                <MainNavbar />
                <div className="container-fluid text-center">
                    <div className="row content align-items-center">
                        <div className="col-xl-3">
                            <LeftSideBar />
                        </div>
                        <div className="col-xl-6">
                            <Dashboard />
                        </div>
                        <div className="col-xl-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("This is State ");
    console.log(state);
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, null)(Center);
