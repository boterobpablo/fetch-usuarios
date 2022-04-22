import '../css/componentes.css';


const urlUsuarios = 'https://reqres.in/api/users?page=2';
const urlPeticiones = 'https://reqres.in/api/users'


export const obtenerUsuarios = async() => {

    const resp = await fetch(urlUsuarios);
    // desestructura y renombra data por usuarios
    const { data:usuarios } = await resp.json();

    return usuarios
}


export const getUsuario = async() => {

    let id = function getRandomArbitrary() {
        return Math.floor(Math.random() * (13 - 1)) + 1;
      }
    id = id();
    const resp = await fetch(`${urlPeticiones}/${id}`);
    const { data:usuario } = await resp.json();
    console.log(usuario);
    
    return usuario
}


export const createUsuario = async(usuario) => {
    
    const resp = await fetch(`${urlPeticiones}`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: { 'Content-Type': 'application/json'}
    });
    console.log(usuario);
    
    return await resp.json();
}


export const deleteUsuario = async(usuario) => {
    const id = usuario.id;
    const resp = await fetch(`${urlPeticiones}/${id}`, {
        method: 'DELETE',
    })

    return (resp.ok) ? 'Eliminado' : 'No se pudo eliminar';
}