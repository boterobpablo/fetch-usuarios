import { deleteUsuario, getUsuario, obtenerUsuarios } from './js/crud';
import './styles.css';


let indice = 0;
let usuarios;
let i = 0;
let tbody = document.querySelector('tbody');
const botonObtener = document.querySelector('.obtener');
let botonActualizar;
let botonEliminar;
let eventoBotonEliminar;


// funcion para crear las filas con cada usuario
const crearFilas = (usuario) => {

    indice++

    const html = `
        <th scope="row"> ${ usuario.id } </th>
        <td> ${ usuario.first_name } ${ usuario.last_name } </td>
        <td> ${ usuario.email } </td>
        <td>
            <img class="img-thumbnail" src="${ usuario.avatar }">
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
const init = async() => {
    indice = 0;
    i = 0;
    usuarios = await obtenerUsuarios();
    (await obtenerUsuarios()).forEach( usuario => crearFilas(usuario));

    // for(let i = 0; i < botonEliminar.length; i++){
    //     eventoBotonEliminar(i, usuarios[i]);
    // }
}
init();


// evento para el boton de obtener usuario
botonObtener.addEventListener( 'click', async() => {
    const usuario = await getUsuario();
    usuarios.push(usuario);
    console.log(usuarios);
    crearFilas(usuario)

    eventoBotonEliminar(botonEliminar.length - 1, usuario);    
});


// evento para el boton de eliminar usuario
eventoBotonEliminar = (i, usuario) => {
    botonEliminar[i].addEventListener( 'click', async() => {
        const resp = await deleteUsuario(usuario);
        console.log(usuario);
        console.log(resp);
        console.log(usuarios);
        usuarios = usuarios.filter(usu => usu !== usuario);
        console.log(usuarios);
        tbody.innerHTML = ``
        botonEliminar = []
        usuarios.forEach( usuario => crearFilas(usuario));
    });
}


