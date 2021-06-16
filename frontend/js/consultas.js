const listaConsultas = document.getElementById("lista-consultas");
const auto = document.getElementById("auto");
const mecanico = document.getElementById("mecanico");
const historia = document.getElementById("historia");
const diagnostico = document.getElementById("diagnostico");
const indice = document.getElementById("indice");
const btnGuardar= document.getElementById("btn-guardar");

console.log({auto, mecanico, historia, diagnostico});

let consultas = [];
let autos = [];

const url = "http://localhost:5000";

async function listarConsultas () {
    const entidad = "consultas";
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const consultasDelServidor = await respuesta.json();
        if(Array.isArray(consultasDelServidor)){
          consultas = consultasDelServidor;
        }
        if(respuesta.ok) {
            const htmlConsultas = consultas.map(
                (consulta, indice)=> (
               ` <tr>
                <th scope="row">${indice}</th>
                <td>${consulta.auto.propietario} </td>                
                <td>${consulta.mecanico.nombre} ${consulta.mecanico.apellido}</td>
                <td>${consulta.fechaCreacion}</td>
                <td>${consulta.fechaEdicion}</td>
                <td>${consulta.historia}</td>
                <td>${consulta.diagnostico}</td>
                <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" id="" class="btn btn-warning editar"><i class="far fa-edit"></i></button>
                   </div>
                </td>
            </tr>`
            )).join("");
            listaConsultas.innerHTML = htmlConsultas;
            Array.from(document.getElementsByClassName("btn btn-warning editar")).forEach(
                (botonEditar, index) => (botonEditar.onclick = editar(index))
                );
            }
        } catch (error) {  
            console.log({ error });
            $(".alert-danger").show();
          }
}


async function listarAutos () { //encesta funcion voy a listar los autos para que los pueda seleccionar en el modal de consultas
    const entidad = "autos";
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const autosDelServidor = await respuesta.json(); //convertimos la respuesta en un json
        if(Array.isArray(autosDelServidor)){ //si autos del servidor es un array  va a ser = a autos
          autos = autosDelServidor;
        }
        if(respuesta.ok) { // .ok es una propiedad booleana que significa que si larespuesta esta biense dara el if
            autos.forEach((_auto, indice)=> { //utiizamos forEach con el fin de obter un nuevo objeto
            const opcionActual = document.createElement("option"); //creamos un elemento nuevo en forma de options
            opcionActual.innerHTML = _auto.propietario; //mostramos esto en el HTML
            opcionActual.value = indice; //aclaramos que el value de opcion actual es = (indice)
            auto.appendChild(opcionActual);
                });
            }
        } catch (error) {  
            console.log({ error });
            $(".alert-danger").show();
     }
}

listarAutos();

async function listarMecanicos () { 
    const entidad = "mecanicos";
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const mecanicosDelServidor = await respuesta.json(); 
        if(Array.isArray(mecanicosDelServidor)){ 
          mecanicos = mecanicosDelServidor;
        }
        if(respuesta.ok) { 
            mecanicos.forEach((_mecanico, indice)=> { 
            const opcionActual = document.createElement("option"); 
            opcionActual.innerHTML = `${_mecanico.nombre} ${_mecanico.apellido}`; //usamos literal string para poder tener nombre y apellido
            opcionActual.value = indice;
            mecanico.appendChild(opcionActual);
                });
            }
        } catch (error) {  
            console.log({ error });
            $(".alert-danger").show(); 
     }
}
listarMecanicos();

function editar(index) {
    return function cuandoCliqueo() {
        btnGuardar.innerHTML = "Editar";
        $("#exampleModalCenter").modal("toggle");
        const consulta = consultas[index];
        indice.value = index;
        auto.value = consulta.auto.id;
        mecanico.value = consulta.mecanico.id;
        historia.value =  consulta.historia;
        diagnostico.value =  consulta.diagnostico;
    };
}

async function enviarDatos(evento) {
    const entidad = "consultas";
    evento.preventDefault();
    try {
        const datos = {
            auto: auto.value,
            mecanico: mecanico.value,
            historia: historia.value,
            diagnostico: diagnostico.value,
        };
        if(validar(datos) === true){
            const accion = btnGuardar.innerHTML;
            let urlEnvio = `${url}/${entidad}`;
            let method = "POST";
                if (accion === "Editar") {
                     method = "PUT";
                     consultas[indice.value] = datos;//editar
                     urlEnvio += `/${indice.value}`;
            }
            const respuesta = await fetch(urlEnvio, {
                method,
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
                mode: "cors", 
              });
              if(respuesta.ok){
                listarConsultas();
                resetModal();    
            }
            return;
        }
        $(".alert-warning").show();
    } catch (error) {
        console.log({ error });
        $(".alert-danger").show();
    }
}

function resetModal() {
    btnGuardar.innerHTML = "Guardar datos";
    [indice, auto, mecanico, historia, diagnostico].forEach(
        (inputActual) => {
        inputActual.value = "";
        inputActual.classList.remove("is-invalid");
        inputActual.classList.add("is-valid");
    }
 );
    $(".alert-warning").hide();
}



function validar(datos) {
    if(typeof datos !== "object") return false;
    let respuesta = true;
    for(let llave in datos){
        if(datos[llave].length === 0) {
            document.getElementById(llave).classList.add("is-invalid"); //agregamos is.invalid a la clase 
            respuesta = false;
            return respuesta;
        } else {
            document.getElementById(llave).classList.remove("is-invalid");
            document.getElementById(llave).classList.add("is-valid");
        }
    }
    if (respuesta === true) {
        $(".alert-warning").hide()
        $('#btn-guardar').attr("data-dismiss","modal"); //.attr takes 2 parameters, attribute and the value
    };
    return respuesta;
}


btnGuardar.onclick = enviarDatos;

listarConsultas();




