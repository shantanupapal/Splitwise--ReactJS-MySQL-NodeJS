import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import centerlogo from "../../images/centerlogo.svg";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class NewGroup extends Component {
    state = {
        groupName: "",
        groupMembers: [{ groupMember: null }],
    };

    // createUI() {
    //     return this.state.groupMembers.map((el, i) => (
    //         <div key={i}>
    //             <input
    //                 type="text"
    //                 value={el.groupMember || ""}
    //                 onChange={this.handleChange.bind(this, i)}
    //             />
    //             <input
    //                 type="button"
    //                 value="remove"
    //                 onClick={this.removeOnClick.bind(this, i)}
    //             />
    //         </div>
    //     ));
    // }

    handleChange(i, event) {
        let groupMembers = [...this.state.groupMembers];
        groupMembers[i].groupMember = event.target.value;
        this.setState({ groupMembers });
        console.log(groupMembers);
    }

    addOnClick() {
        this.setState((prevState) => ({
            groupMembers: [...prevState.groupMembers, { groupMember: null }],
        }));
    }

    removeOnClick(i) {
        let groupMembers = [...this.state.groupMembers];
        groupMembers.splice(i, 1);
        this.setState({ groupMembers });
    }

    handleSubmit(event) {
        alert("A name was submitted: " + this.state.groupMembers.join(", "));
        event.preventDefault();
    }

    render() {
        const { user } = this.props;
        const { loggedIn } = this.props;
        if (!loggedIn) return <Redirect to="/Login" />;
        return (
            <div className="container h-100 d-flex justify-content-center addGroupMain">
                <div className="row align-items-center">
                    <div className="col forMainLogo">
                        <img src={centerlogo} alt="" />
                    </div>
                    <div className="col">
                        <div className="welcomeName">
                            <p>START A NEW GROUP</p>{" "}
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group formForNewGroup">
                                <label htmlFor="">
                                    My group shall be called...
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="groupName"
                                    onChange={(e) => {
                                        this.setState({
                                            groupName: e.target.value,
                                        });
                                        console.log(this.state);
                                    }}
                                    size="10"
                                    style={{
                                        paddingBottom: "10px",
                                    }}
                                />
                                <hr className="hrTagAddGroup" />
                                <div className="welcomeName">
                                    <p>GROUP MEMBERS</p>{" "}
                                </div>
                                <div className="container">
                                    <p>{user}</p>
                                    {this.state.groupMembers.map((el, i) => (
                                        <div
                                            key={i}
                                            className="row addPersonRow"
                                        >
                                            <div className="col-sm-10 ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={el.groupMember || ""}
                                                    onChange={(e) =>
                                                        this.handleChange(i, e)
                                                    }
                                                />
                                            </div>
                                            <div className="col-sm-2">
                                                <Link
                                                    style={{
                                                        textDecoration: "None",
                                                    }}
                                                    onClick={() =>
                                                        this.removeOnClick(i)
                                                    }
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "15px",
                                                        }}
                                                    >
                                                        &#10006;
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    style={{ textDecoration: "None" }}
                                    onClick={() => this.addOnClick()}
                                >
                                    + Add a person
                                </Link>{" "}
                                <br></br>
                                <hr className="hrTagAddGroup" />
                                <button
                                    type="submit"
                                    className="btn btn-danger submitButton"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, null)(NewGroup);
