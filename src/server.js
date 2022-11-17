import express from 'express';
import session from 'express-session';
import http from 'http';
import { Server } from 'socket.io';
import ContainerFake from './containers/ContainerFake.js';
import ContainerFs from './containers/ContainerFs.js';
import path from 'path';
import MongoStore from 'connect-mongo';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: 'mongodb+srv://ivancoder:1563668330@cluster0.izru1oz.mongodb.net/sessions',
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
		}),

		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 10 * 1000 * 60,
		},
	})
);



const server = http.createServer(app);
const io = new Server(server);

const productsApi = new ContainerFake();
const messagesApi = new ContainerFs('./mensajes.json');

// conexión con socket
io.on('connection', async (socket) => {
	console.log('Un cliente se ha conectado');

	const chat = await messagesApi.getNormalizedMensajes();
	console.log(chat);
	socket.emit('chat', chat);

	socket.on('new-message', async (data) => {
		await messagesApi.save(data);
		const chat = await messagesApi.getNormalizedMensajes();
		io.sockets.emit('chat', chat);
	});
});

const auth = (req, res, next) => {
	if (req.session.usuario) {
		next();
	} else {
		res.redirect('/login');
	}
};

const isLogged = (req, res, next) => {
	if (!req.session.usuario) {
		next();
	} else {
		res.redirect('/');
	}
};

// MUESTRO EL FORMULARIO DEL LOGIN
app.get('/login', isLogged, (req, res) => {
	res.sendFile(path.resolve('public', 'login.html'));
});

app.post('/login', (req, res) => {
	req.session.usuario = req.body.usuario;
	res.redirect('/');
});

app.get('/username', (req, res) => {
	res.json(req.session.usuario);
});

// MUESTRO EL SALUDO AL USUARIO
app.get('/logout', (req, res) => {
	const usuario = req.session.usuario;
	req.session.destroy(function (err) {
		if (err) return next(err);
		res.json(usuario);
	});
});

app.use(auth);
app.use(express.static('public'));

// Llamo a getproducts y le paso 5, para generar 5 productos random con faker
app.get('/api/productos-test', (req, res) => {
	res.json(productsApi.getProducts(5));
});

const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => {
	console.log(
		`Servidor Http con Websockets en el puerto ${srv.address().port}`
	);
});
srv.on('error', (error) => console.log(`Error en servidor ${error}`));