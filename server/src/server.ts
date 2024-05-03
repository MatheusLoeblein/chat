import { Server } from 'socket.io';

const io = new Server({ cors: { origin: 'http://localhost:3000' } });

let connectionsCount = 0;

io.on('connection', (socket) => {
    connectionsCount++;
    console.log('Nova conexão! Total de conexões:', connectionsCount);

    socket.on('event', (event) => {
        console.log('EVENTO ->', event)
        io.emit('event', event)
    })

    socket.on('disconnect', () => {
        connectionsCount--;
        console.log('Conexão perdida! Total de conexões:', connectionsCount);
    });
});






io.listen(7454);
