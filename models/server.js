
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');

const { dbConection } = require('../database/config');
const fileUpload = require('express-fileupload');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);
        //Rutas
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            uploads:    '/api/uploads',
            usuarios:   '/api/usuarios'
        }
        //Conectar a la base de datos
        this.conectarDB();
        //middlerwares
        this.middlewares();

        //rutas de la app
        this.router();

        //Sockets
        this.sockets();
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

        // Uploads - subidas de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    router() {
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.buscar, require('../routes/buscar') );
        this.app.use( this.paths.categorias, require('../routes/categorias') );
       this.app.use( this.paths.productos, require('../routes/productos') );
       this.app.use( this.paths.uploads, require('../routes/uploads') );
       this.app.use( this.paths.usuarios, require('../routes/usuarios') );
    }

    sockets() {
        this.io.on('connection', (socket) => socketController( socket, this.io ) )
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en: ', this.port );
        });
    }
}


module.exports = Server;