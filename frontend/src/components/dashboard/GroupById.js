import React, { Component, useState } from "react";
import LeftSideBar from "../layout/LeftSideBar";
import MainNavbar from "../layout/MainNavbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import backServer from "../../webConfig";
import MyGroups from "../dashboard/MyGroups";
import { Modal, Button } from "react-bootstrap";
import noexpenses from "../../images/noexpenses.png";

class GroupById extends Component {
    state = {
        showPopUp: false,
        id: null,
        expense_description: null,
        expense_amount: null,
        members: [],
    };

    handleClose = () => {
        this.setState({ showPopUp: false });
    };

    handleShow = () => {
        this.setState({ showPopUp: true });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("state: ", this.state);
        //call expenses table to add expense
        const group_id = this.state.id;
        const description = this.state.expense_description;
        const total_amount = this.state.expense_amount;
        const paid_by = parseInt(localStorage.getItem("user_id"));
        const liables = this.state.members;

        Axios.post(`${backServer}/addexpense`, {
            group_id: group_id,
            description: description,
            total_amount: total_amount,
            paid_by: paid_by,
            liables: liables,
        })
            .then((response) => {
                console.log("response: ", response);
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
        //call one_to_one table and adjust expenses
    };

    componentDidMount = () => {
        console.log(this.props);
        let id = this.props.match.params.group_id;
        this.setState({ id: id });
        //Get all group members
        Axios.post(`${backServer}/getallgroupmembers`, {
            group_id: id,
        })
            .then((response) => {
                console.log("resopnse: ", response.data);
                const members = [];
                response.data.forEach((member) => {
                    members.push(member.user_id);
                });
                this.setState({
                    members: members,
                });
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
        //Fetch all group details here
    };

    render() {
        // console.log("Props");
        // console.log(this.props);
        const { loggedIn } = this.props;
        if (!loggedIn) return <Redirect to="/Login" />;
        const groupname = localStorage.getItem("group_name");
        const tempFlag = 0;
        const expenses = tempFlag ? (
            <div></div>
        ) : (
            <div className="container" style={{ paddingTop: "15px" }}>
                <div className="row">
                    <div className="col">
                        <img
                            src={noexpenses}
                            alt="No Expenses Added"
                            style={{
                                top: "0",
                                left: "65px",
                                width: "150px",
                            }}
                        />
                    </div>
                    <div className="col">
                        <h2 style={{ fontSize: "28px", lineHeight: "110%" }}>
                            You have not added any expenses yet
                        </h2>
                        <p
                            style={{
                                marginTop: "15px",
                                color: "#999",
                                fontSize: "18px",
                                lineHeight: "24px",
                            }}
                        >
                            To add a new expense, click the orange “Add an
                            expense” button.
                        </p>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                <MainNavbar />
                <div className="container-fluid text-center">
                    <div className="row content align-items-center">
                        <div className="col-xl-3">
                            <LeftSideBar />
                        </div>
                        <div className="col-xl-6">
                            <div className="centerOfPage">
                                <div className="container dashboardHeader">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h2>{groupname}</h2>
                                        </div>
                                        <div className="col">
                                            <>
                                                <Button
                                                    variant="danger"
                                                    onClick={this.handleShow}
                                                    style={{
                                                        backgroundColor:
                                                            "#ff652f",
                                                    }}
                                                >
                                                    Add an expense
                                                </Button>

                                                <Modal
                                                    centered
                                                    size="sm"
                                                    show={this.state.showPopUp}
                                                    onHide={this.handleClose}
                                                >
                                                    <Modal.Header
                                                        // closeButton
                                                        className="modalHeader"
                                                    >
                                                        <Modal.Title>
                                                            Add an expense
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="container">
                                                            <form
                                                                onSubmit={
                                                                    this
                                                                        .handleSubmit
                                                                }
                                                            >
                                                                <div className="row">
                                                                    <div className="col">
                                                                        <input
                                                                            type="text"
                                                                            className="expenseDescription"
                                                                            placeholder="Enter a description"
                                                                            style={{
                                                                                fontSize:
                                                                                    "20px",
                                                                                float:
                                                                                    "right",
                                                                                width:
                                                                                    "auto",
                                                                            }}
                                                                            name="expense_description"
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="container">
                                                                    <div className="row align-items-center">
                                                                        <div className="col">
                                                                            <span>
                                                                                $
                                                                            </span>
                                                                        </div>
                                                                        <div className="col">
                                                                            <input
                                                                                type="number"
                                                                                step="0.01"
                                                                                class="cost"
                                                                                placeholder="0.00"
                                                                                className="currency"
                                                                                style={{
                                                                                    fontSize:
                                                                                        "30px",
                                                                                    height:
                                                                                        "50px",
                                                                                    lineHeight:
                                                                                        "10px",
                                                                                }}
                                                                                name="expense_amount"
                                                                                onChange={
                                                                                    this
                                                                                        .handleChange
                                                                                }
                                                                            ></input>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        paddingTop:
                                                                            "10px",
                                                                        paddingBottom:
                                                                            "10px",
                                                                    }}
                                                                >
                                                                    Paid by you
                                                                    and split
                                                                    equally
                                                                </div>
                                                                <div className="container">
                                                                    <div className="row align-items-center">
                                                                        <div className="col">
                                                                            {" "}
                                                                            <Button
                                                                                variant="secondary"
                                                                                onClick={
                                                                                    this
                                                                                        .handleClose
                                                                                }
                                                                            >
                                                                                Cancel
                                                                            </Button>
                                                                        </div>
                                                                        <div className="col">
                                                                            <Button
                                                                                variant="success"
                                                                                type="submit"
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        "#1cc29f",
                                                                                    textDecoration:
                                                                                        "None",
                                                                                    boxShadow:
                                                                                        "0 2px 0 0 rgb(55 59 63 / 50%)",
                                                                                }}
                                                                            >
                                                                                Save
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </Modal.Body>
                                                </Modal>
                                            </>
                                        </div>
                                    </div>
                                </div>
                                <div>{expenses}</div>
                            </div>
                        </div>
                        <div className="col-xl-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, null)(GroupById);
