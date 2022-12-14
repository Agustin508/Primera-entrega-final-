const socket = io();


socket.on("render", (data) => {
	renderTabla();
	mainLogin();
	renderInfo();
})

function renderTabla() {
	const tabla = document.getElementById('tBody');
	const url = '/api/productosTest';

	fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			tabla.innerHTML = "";
			for (const pto of data) {
				let fila = document.createElement('tr');
				let aux1 = document.createElement('td');
				aux1.innerHTML = `${pto.titulo}`;
				let aux2 = document.createElement('td');
				aux2.innerHTML = `$ ${pto.precio}`;
				let aux3 = document.createElement('td');
				aux3.innerHTML = `<img src = ${pto.thumbail} width="40"height="40">`;
				fila.appendChild(aux1);
				fila.appendChild(aux2);
				fila.appendChild(aux3);
				tabla.appendChild(fila);
			}

		})
		.catch(function (error) {
			console.log(error);
		});
	return false;
}



function mainLogin() {
	const url = '/api/login';

	const options = {
		method: "GET"
	}
	fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {

			if (data) {
				let x = document.getElementById("usuarioLogin");
				x.innerHTML = data.user
				let y = document.getElementById("divBienvenida")
				y.style.display = "block";

			} else {
				window.location.href = "login.html";
			}
		})
		.catch(function (error) {
			console.log(error);
		});

}

function logout() {

	const url = '/api/login';

	const options = {
		method: "GET"
	}
	fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			if (data) {
				console.log(data)
				let x = document.getElementById("logout");
				x.innerHTML = "Bye ! " + data.user
				setTimeout(function () {
					window.location.href = "api/logout"
				}, 2000);

			} else {
				window.location.href = "login.html";
			}
		})
		.catch(function (error) {
			console.log(error);
		});


}

function renderInfo() {
	const infoo = document.getElementById('infooo');

	const url = '/api/info';

	fetch(url)

	.then((resp) => resp.json())
	.then(function (info) {
		
		infoo.innerHTML = "";
		for (const infoooo of info) {
			let fila = document.createElement('tr');
			let aux1 = document.createElement('td');
			aux1.innerHTML = `${infoooo.version}`;
			let aux2 = document.createElement('td');
			aux2.innerHTML = `$ ${infoooo.argumentos}`;
			let aux3 = document.createElement('td');
			aux3.innerHTML = `$ ${infoooo.pathExe}`;
			let aux4 = document.createElement('td');
			aux4.innerHTML = `$ ${infoooo.plataforma}`;
			let aux5 = document.createElement('td');
			aux5.innerHTML = `$ ${infoooo.memoria}`;
			let aux6 = document.createElement('td');
			aux6.innerHTML = `$ ${infoooo.processId}`;
			let aux7 = document.createElement('td');
			aux7.innerHTML = `$ ${infoooo.carpeta}`;
			let aux8 = document.createElement('td');
			aux8.innerHTML = `$ ${infoooo.cpu}`;
			fila.appendChild(aux1);
			fila.appendChild(aux2);
			fila.appendChild(aux3);
			fila.appendChild(aux4);
			fila.appendChild(aux5);
			fila.appendChild(aux6);
			fila.appendChild(aux7);
			fila.appendChild(aux8);
			infoo.appendChild(fila);
		}
		
	})
	.catch(function (error) {
		console.log(error);
	});
	
		
}
