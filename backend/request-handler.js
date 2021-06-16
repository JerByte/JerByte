const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require("./enrutador");

module.exports = (req, res) => {
    //1. obtener la url desde el objeto request(req)
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);
    
    //2. obtener ruta
    const ruta = urlParseada.pathname; 

    //3. quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, ("")); //reeplazamos todos los elementos que se encuentran entres las rutas, por un string vacio

    //3.1. obtener metodo http
    const metodo = req.method.toLowerCase();

     //3.1.1 dar permisos de CORS escribiendo los headers
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Headers", "*");
     res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, DELETE, POST"
     );
     //3.1.2 dar respuesta inmediata cuando el metodo sea options
    if(metodo === "options") {
       res.writeHead(200);
       res.end();
       return; //retornamos la respuesta 
    }

    //3.2. obtener variables del query url
    const { query = {} } = urlParseada; //si urlParseada no tiene query, pondria un objeto vacio para evitar errores

    //3.3 obtener headers
    const { headers = {} } = req;

    //3.4. obtenmer payload, en el caso de haber uno
    const decoder = new StringDecoder("utf-8"); //va a obtener una fuente de informacion y partirla en pedazos para enviarla
    let buffer = "";

    //3.4.1 ir acumulando la data cuando el req reciba un payload
    req.on("data", (data)=>{ //req se va a ejecutar  cuando le lleguen datos de un payload
        buffer += decoder.write(data); //va a decodificar data(stream), a un string
    });

    //3.4.2 terminar de acumular datos y decirle al decoder que finalice 
    req.on("end", ()=>{ 
        buffer += decoder.end();

    if(headers["content-type"] === 'application/json'){
        buffer = JSON.parse(buffer); //convertimos lo que vien en buffer (texto plano), a Json
    }

    //3.4.3 revisar si tien subrutas en este caso es el indice del array
    if(rutaLimpia.indexOf("/")>-1){ //si es -1 significa que no encontro un "/" en cambio si es mayor, significaria que si hay un "/"
       var [rutaPrincipal, indice] = rutaLimpia.split("/"); //el split va a buscar un  "/" y creara un array a partir de lo que sobre a la izquierda del slash
    }

    //3.5 ordenar los datos de la data del req
    const data = {
        indice,
        ruta: rutaPrincipal || rutaLimpia, //si no puede utilizar la primer ruta y utilizara la segunda
        query,
        metodo,
        headers,
        payload: buffer
    };

    console.log({ data });

    //3.6 elegir el manejador dependiendo de la ruta y asignarle la funcion que el enrutador tiene //handler
    let handler;
     if(
        data.ruta && 
        enrutador[data.ruta] && 
        enrutador[data.ruta][metodo]
    ) { //deben existir ambos para que se ejcute el if
        handler = enrutador[data.ruta][metodo];
    }else{
        handler = enrutador.noEncontrado;
    }

    //4. ejecutar handler (manejador) para enviar la respuesta
    if (typeof handler === "function") {
        handler(data, (statusCode = 200, mensaje)=>{
            const respuesta = JSON.stringify(mensaje);
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode);
            //linea donde realmente ya estamos respondiendo a la aplicacion cliente
            res.end(respuesta);
        });
    }
    //respuestas segun la ruta
  });
};