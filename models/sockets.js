const { createClient, obtainListClients } = require("../controllers/client");
const { userConnected, userDisconnected } = require("../controllers/sockets");
const { validateJWT } = require("../helpers/jwt");

class Sockets {

    constructor(io){
        this.io = io;
        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', async(socket) => {
            const [valid, uid] = validateJWT(socket.handshake.query['x-token']);

            if(!valid){
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await userConnected(uid);

            this.io.emit('list-clients', await obtainListClients());
            socket.on('list-clients', async() => {
                this.io.emit('list-clients', await obtainListClients());
            })
            

            socket.on('create-client', async(payload) => {
                const client = await createClient(payload);
                socket.emit('create-client', client);
                this.io.emit('list-clients', await obtainListClients());
            })


            socket.on('disconnect', async() => {
                await userDisconnected(uid);
            })
        })
    }
}

module.exports = Sockets;