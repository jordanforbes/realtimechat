const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser } = require('./utils/users')
const { format } = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server)

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName="Chat Bot"

//run when client connects 
io.on('connection', socket => {
    console.log('New WS Connection...');
    socket.on('joinRoom', ({username, room})=>{

        socket.join('')

        //welcome current user
        socket.emit('message', formatMessage(botName,'Welcome to ChatCord!'));
        
        //Broadcast when a user connects
        socket.broadcast.emit('message', formatMessage(botName,'A user has joined the chat')
        );
    })


    //runs when client disconnects 
    socket.on('disconnect', ()=>{
        io.emit('message', formatMessage(botName,'A user has left the chat'));
    } );

    // listen for chatMessage
    socket.on('chatMessage', (msg)=>{
        // console.log(msg)
        io.emit('message', formatMessage('USER',msg));
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));