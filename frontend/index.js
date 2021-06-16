const http = require("http"); //utilizamos require para referirnoas a que vamos a requerir un paquete nativo de node js
const requestHandler = require("./request-handler");
const server = http.createServer(requestHandler); //creamos el server y este ejecutara un callback

server.listen(5000, () => { //el server va  a estar en el puerto 5000
    console.log(
        "el servidor esta escuchando peticiones en http://localhost:5000/"
    );
}); //cada vez que se modifique algo en al servidor se escuchar en el puerto 5000