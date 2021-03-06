/* eslint-disable */
import React, { Component } from "react";
import profilePhoto from "../../images/profilePhoto.png";
import "../../App.css";
import ProfilePageNav from "../layout/ProfilePageNav";

class ProfilePage extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div className="container-fluid">
                <ProfilePageNav />
                <div className="container profileMain">
                    <div className="row">
                        <div className="col-sm-3" style={{ width: "230px" }}>
                            <img
                                src={profilePhoto}
                                className=""
                                alt="profilepic"
                            />
                            <div>
                                <label htmlFor="browse">
                                    Change your avatar
                                </label>
                                <input
                                    type="file"
                                    id="profileimg"
                                    name="profileimg"
                                    accept="image/*"
                                ></input>
                            </div>
                        </div>

                        <div
                            className="col-sm-3"
                            style={{ width: "240px", marginRight: "200px" }}
                        >
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="username">Your name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name=""
                                        id="username"
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
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">
                                        Your password
                                    </label>
                                    <input
                                        type="password"
                                        name=""
                                        className="form-control"
                                        id="password"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="col-sm-3">
                            <div className="signup-block">
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="">
                                            Your Default currency
                                        </label>
                                        <br />
                                        <label htmlFor="">
                                            <small>(for new expenses)</small>
                                        </label>
                                        <select
                                            name="currency"
                                            className="form-control"
                                        >
                                            <option value="USD">USD ($)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="GBP">GBP (£)</option>
                                            <option value="HUF">
                                                HUF (Ft)
                                            </option>
                                            <option value="INR">INR (₹)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">You timezone</label>
                                        <select
                                            name="timezone"
                                            className="form-control"
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
                                            name="language"
                                            className="form-control"
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
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;
