const { createClient, obtainListClients, updateClient, deleteClient } = require("../controllers/client");
const { userConnected, userDisconnected } = require("../controllers/sockets");
const { obtainUsers } = require("../controllers/user");
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

            this.io.emit('list-users', await obtainUsers());

            socket.emit('list-clients', await obtainListClients());
            socket.on('list-clients', async() => {
                this.io.emit('list-clients', await obtainListClients());
            })
            

            socket.on('create-client', async(payload) => {
                const client = await createClient(payload);
                socket.emit('create-client', client);
                this.io.emit('list-clients', await obtainListClients());
            })
            
            socket.on('update-client', async(payload) => {
                const client = await updateClient(payload);
                socket.emit('update-client', client);
                this.io.emit('list-clients', await obtainListClients());
            })
            
            socket.on('delete-client', async(payload) => {
                const client = await deleteClient(payload);
                socket.emit('delete-client', client);
                this.io.emit('list-clients', await obtainListClients());
            })

            socket.on('disconnect', async() => {
                await userDisconnected(uid);
            })
        })
    }
}

module.exports = Sockets;