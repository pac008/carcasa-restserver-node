
const url = ( window.location.hostname.includes('localhost') )
? 'http://localhost:8080/api/auth/'
: 'https://restserver-nod3.herokuapp.com/api/auth/';

let usuario = null;
let socket = null;

//Referencias 

const txtUid = document.querySelector('#txtUid');
const mensaje = document.querySelector('#mensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');

const validarJWT = async () => {

    const token = localStorage.getItem('token') || '';
    if( token.length <= 10 ) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch( url, {
        headers: {'x-token': token }
    });

    const { usuarioAutenticado: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB);
    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();
}

btnSalir.addEventListener('click', () => {
   
    socket.emit('usuario-logout', usuario.uid );
    signOut();
    window.location = 'index.html';
})

const conectarSocket = async () => {

    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Socket online');
    });
    socket.on('disconnect', () => {
        console.log('Socket offline');
    });

    socket.on('recibir-mensajes', recibirMensaje );

    socket.on('usuarios-activos', dibujarUsuarios )
    socket.on('mensaje-privado', ( payload ) => {
            console.log('privado ',payload );
    })
}
const signOut = () => {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    }  

const dibujarUsuarios = ( usuarios = [] ) => {

    let usersHtml = '';

    usuarios.forEach(({ nombre, uid }) => {

        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${ nombre }</h5>
                    <span class="fs-6 text-muted">${ uid }</span>
                </p>
            </li>
        `;
    })
    ulUsuarios.innerHTML = usersHtml;
}

const recibirMensaje = ( mensajes = [] ) => {

    let mensajesHTML = '';

    mensajes.forEach(({ nombre, mensaje }) => {

        mensajesHTML += `
            <li>
                <p>
                    <span class="text-primary">${ nombre }</span>
                    <span>${ mensaje }</span>
                </p>
            </li>
        `;
    })
    ulMensajes.innerHTML = mensajesHTML;
}

mensaje.addEventListener('keyup', ({keyCode}) => {
    
    const txtMensaje = mensaje.value;
    const uid        = txtUid.value;
    if( keyCode !== 13 ) return;
    if( txtMensaje === 0 ) return;

    socket.emit('enviar-mensaje', { txtMensaje, uid } );

    mensaje.value = '';

})
const main = async () => {

    await validarJWT();
}

main();

