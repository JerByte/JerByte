const listaPropietarios = document.getElementById("lista-propietarios");
const pais = document.getElementById("pais");
const indice = document.getElementById("indice");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");
const url = "http://localhost:5000/propietarios";

let propietarios = [];


async function listarPropietarios() {
    try {
        const respuesta = await   fetch(url);
    const propietariosDelServer = await respuesta.json();
    if(Array.isArray(propietariosDelServer)){
        propietarios = propietariosDelServer;
    }
    if(propietarios.length > 0){
        const htmlPropietarios = propietarios
        .map(
            (propietario, index)=>` <tr>
            <th scope="row">${index}</th>
            <td>${propietario.nombre}</td>
            <td>${propietario.apellido}</td>
            <td>${propietario.pais}</td>
            <td><div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-warning editar"><i class="far fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
               </div>
            </td>
        </tr>`).join("");
        listaPropietarios.innerHTML = htmlPropietarios;
        Array.from(document.getElementsByClassName("editar")).forEach(
            (botonEditar, index)=>botonEditar.onclick = editar(index)
            ); //llamamos a la funcion pasandole el index 
        Array.from(document.getElementsByClassName("eliminar")).forEach(
            (botonEliminar, index)=>botonEliminar.onclick = eliminar(index)
            );
        return;
    }
    listaPropietarios.innerHTML = ` <tr>
           <td colspan="5" id="listaVacia">No hay propietarios</td> 
       </tr>`;
    } catch (error) {
        console.log({ error }); //esto no se hace normalmente en produccion, solo lo aplicamos por temas de aprendizaje
        $(".alert").show();
    }
    
}

async function enviarDatos(evento) {
     evento.preventDefault();
     try {
        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            pais: pais.value,
        };
        const accion = btnGuardar.innerHTML;
        let urlEnvio = url;
        let method = "POST"
        if (accion === "Editar") {
            urlEnvio += `/${indice.value}`;
            method = "PUT";
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
            listarPropietarios();
            resetModal();    
          }
     } catch (error) {
        console.log({ error });
        $(".alert").show();
     }
    
}

function editar(index) {
    return function cuandoCliqueo() {
        btnGuardar.innerHTML = "Editar"
        $("#exampleModal").modal("toggle")
        const propietario = propietarios[index];
        indice.value = index;
        nombre.value = propietario.nombre;
        apellido.value = propietario.apellido;
        pais.value =  propietario.pais;
    };
}

function resetModal() {
    indice.value = "";
    nombre.value = "";
    apellido.value = "";
    pais.value =  "";
    btnGuardar.innerHTML = "Guardar datos"
}

function eliminar(index) {
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar () {
        try {
         const respuesta = await fetch(urlEnvio, {
             method: "DELETE",
             });
            if(respuesta.ok){
             listarPropietarios();
            } 
        } catch (error) {
            console.log({ error });
            $(".alert").show();
        }
      
        listarPropietarios();
    }
}

listarPropietarios();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;