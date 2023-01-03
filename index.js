const express = require("express");
const path = require("path");
const session = require('cookie-session');
const passport = require("passport");
const parseArgs = require("minimist");
const {fork} = require("child_process")
const {cpus} = require ("os");
const cluster = require ("cluster")
const logger = require("./src/configLog4js");
const app = express()

//sessions
app.use(session({
	cookie: {
		maxAge: 600000
	},
	secret: "RioHondo",
	resave: false,
	saveUninitialized: false,
	rolling: true
}))

//Midleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use(passport.initialize());
app.use(passport.session());


//Routes
const ptosTest = require("./src/routes/productosTest")
app.use("/api/productostest", ptosTest);
const login = require("./src/routes/login")
app.use("/api/login", login)
const logout = require("./src/routes/logout")
app.use("/api/logout", logout)
const register = require("./src/routes/register")
app.use("/api/register", register)
const info = require("./src/routes/info")
app.use("/api/info", info)
const randomNumRouter =require ("./src/routes/randomNumbers");
app.use("/api/randoms", randomNumRouter)

//* Logger
app.use((req, res, next) => {
  logger.info(`Request ${req.method} at ${req.url}`)
  next();
});

//* Logger para rutas inexistentes
app.all("*", (req, res, next) => {
  logger.warn(`Failed request ${req.method} at ${req.url}`);
  res.send({ error:true }).status(500);
  next();
})

//Servidor HTTP
const http = require("http");
const server = http.createServer(app);

//Servidor de Socket
const {Server} = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
	socket.emit("render", "")
	socket.on("actualizacion", () => {
		io.sockets.emit("render", "")
	})
})

//Minimist


  const options= {
	alias: {
	  m: "modo"
	},
	default: {
	  modo: "fork"
	}
  }


 //servidor 
  const argv = process.argv.slice(2);
  const {  modo } = parseArgs(argv, options)
  const port = process.env.PORT || 8080
  console.log({port, modo})

  const cpu = cpus().length;
  console.log({cpu})

  if (modo == "cluster") {
    if (cluster.isPrimary) {
      console.log(`Primary ${process.pid} is running`);

      // Fork workers.
      for (let i = 0; i < 3; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        //cluster.fork()
      });
    } else {
      server.listen(port, () => {
        console.log(`Servidor http escuchando en el puerto ${options.port}! en modo ${options.m} en el worker ${process.pid}`)
      });
    }
  }
  else {
    server.listen(port, () => {
      console.log(`Servidor http escuchando en el puerto ${options.port}! en modo ${options.m}`)
    });
  }