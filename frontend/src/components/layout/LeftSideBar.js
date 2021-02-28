import { Link } from "react-router-dom";
import smallLogo from "../../images/smallLogo.png";

const LeftSideBar = () => {
    return (
        <div className="leftSideNav">
            <div className="left">
                <Link to="/Dashboard">
                    <table className="options">
                        <td>
                            <img src={smallLogo} alt="" />
                        </td>
                        <td>
                            <p>Dashboard</p>
                        </td>
                    </table>
                </Link>
                <Link to="/RecentActivity">
                    <table className="options">
                        <td>
                            <i class="fa fa-flag" aria-hidden="true"></i>
                        </td>
                        <td>
                            <p>Recent Activity</p>
                        </td>
                    </table>
                </Link>
                <div className="groups">
                    <div className="groupHeader">
                        <table className="groupsItems">
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
<i class="fa fa-flag" aria-hidden="true"></i>;
