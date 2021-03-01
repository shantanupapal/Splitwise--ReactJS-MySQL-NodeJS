const initialState = {
    authError: null,
    loggedIn: false,
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_ERROR":
            console.log("Login Failed");
            return {
                ...state,
                authError: "Login Failed",
                loggedIn: false,
            };
        case "LOGIN_NOT_SUCCESS":
            console.log("Login Failed Incorrect Username or Password");
            return {
                ...state,
                authError: "Incorrect Username or Password",
                loggedIn: false,
            };
        case "LOGIN_SUCCESS":
            console.log("Login Success");
            return {
                ...state,
                authError: null,
                loggedIn: true,
            };

        case "SIGNOUT_SUCCESS":
            console.log("Signout Success");
            return state;
        default:
            return state;
    }
};

export default authenticationReducer;
