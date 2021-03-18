import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import backServer from "../../webConfig";
import profilePhoto from "../../images/profilePhoto.png";
class Dashboard extends Component {
    state = {
        i_owe: [],
        they_owe: [],
    };
    componentDidMount = () => {
        const user_id = parseInt(localStorage.getItem("user_id"));
        console.log("Hello");
        Axios.post(`${backServer}/dashboarddetails `, { user_id: user_id })
            .then((response) => {
                console.log("got response", response.data.i_owe);
                this.setState({
                    i_owe: response.data.i_owe,
                    they_owe: response.data.they_owe,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const i_owe = this.state.i_owe;
        const they_owe = this.state.they_owe;
        let i_owe_total = 0;
        let they_owe_total = 0;
        console.log(i_owe);
        const show_i_owe = i_owe.length ? (
            i_owe.map((ower) => {
                console.log(ower[0]);
                return (
                    <div
                        key={ower[0]}
                        style={{
                            padding: "7px 13px 7px 13px",
                            marginLeft: "2px",
                            textAlign: "right",
                            borderBottom: "1px solid #eee",
                        }}
                    >
                        <img
                            src={profilePhoto}
                            alt=""
                            style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "16px",
                                marginRight: "15px",
                            }}
                        />
                        <span style={{ fontSize: "20px" }}>{ower[2]}</span>
                        <br />
                        <span
                            style={{
                                fontSize: "17px",
                                lineHeight: "20px",
                                color: "#ff652f",
                                paddingLeft: "45px",
                            }}
                        >
                            you owe
                        </span>{" "}
                        <span
                            style={{
                                fontSize: "20px",
                                color: "#ff652f",
                                fontWeight: "bold",
                            }}
                        >
                            {Math.abs(ower[1])}
                        </span>
                    </div>
                );
            })
        ) : (
            <div
                style={{
                    color: "#999",
                    marginTop: "20px",
                    fontSize: "16px",
                }}
            >
                You do not owe anything
            </div>
        );

        const show_they_owe = they_owe.length ? (
            they_owe.map((ower) => {
                // console.log(ower[0]);
                return (
                    <div
                        key={ower[0]}
                        style={{
                            padding: "7px 13px 7px 13px",
                            marginLeft: "2px",
                            textAlign: "left",
                            borderBottom: "1px solid #eee",
                        }}
                    >
                        <img
                            src={profilePhoto}
                            alt=""
                            style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "16px",
                                marginRight: "15px",
                            }}
                        />
                        <span style={{ fontSize: "20px" }}>{ower[2]}</span>
                        <br />
                        <span
                            style={{
                                fontSize: "17px",
                                lineHeight: "20px",
                                color: "#5bc5a7",
                                paddingLeft: "45px",
                            }}
                        >
                            owes you
                        </span>{" "}
                        <span
                            style={{
                                fontSize: "20px",
                                color: "#5bc5a7",
                                fontWeight: "bold",
                            }}
                        >
                            {Math.abs(ower[1])}
                        </span>
                    </div>
                );
            })
        ) : (
            <div
                className="container"
                style={{
                    color: "#999",
                    marginTop: "20px",
                    fontSize: "16px",
                }}
            >
                Other's owe nothing to you
            </div>
        );

        i_owe.forEach((ower) => {
            i_owe_total = i_owe_total + ower[1];
        });
        they_owe.forEach((ower) => {
            they_owe_total = they_owe_total + ower[1];
        });

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
                <div className="container dashboardHeader2">
                    <div className="row align-items-center">
                        <div
                            className="col"
                            style={{
                                borderRight: "1px solid #ddd",
                                color: "#999",
                                fontSize: "16px",
                            }}
                        >
                            {" "}
                            you owe <br />
                            <div>{Math.abs(i_owe_total)}</div>
                        </div>

                        <div
                            className="col"
                            style={{
                                color: "#999",
                                fontSize: "16px",
                            }}
                        >
                            {" "}
                            you are owed <div>{Math.abs(they_owe_total)}</div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row align-items-top">
                        <div
                            className="col"
                            style={{
                                borderRight: " 2px solid #eee",
                            }}
                        >
                            <div
                                style={{
                                    float: "left",
                                    color: "#999999",
                                    fontWeight: "bold",
                                    padding: "10px",
                                }}
                            >
                                YOU OWE
                            </div>
                            <br />
                            <div>{show_i_owe}</div>
                        </div>
                        <div className="col">
                            <div
                                style={{
                                    float: "right",
                                    color: "#999999",
                                    fontWeight: "bold",
                                    padding: "10px",
                                }}
                            >
                                YOU ARE OWED
                            </div>
                            <br />
                            <div>{show_they_owe}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
