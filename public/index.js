const socket = io();


socket.on("render", (data) => {
	renderTabla();
	mainLogin();
})

function renderTabla() {
	const tabla = document.getElementById('tBody');
	const url = '/api/productosTest';

	/* Funcion fetch para traer todos los productos mediante GET */
	fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			/* Espero si esta todo OK borro el contenido viejo de la tabla y escribo el nuevo */
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
	/* Funcion fetch para saber si esta logeado */
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
	//Funcion fetch para saber si esta logeado
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