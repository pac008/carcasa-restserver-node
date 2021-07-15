class Mensaje {
    constructor( mensaje, uid, nombre){
        this.uid = uid;
        this.mensaje = mensaje;
        this.nombre  = nombre;
    }
}

class ChatMensajes {
    constructor(){
        this.mensajes = [];
        this.usuarios = {};
    }

    get ultimos10() {
        this.mensajes = this.mensajes.splice(0,10)
        return this.mensajes;
    }

    get usuariosArr() {
        return Object.values( this.usuarios );
    }

    enviarMensaje( mensaje, uid, nombre ){
        this.mensajes.unshift( new Mensaje( mensaje, uid, nombre) );
        
    }

    conectarUsuario( usuario ) {

        this.usuarios[usuario.id] = usuario;
    }

    desconectarUsuario( id ) {
        delete this.usuarios[id];
    }
}

module.exports = ChatMensajes;