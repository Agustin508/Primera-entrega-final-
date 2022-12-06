const express = require("express");
const {reset} = require("nodemon");
const session = require('express-session');

const app = express();
const {Router} = express;
const router = new Router();


router.get("/", (req, res,next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');});
});


module.exports = router;
