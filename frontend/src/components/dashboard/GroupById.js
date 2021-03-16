import React, { Component, useState } from "react";
import LeftSideBar from "../layout/LeftSideBar";
import MainNavbar from "../layout/MainNavbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import backServer from "../../webConfig";
import MyGroups from "../dashboard/MyGroups";
import { Modal, Button } from "react-bootstrap";

class GroupById extends Component {
    state = {
        showPopUp: false,
        id: null,
    };

    handleClose = () => {
        this.setState({ showPopUp: false });
    };

    handleShow = () => {
        this.setState({ showPopUp: true });
    };

    componentDidMount = () => {
        console.log(this.props);
        let id = this.props.match.params.group_id;
        this.setState({ id: id });
        //Fetch all group details here
    };

    render() {
        // console.log("Props");
        // console.log(this.props);
        const { loggedIn } = this.props;
        if (!loggedIn) return <Redirect to="/Login" />;
        const groupname = localStorage.getItem("group_name");

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
                                                    variant="primary"
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
                                                            <form action="">
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
                                                                                type="text"
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
                                                                            ></input>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        paddingTop:
                                                                            "10px",
                                                                    }}
                                                                >
                                                                    Paid by you
                                                                    and split
                                                                    equally
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={
                                                                this.handleClose
                                                            }
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="primary"
                                                            onClick={
                                                                this.handleClose
                                                            }
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
                                                    </Modal.Footer>
                                                </Modal>
                                            </>
                                        </div>
                                    </div>
                                </div>
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
