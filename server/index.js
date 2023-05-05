var express = require('express');
var app = express();
var socket = require('socket.io')
var Connection = require('../common/connection.js')

var server = app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

var socketIO = socket(server);

socketIO.on('connection', (socket)=> {
    console.log('A connection has been created with ' + socket.id)

    socket.on(Connection.change, (changes) => {
        console.log('Changes are: ' + changes);
        socketIO.sockets.emit(Connection.change, changes);
    });

    socket.on(Connection.create, (newData) => {
        console.log('Changes are: ' + newData);
        socketIO.sockets.emit(Connection.create, newData);
    });
});