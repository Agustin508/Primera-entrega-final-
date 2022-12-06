const express = require("express");
const passportConfig = require("../passport/passportConfig")

const app = express();
const {
    Router
} = express;
const router = new Router();

router.get("/", (req, res) => {
    if (req.user) {
        res.send({
            user: req.user.email
        })
    } else {
        res.send(false)
    }
});

router.post("/", passportConfig.authenticate("local-login", {
    successRedirect: "/index.html",
    failureRedirect: "/loginError.html"
}))

module.exports = router;
