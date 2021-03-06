const app = require("./app");

const login = require("./routes/login");
const signup = require("./routes/signup");
const logout = require("./routes/logout");

app.use("/login", login);
app.use("/signup", signup);
app.use("/logout", logout);

app.listen(3001, () => {
    console.log("Running on 3001");
});

module.exports = app;
