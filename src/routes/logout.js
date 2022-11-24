const express = require("express");
const {reset} = require("nodemon");
const session = require('express-session');

const app = express();
const {Router} = express;
const router = new Router();

//GET DEL LOGOUT
router.get("/", (req, res,next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');});
});


//EXPORT MODULO ROUTER
module.exports = router;
