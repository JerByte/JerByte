module.exports =  function consultasHandler({
    consultas, 
    mecanicos, 
    autos
}){
    return {
        get: (data, callback) => { //creamos la ruta y el handler(es el manejador de la ruta)
            if(typeof data.indice !== "undefined"){
                console.log("handler consultas",{data});
                if(consultas[data.indice]) { 
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, {
                    mensaje: `consulta de indice ${data.indice} no encontrado`,
                }); //ponemos este collback pera que no llegue a la linea de abajo
            }
            const consultaConRelaciones = consultas.map((consulta)=> (
                {...consulta,
                     auto: {...autos[consulta.auto], id: consulta.auto },
                     mecanico: {...mecanicos[consulta.mecanico], id: consulta.mecanico },
                }));
            callback(200, consultaConRelaciones); //si se envia este callback significa que se encontro el consulta
        },
        post: (data, callback) => { 
            let nuevaConsulta = data.payload
            nuevaConsulta.fechaCreacion = new Date();
            nuevaConsulta.fechaEdicion = null;
            consultas = [...consultas, nuevaConsulta] //consultas es = a lo que haya enconsultas(por eso el ...), mas la nueva consulta
            callback(201, nuevaConsulta);
        },
        put: (data, callback) => { //recordar que metodo put se utiliza para editar elementos ya existentes
            if(typeof data.indice !== "undefined") { //si el indice  es diferente a undefined si entra al if
                if(consultas[data.indice]) { 
                   const { fechaCreacion } = consultas[data.indice];
                    consultas[data.indice] = {
                        ...data.payload, //es igual a todo lo queviene en el payload 
                        fechaCreacion, //mas la fecha de creacion 
                        fechaEdicion: new Date(), //mas la fechsa de edicion
                    };
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, {
                    mensaje: `Monoplaza de indice ${data.indice} no encontrado`,
                }); //ponemos este collback pera que no llegue a la linea de abajo
            }
            callback(400, {mensaje: "indice no enviado"}); //si se envia este callback significa que se encontro el monoplaza
        },
        delete:(data, callback) => { //recordar que metodo put se utiliza para editar elementos ya existentes
            if (typeof data.indice !== "undefined"){ //si el indice  es diferente a undefined si entra al if
                if(consultas[data.indice]) { 
                    consultas = consultas.filter( //va a ser igual al mismo array verificando todos los elementos
                        (_consulta, indice)=> indice != data.indice
                        ); //no debemos poner doble = para que no diferencie entre tipo de elemento
                    return callback(204, {mensaje: `elmento con ${data.indice} eliminado`});
                }
                return callback(404, {
                    mensaje: `consulta de indice ${data.indice} no encontrado`,
                }); //ponemos este collback pera que no llegue a la linea de abajo
            }
            callback(400, {mensaje: "indice no enviado"}); //si se envia este callback significa que se encontro el monoplaza
            },
        };
    }




   