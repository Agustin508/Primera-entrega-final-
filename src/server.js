import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ContainerFake from './containers/ContainerFake.js';
import ContainerFs from './containers/ContainerFs.js';

const app = express();
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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

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