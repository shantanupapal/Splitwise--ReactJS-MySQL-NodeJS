import React, { Component } from "react";
import Dashboard from "./dashboard/Dashboard";
import LeftSideBar from "./layout/LeftSideBar";
import MainNavbar from "./layout/MainNavbar";

class Center extends Component {
    render() {
        return (
            <div>
                <MainNavbar />
                <div className="container-fluid text-center">
                    <div className="row content">
                        <div className="col-sm-3">
                            <LeftSideBar />
                        </div>
                        <div className="col-sm-6">
                            <Dashboard />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Center;
