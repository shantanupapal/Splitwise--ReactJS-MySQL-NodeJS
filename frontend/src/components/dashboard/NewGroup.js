import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import centerlogo from "../../images/centerlogo.svg";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import backServer from "../../webConfig";
import Axios from "axios";

class NewGroup extends Component {
    state = {
        groupName: "",
        groupCreator: this.props.user.name,
        groupMembers: [{ groupMember: null }],
        suggestions: [],
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
    componentDidMount = () => {
        //FETCH ALL USERNAMES AND STORE IN LOCALSTORAGE
    };

    handleChange = (i, event) => {
        const items = [
            "shantanu",
            "devika",
            "sara",
            "anish",
            "sumeet",
            "piyush",
            "ajit",
        ];
        const tosuggested = event.target.value;
        let suggestions = [];
        if (tosuggested.length > 0) {
            console.log("inif");
            const regex = new RegExp(`^${tosuggested}`, "i");
            suggestions = items.sort().filter((v) => regex.test(v));
            console.log(suggestions);
            let groupMembers = [...this.state.groupMembers];
            groupMembers[i].groupMember = event.target.value;
            this.setState({ ...this.state, groupMembers });
            console.log(this.state);
        }
        console.log("suggestions: ", suggestions);
        this.setState({ ...this.state, suggestions });

        console.log("state after suggest: ", this.state);
        // if (this.state.suggestions.length > 0) {
        //     let groupMembers = [...this.state.groupMembers];
        //     groupMembers[i].groupMember = event.target.value;
        //     this.setState({ ...this.state, groupMembers });
        //     console.log(this.state);
        // }

        //earlier
    };

    showSuggestions = (i) => {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((i, item) => {
                    return <li>{item}</li>;
                })}
            </ul>
        );
    };

    addOnClick = () => {
        this.setState((prevState) => ({
            ...this.state,
            groupMembers: [...prevState.groupMembers, { groupMember: null }],
            suggestions: [],
        }));
    };

    removeOnClick = (i) => {
        let groupMembers = [...this.state.groupMembers];
        groupMembers.splice(i, 1);
        this.setState({ ...this.state, groupMembers });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        Axios.defaults.withCredentials = true;

        //CHECK IF THE GROUP MEMBERS ADDED ARE PRESENT IN DB COMPARING WITH LOCAL STORAGE

        // let groupMembers = [...this.state.groupMembers];
        // groupMembers.push(this.props.user);
        // this.setState({
        //     ...this.state,
        //     groupMembers,
        // });
        // console.log("here: ", this.state);
        const groupDetails = this.state;

        Axios.post(`${backServer}/newgroup`, {
            groupDetails,
        })
            .then((response) => {
                console.log(response.status);
            })
            .catch((err) => {
                console.log(err);
            });

        // alert("A name was submitted: " + this.state.groupMembers.join(", "));
    };

    render() {
        const { user } = this.props.user.name;
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
                                                    // value={el.groupMember || ""}
                                                    onChange={(e) =>
                                                        this.handleChange(i, e)
                                                    }
                                                />
                                                {this.showSuggestions()}
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
