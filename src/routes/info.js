const Router = require ("express")
const path = require("path");

const router = new Router()

const argumentos = process.execArgv;
const plataforma = process.platform;
const version = process.version;
const memoria = process.memoryUsage();
const pathExe = process.execPath;
const processId = process.pid;
const carpeta = process.cwd();


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
            carpeta: carpeta,})}

            res.send(arrayInfo)

});

module.exports = router;