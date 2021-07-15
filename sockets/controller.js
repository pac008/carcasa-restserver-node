const { Socket } = require("socket.io")
const { comprobarJWT } = require("../helpers")
const { ChatMensajes } = require('../models');

const chatMensajes = new ChatMensajes();

const socketController = async ( socket = new Socket(), io ) => {

    const usuario = await comprobarJWT( socket.handshake.headers['x-token']);
    if ( !usuario ) {
        return socket.disconnect();
    }
    //Agregar el usuario conectado
    chatMensajes.conectarUsuario( usuario );
    io.emit('usuarios-activos', chatMensajes.usuariosArr );
    socket.emit('recibir-mensajes', chatMensajes.ultimos10 );

    //Conectarlo a una sala especial
    socket.join( usuario.id )

    //Limpiar cuando alguien se desconecta

    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario( usuario.id ); 
        io.emit('usuarios-activos', chatMensajes.usuariosArr );
    });
    
    socket.on('enviar-mensaje', ({ uid, txtMensaje }) => { 

        if( uid ){
            //Mensaje Privado
            socket.to( uid ).emit('mensaje-privado',{ de: usuario.nombre, txtMensaje });
        } else {
            chatMensajes.enviarMensaje( txtMensaje, usuario.id, usuario.nombre );
            io.emit('recibir-mensajes', chatMensajes.ultimos10 );
        }
    });

}

module.exports = {
    socketController
}