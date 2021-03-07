/* eslint-disable */
import React, { Component } from "react";
import profilePhoto from "../../images/profilePhoto.png";
import "../../App.css";
import ProfilePageNav from "../layout/ProfilePageNav";
import Axios from "axios";
import backServer from "../../webConfig";
class ProfilePage extends Component {
    state = {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        currency: localStorage.getItem("currency"),
        timezone: localStorage.getItem("timezone"),
        language: localStorage.getItem("language"),
        phone: localStorage.getItem("phone"),
        profilephoto: localStorage.getItem("profilephoto"),
    };

    fileSelectedHandler = (e) => {
        this.setState({
            profilephoto: e.target.files[0],
        });
        const data = new FormData();
        // data.append("name", this.state.name);
        data.append("profilephoto", this.state.profilephoto);
        Axios.defaults.withCredentials = true;
        // console.log(data);
        Axios.post(`${backServer}/updateprofile`, data).then((response) => {
            console.log("back");
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", this.state.name);
        data.append("profilephoto", this.state.profilephoto);
        Axios.defaults.withCredentials = true;
        // console.log(data);
        Axios.post(`${backServer}/updateprofile`, data).then((response) => {
            console.log(response);
        });
    };
    //+ "public/images/profilePhotos/"
    render() {
        console.log(this.state);
        let path = "http://localhost:3001/";
        let profilePhoto1 = localStorage.getItem("profilephoto");
        profilePhoto1 = profilePhoto1.toString();
        let profilePhoto = path + profilePhoto1;
        console.log(profilePhoto);
        return (
            <div className="container-fluid">
                <ProfilePageNav />
                <div className="container profileMain">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div
                                className="col-sm-3"
                                style={{ width: "230px" }}
                            >
                                <img
                                    src={profilePhoto}
                                    className=""
                                    alt="profilepic"
                                    style={{ width: "200px", height: "250px" }}
                                />
                                <div>
                                    <label htmlFor="browse">
                                        Change your avatar
                                    </label>
                                    <input
                                        type="file"
                                        id="profilephoto"
                                        name="profilephoto"
                                        onChange={this.fileSelectedHandler}
                                    ></input>
                                </div>
                            </div>

                            <div
                                className="col-sm-3"
                                style={{ width: "240px", marginRight: "200px" }}
                            >
                                <div className="form-group">
                                    <label htmlFor="name">Your name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name=""
                                        id="name"
                                        onChange={this.handleChange}
                                    />
                                    <a href="#" id="show">
                                        edit
                                    </a>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        Your email address
                                    </label>
                                    <input
                                        type="text"
                                        name=""
                                        className="form-control"
                                        id="email"
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">
                                        Your phone number
                                    </label>
                                    <input
                                        type="text"
                                        name=""
                                        className="form-control"
                                        id="phone"
                                        onChange={this.handleChange}
                                    />
                                </div>

                                {/*  <div className="form-group">
                                    <label htmlFor="password">
                                        Your password
                                    </label>
                                    <input
                                        type="password"
                                        name=""
                                        className="form-control"
                                        id="password"
                                    />
                                </div>*/}
                            </div>

                            <div className="col-sm-3">
                                <div className="signup-block">
                                    <div className="form-group">
                                        <label htmlFor="">
                                            Your Default currency
                                        </label>
                                        <br />
                                        <label htmlFor="">
                                            <small>(for new expenses)</small>
                                        </label>
                                        <select
                                            id="currency"
                                            name="currency"
                                            className="form-control"
                                            onChange={this.handleChange}
                                        >
                                            <option value="USD ($)">
                                                USD ($)
                                            </option>
                                            <option value="EUR (€)">
                                                EUR (€)
                                            </option>
                                            <option value="GBP (£)">
                                                GBP (£)
                                            </option>
                                            <option value="HUF (Ft)">
                                                HUF (Ft)
                                            </option>
                                            <option value="INR (₹)">
                                                INR (₹)
                                            </option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">You timezone</label>
                                        <select
                                            id="timezone"
                                            name="timezone"
                                            className="form-control"
                                            onChange={this.handleChange}
                                        >
                                            <option value="Pacific Time (US &amp; Canada)">
                                                (GMT-08:00) Pacific Time (US
                                                &amp; Canada)
                                            </option>
                                            <option value="Central America">
                                                (GMT-06:00) Central America
                                            </option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Language</label>
                                        <select
                                            id="language"
                                            name="language"
                                            className="form-control"
                                            onChange={this.handleChange}
                                        >
                                            <option value="English">
                                                English
                                            </option>
                                            <option value="Hindi">Hindi</option>
                                        </select>
                                    </div>
                                    <button className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </div>
                            <div className="col-sm-3"></div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ProfilePage;
