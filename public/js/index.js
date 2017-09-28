var socket = io();
socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnected', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});
