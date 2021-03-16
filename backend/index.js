const app = require("./app");

const login = require("./routes/login");
const signup = require("./routes/signup");
const logout = require("./routes/logout");
const newgroup = require("./routes/newgroup");
const updateprofilephoto = require("./routes/updateprofilephoto");
const senduserid = require("./routes/senduserid");
const updateprofile = require("./routes/updateprofile");
const changeuserid = require("./routes/changeuserid");
const getallusers = require("./routes/getallusers");
const usergroups = require("./routes/usergroups");
const acceptgroupinvite = require("./routes/acceptgroupinvite");

app.use("/login", login);
app.use("/signup", signup);
app.use("/logout", logout);
app.use("/newgroup", newgroup);
app.use("/updateprofilephoto", updateprofilephoto);
app.use("/senduserid", senduserid);
app.use("/updateprofile", updateprofile);
app.use("/changeuserid", changeuserid);
app.use("/getallusers", getallusers);
app.use("/usergroups", usergroups);
app.use("/acceptgroupinvite", acceptgroupinvite);

app.listen(3001, () => {
    console.log("Running on 3001");
});

module.exports = app;
