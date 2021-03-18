import React, { Component } from "react";
import LeftSideBar from "./layout/LeftSideBar";
import MainNavbar from "./layout/MainNavbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import backServer from ".././webConfig";
import MyGroups from "./dashboard/MyGroups";
class MyGroupsCenter extends Component {
    state = {
        allGroups: [],
        myGroups: [],
        myPendingGroups: [],
    };

    componentDidMount = () => {
        //FETCH groups for the user_ID
        const user_id = parseInt(localStorage.getItem("user_id"));
        Axios.post(`${backServer}/usergroups`, { user_id: user_id })
            .then((response) => {
                console.log("All groups:");
                console.log(response.data);
                const allGroups = response.data;
                const myGroups = [];
                const myPendingGroups = [];
                this.setState({ allGroups: response.data });
                allGroups.forEach((group) => {
                    if (group.invitation_accepted === 1) {
                        myGroups.push(group);
                    } else {
                        myPendingGroups.push(group);
                    }
                });
                this.setState({
                    ...this.state,
                    myPendingGroups: myPendingGroups,
                    myGroups: myGroups,
                });
            })
            .then(() => {})
            .catch((error) => {
                console.log("Error: " + error);
            });
    };

    acceptGroup = (id) => {
        console.log(id);
        // console.log(typeof id);

        //Accept invitations in backend
        const user_id = parseInt(localStorage.getItem("user_id"));
        Axios.post(`${backServer}/acceptgroupinvite`, {
            user_id: user_id,
            group_id: id,
        })
            .then((response) => {
                console.log("Group accepted");
                //Change state here
                const myGroups = this.state.myGroups;
                this.state.myPendingGroups.forEach((group) => {
                    if (group.group_id === id) {
                        myGroups.push(group);
                    }
                });
                const myPendingGroups = this.state.myPendingGroups.filter(
                    (group) => {
                        console.log(typeof group.group_id);
                        console.log(typeof id);
                        return group.group_id !== id;
                    }
                );

                console.log("Pending groups: ", myPendingGroups);
                console.log("My groups: ", myGroups);
                this.setState({
                    myPendingGroups,
                    myGroups,
                });
                console.log("state", this.state.myPendingGroups);
                // this.props.history.push("/MyGroupsCenter");
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

        return (
            <div>
                <MainNavbar />
                <div className="container-fluid text-center">
                    <div className="row content align-items-center">
                        <div className="col-xl-3">
                            <LeftSideBar />
                        </div>
                        <div
                            className="col-xl-6"
                            style={{
                                boxShadow: "0 0 12px rgb(0 0 0 / 20%)",
                                height: "100%",
                            }}
                        >
                            <MyGroups
                                myGroups={this.state.myGroups}
                                myPendingGroups={this.state.myPendingGroups}
                                acceptGroup={this.acceptGroup}
                            />
                        </div>
                        <div className="col-xl-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log("This is State ");
    // console.log(state);
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, null)(MyGroupsCenter);
