const express = require("express");
const app = express();
const {Router} = express;
const {fork} = require("child_process")

const randomNumRouter = new Router ();

randomNumRouter.get("/", (req, res) =>{

    
    const forked = fork('./src/forked/computo');
    const { cant } = req.query;
    let cantEnv;
    if (cant) {
        cantEnv = cant;
    } else {
        cantEnv = 100000000;
    }
    
    forked.send(cantEnv);

    forked.on("message", (message) => {
        res.send(message);
    });
});


module.exports = randomNumRouter;
