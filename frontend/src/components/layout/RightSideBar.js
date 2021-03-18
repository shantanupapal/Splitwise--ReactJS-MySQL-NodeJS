import React, { Component } from "react";
import Axios from "axios";
import backServer from "../../webConfig";
import swal from "sweetalert";

class RightSideBar extends Component {
    state = {};

    componentDidMount = () => {
        const group_id = parseInt(localStorage.getItem("group_id"));
        // console.log(group_id);
        Axios.post(`${backServer}/getgroupbalancedetails`, {
            group_id: group_id,
        })
            .then((response) => {
                console.log("response: ", response);
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    };
    render() {
        return (
            <div class="container">
                <div
                    style={{
                        color: "#999",
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}
                >
                    GROUP BALANCES
                </div>
            </div>
        );
    }
}

export default RightSideBar;

// const RightSideBar = () => {

//     return (
//         <div class="container">
//             <div
//                 style={{ color: "#999", fontSize: "20px", fontWeight: "bold" }}
//             >
//                 GROUP BALANCES
//             </div>
//         </div>
//     );
// };

// export default RightSideBar;
