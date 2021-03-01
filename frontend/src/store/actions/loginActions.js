import Axios from "axios";

export const logIn = (credentials) => {
    Axios.defaults.withCredentials = true;
    return (dispatch, getState) => {
        Axios.post("http://localhost:3001/login", {
            username: credentials.username,
            password: credentials.password,
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    dispatch({ type: "LOGIN_SUCCESS" });
                }
                if (response.status === 201) {
                    dispatch({ type: "LOGIN_NOT_SUCCESS" });
                }

                // if (response.data.message) {
                //     setLoginStatus(response.data.message);
                // } else {
                //     setLoginStatus(response.data[0].username);
                // }
            })
            .catch((err) => {
                dispatch({ type: "LOGIN_ERROR", err });
            });
    };
};

export const signOut = () => {
    return (dispatch, getState) => {
        Axios.post("http://localhost:3001/logout").then((response) => {
            if (response.status === 200) {
                dispatch({ type: "SIGNOUT_SUCCESS" });
            }
        });
    };
};
