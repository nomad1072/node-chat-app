const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// socket.emit form Admin text Welcome to chat app
// socket.broadcast.emit from Admin text New user joined

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || ! isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.leave('The Office Fans')
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        //io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(message.txt)) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }


    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin: ', `${user.name} has left.`));
        }
    });


});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
