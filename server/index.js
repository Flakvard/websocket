const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

const Connection = require('../common/connection.js')


const server = httpServer.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

io.on('connection', (socket) => {
    console.log('A connection has been created with ' + socket.id)
  
    socket.on(Connection.change, (changes) => {
      socket.broadcast.emit(Connection.change, changes);
    });
  
    socket.on(Connection.create, (create) => {
      socket.broadcast.emit(Connection.create, create);
    });
});