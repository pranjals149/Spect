const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
// UUID will allow us to have a unique id ...
const { v4: uuidv4 } = require('uuid');

//Peer.js
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
})

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
})

//Socket connection
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
        //Listen to the message and receive it
        socket.on('message', message => {
            io.to(roomId).emit('createMessage', message)
        })
    })
})

//Listen to Server
server.listen(process.env.PORT || 3030);

