const Router = require ("express")
const path = require("path");
const {cpus} = require ("os");
//const compression = require("compression")

const router = new Router()

const argumentos = process.execArgv;
const plataforma = process.platform;
const version = process.version;
const memoria = process.memoryUsage();
const pathExe = process.execPath;
const processId = process.pid;
const carpeta = process.cwd();
const cpu = cpus().length;

//sin compression 430B
//con compression 432B

router.get("/", (req, res) => {
    let arrayInfo = [];

    for (let index = 0; index < 1; index++) {
        arrayInfo.push({
            argumentos: argumentos,
            plataforma: plataforma,
            version: version,
            memoria: memoria.rss,
            pathExe: pathExe,
            processId: processId,
            carpeta: carpeta,
            cpu: cpu})}

            res.send(arrayInfo)
            console.log(arrayInfo)
});

module.exports = router;