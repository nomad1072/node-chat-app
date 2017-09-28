var socket = io();
socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: 'gaandu@gmail.com',
    //     text: 'Hey! This is Andrew'
    // });

    // socket.emit('createMessage', {
    //     from: 'gaandu123@gmail.com',
    //     text: 'Hello, 12345'
    // });
});

socket.on('disconnected', function () {
    console.log('disconnected from server');
});

// socket.on('newEmail', function (email) {
//     console.log('New email', email);
// });

socket.on('newMessage', function (message) {
    console.log('New message', message);
});
