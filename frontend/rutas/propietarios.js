module.exports =  function propietariosHandler(propietarios){
    return {
        get: (data, callback) => { //creamos la ruta y el handler(es el manejador de la ruta)
            if(typeof data.indice !== "undefined"){
                console.log("handler propietarios",{data});
                if(propietarios[data.indice]) { 
                    return callback(200, propietarios[data.indice]);
                }
                return callback(404, {
                    mensaje: `propietario de indice ${data.indice} no encontrado`,
                }); //ponemos este collback pera que no llegue a la linea de abajo
            }
            callback(200, propietarios); //si se envia este callback significa que se encontro el propietario
        },
        post: (data, callback) => { 
            propietarios.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => { //recordar que metodo put se utiliza para editar elementos ya existentes
            if(typeof data.indice !== "undefined"){ //si el indice  es diferente a undefined si entra al if
                if(propietarios[data.indice]) { 
                    propietarios[data.indice] = data.payload;
                    return callback(200, propietarios[data.indice]);
                }
                return callback(404, {
                    mensaje: `Monoplaza de indice ${data.indice} no encontrado`,
                }); //ponemos este collback pera que no llegue a la linea de abajo
            }
            callback(400, {mensaje: "indice no enviado"}); //si se envia este callback significa que se encontro el monoplaza
        },
        delete:(data, callback) => { //recordar que metodo put se utiliza para editar elementos ya existentes
            if (typeof data.indice !== "undefined"){ //si el indice  es diferente a undefined si entra al if
                if(propietarios[data.indice]) { 
                    propietarios = propietarios.filter( //va a ser igual al mismo array verificando todos los elementos
                        (_propietario, indice)=> indice != data.indice
                        ); //no debemos poner doble = para que no diferencie entre tipo de elemento
                    return callback(204, {mensaje: `elmento con ${data.indice} eliminado`});
                }
                return callback(404, {
                    mensaje: `Propietario de indice ${data.indice} no encontrado`,
                }); //ponemos este collback pera que no llegue a la linea de abajo
            }
            callback(400, {mensaje: "indice no enviado"}); //si se envia este callback significa que se encontro el monoplaza
            },
        };
    }




   