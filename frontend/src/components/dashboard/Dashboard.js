import React, { Component } from "react";
import { Link } from "react-router-dom";
class Dashboard extends Component {
    render() {
        return (
            <div className="centerOfPage">
                <div className="container dashboardHeader">
                    <div className="row align-items-center">
                        <div className="col-sm-3">
                            <h2>Dashboard</h2>
                        </div>
                        <div className="col-sm-6"></div>
                        <div className="col-sm-3">
                            <Link to="" className="dashboardSettleUp">
                                Settle up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
