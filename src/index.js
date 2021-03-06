import { createUsuario, deleteUsuario, getUsuario, obtenerUsuarios } from './js/crud';
import './styles.css';


let usuarios;
let tbody = document.querySelector('tbody');
const modalUsuario = document.querySelector('.modalUsuario')
const cerrarModal = document.querySelector('.cerrarModal')
const div = document.createElement('div');
const botonObtener = document.querySelector('.obtener');
const botonCrear = document.querySelector('.crear');
let botonEliminar;
let eventoBotonEliminar;


// funcion para crear las filas con cada usuario
const crearFilas = (usuario) => {

    const html = `
        <th scope="row"> ${usuario.id} </th>
        <td> ${usuario.first_name} ${usuario.last_name} </td>
        <td> ${usuario.email} </td>
        <td>
            <img class="img-thumbnail" src="${usuario.avatar}">
        </td>
        <td>
            <button class="eliminar btn btn-danger">
                Eliminar
            </button>
        </td>
    `

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tbody.appendChild(tr);

    botonEliminar = document.querySelectorAll('.eliminar');
    eventoBotonEliminar(botonEliminar.length - 1, usuario);
}


// funcion para hacer la peticion y crear las filas
const init = async () => {
    usuarios = await obtenerUsuarios();
    (await obtenerUsuarios()).forEach(usuario => crearFilas(usuario));
}

init();


// evento para cerrar el modal de crear usuario
cerrarModal.addEventListener('click', () => {
    div.innerHTML = '';
    modalUsuario.classList.toggle('d-none');

    // habilitar botones cuando se cierra el modal
    for(let boton of botonEliminar){
        boton.removeAttribute('disabled', '');
    }

    botonObtener.removeAttribute('disabled', '');
    botonCrear.removeAttribute('disabled', '');
});


// evento para el boton de obtener usuario
botonObtener.addEventListener('click', async () => {
    const usuario = await getUsuario();
    usuarios.push(usuario);
    crearFilas(usuario)
});


// evento para mostrar el formulario de crear usuario
const mostrarInput = () => {

    botonCrear.addEventListener('click', async () => {
    
        const html = `
        <form>
            <label for="first_name" class="form-label text-white">Nombre</label>
            <input type="text" id="first_name" name="first_name"
                class="form-control mb-2 anchoInput"
                required>
            <label for="last_name" class="form-label text-white">Apellido</label>
            <input type="text" id="last_name" name="last_name"
                class="form-control mb-2 anchoInput"
                required>
            <label for="email" class="form-label text-white">Email</label>
            <input type="email" id="email" name ="email"
                class="form-control mb-2 anchoInput" 
                required>
            <label for="avatar" class="form-label text-white">URL Avatar</label>
            <input type="text" id="avatar" name ="avatar"
                class="form-control mb-2 anchoInput">
            <input type="submit" 
                class="form-control anchoSubmit bg-success text-white float-end" 
                value="Aceptar">
        </form>
        `;
    
        div.innerHTML = html;
        div.classList.add('position-absolute', 'top-50', 'start-50', 'translate-middle')
        modalUsuario.appendChild(div);
        modalUsuario.classList.toggle('d-none');
    
        // deshabilitar botones mientras el modal esta activo
        for(let boton of botonEliminar){
            boton.setAttribute('disabled', '');
        }
    
        botonObtener.setAttribute('disabled', '');
        botonCrear.setAttribute('disabled', '');
    
        // obtener la informacion del formulario en un objeto
        document.querySelector('form')
            .addEventListener('submit', async (e) => {
                e.preventDefault()
                const data = Object.fromEntries(
                    new FormData(e.target)
                )
                data.avatar = data.avatar || './assets/img/noPic.webp'
                const usu = await createUsuario(data);
                usuarios.push(usu);
                crearFilas(usu)
                div.innerHTML = '';
                modalUsuario.classList.toggle('d-none');
    
                // habilitar botones cuando se cierra el modal
                for(let boton of botonEliminar){
                    boton.removeAttribute('disabled', '');
                }
    
                botonObtener.removeAttribute('disabled', '');
                botonCrear.removeAttribute('disabled', '');
            })
    });
} 

mostrarInput();


// evento para el boton de eliminar usuario
eventoBotonEliminar = (i, usuario) => {
    botonEliminar[i].addEventListener('click', async () => {
        const resp = await deleteUsuario(usuario);
        usuarios = usuarios.filter(usu => usu !== usuario);
        tbody.innerHTML = ``
        botonEliminar = []
        usuarios.forEach(usuario => crearFilas(usuario));
    });
}


