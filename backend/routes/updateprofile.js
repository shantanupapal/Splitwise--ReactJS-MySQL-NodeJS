const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../pool");
const multer = require("multer");
const upload = multer();
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

router.post("/", upload.single("profilephoto"), function (req, res) {
    if (req.files) {
        const profilephoto = req.files.profilephoto;
        const filename = req.files.profilephoto.name;
        console.log(filename);

        profilephoto.mv("public/" + filename);
        res.end("done");
    }
});

module.exports = router;
