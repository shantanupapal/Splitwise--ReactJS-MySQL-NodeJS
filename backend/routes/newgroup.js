const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../pool");

router.post("/", (req, res) => {
    console.log("NEW Group details");
    console.log(req.body);
});

module.exports = router;
