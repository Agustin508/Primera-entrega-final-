const express = require("express");

const app = express();
const {Router} = express;
const router = new Router();
const passportConfig = require("../passport/passportConfig")

router.get("/", async (req, res) => {
});

router.post("/", passportConfig.authenticate("local-signup", {
    successRedirect: "/login.html",
    failureRedirect: "/registerError.html"
}))

module.exports = router;
