import { createUsuario, deleteUsuario, getUsuario, obtenerUsuarios } from './js/crud';
import './styles.css';


let indice = 0;
let usuarios;
let i = 0;
let tbody = document.querySelector('tbody');
const modalUsuario = document.querySelector('.modalUsuario')
const cerrarModal = document.querySelector('.cerrarModal')
const div = document.createElement('div');
const botonObtener = document.querySelector('.obtener');
const botonCrear = document.querySelector('.crear');
let botonActualizar;
let botonEliminar;
let eventoBotonEliminar;


// funcion para crear las filas con cada usuario
const crearFilas = (usuario) => {

    indice++

    const html = `
        <th scope="row"> ${usuario.id} </th>
        <td> ${usuario.first_name} ${usuario.last_name} </td>
        <td> ${usuario.email} </td>
        <td>
            <img class="img-thumbnail" src="${usuario.avatar}">
        </td>
        <td>
            <button class="actualizar btn btn-secondary">Actualizar</button>
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
    // console.log(botonEliminar);

}


// funcion para hacer la peticion y crear las filas
const init = async () => {
    indice = 0;
    i = 0;
    usuarios = await obtenerUsuarios();
    (await obtenerUsuarios()).forEach(usuario => crearFilas(usuario));

    // for(let i = 0; i < botonEliminar.length; i++){
    //     eventoBotonEliminar(i, usuarios[i]);
    // }
}
init();


// evento para cerrar el modal de crear usuario
cerrarModal.addEventListener('click', () => {
    div.innerHTML = '';
    modalUsuario.classList.toggle('d-none');
});


// evento para el boton de obtener usuario
botonObtener.addEventListener('click', async () => {
    const usuario = await getUsuario();
    usuarios.push(usuario);
    console.log(usuarios);
    crearFilas(usuario)

    // eventoBotonEliminar(botonEliminar.length - 1, usuario);
});


// evento para el boton de crear usuario
// botonCrear.addEventListener( 'click', async() => {
//     const usuario = await createUsuario(usuario);
//     usuarios.push(usuario);
//     console.log(usuarios);
//     crearFilas(usuario)

//     eventoBotonEliminar(botonEliminar.length - 1, usuario);    

// evento para el boton de crear usuario
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
        <input type="submit" 
            class="form-control anchoSubmit bg-success text-white float-end" 
            value="Aceptar">
    </form>
    `;

    div.innerHTML = html;
    div.classList.add('position-absolute', 'top-50', 'start-50', 'translate-middle')
    modalUsuario.appendChild(div);
    modalUsuario.classList.toggle('d-none');
    
    // obtener la informacion del formulario en un objeto
    document.querySelector('form')
    .addEventListener('submit', async(e) => {
            e.preventDefault()
            const data = Object.fromEntries(
                new FormData(e.target)
            )
            console.log(data);
            data.avatar = './assets/img/noPic.webp'
            const usu = await createUsuario(data);
            usuarios.push(usu);
            crearFilas(usu)
            div.innerHTML = '';
            modalUsuario.classList.toggle('d-none');
        })
});




// evento para el boton de eliminar usuario
eventoBotonEliminar = (i, usuario) => {
    botonEliminar[i].addEventListener('click', async () => {
        const resp = await deleteUsuario(usuario);
        console.log(usuario);
        console.log(resp);
        console.log(usuarios);
        usuarios = usuarios.filter(usu => usu !== usuario);
        console.log(usuarios);
        tbody.innerHTML = ``
        botonEliminar = []
        usuarios.forEach(usuario => crearFilas(usuario));
    });
}


