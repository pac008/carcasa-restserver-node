
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';
        
        //Conectar a la base de datos
        this.conectarDB();
        //middlerwares
        this.middlewares();

        //rutas de la app
        this.router();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        //cors
        this.app.use( cors() )

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio público
        this.app.use( express.static('public') );
    }

    router() {
       this.app.use( this.authPath, require('../routes/auth') );
       this.app.use( this.usuariosPath, require('../routes/usuarios') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en: ', this.port );
        });
    }
}


module.exports = Server;