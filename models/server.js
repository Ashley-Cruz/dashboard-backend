const express  = require('express');
const cors     = require('cors');
const http     = require('http');
const socketio = require('socket.io');

const Sockets  = require('./sockets');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api',
            client: '/api/client',
        }

        //Conectar a base de datos
        this.conectDB();

        // Http server
        this.server = http.createServer(this.app);

        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );

        //Middlewares
        this.middlewares();

        //Sockets
        this.socketsConfig();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Público
        this.app.use(express.static('public'));
    }

    socketsConfig() {
        new Sockets( this.io );
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.client, require('../routes/client'));
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }
}

module.exports = Server;