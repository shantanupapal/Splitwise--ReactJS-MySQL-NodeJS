import { Link } from "react-router-dom";
import smallLogo from "../../images/smallLogo.png";

const LeftSideBar = () => {
    return (
        <div className="leftSideNav">
            <div className="left">
                <Link to="/Dashboard">
                    <table className="options">
                        <thead>
                            <tr>
                                <td>
                                    <img src={smallLogo} alt="" />
                                </td>
                                <td>
                                    <p>Dashboard</p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </Link>
                <Link to="/RecentActivity">
                    <table className="options">
                        <thead>
                            <tr>
                                <td>
                                    <i
                                        className="fa fa-flag"
                                        aria-hidden="true"
                                    ></i>
                                </td>
                                <td>
                                    <p>Recent Activity</p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </Link>
                <div className="groups">
                    <div className="groupHeader">
                        <table className="groupsItems">
                            <thead>
                                <tr>
                                    <td>GROUPS</td>
                                    <td>
                                        <Link
                                            to="/AddNewGroup"
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            <span>&#43;</span>
                                            add
                                        </Link>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            {/*<a href="">About</a>
            <a href="">Services</a>
            <a href="">Clients</a>
            <a href="">Contact</a>*/}
        </div>
    );
};

export default LeftSideBar;
