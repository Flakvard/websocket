var express = require('express');
var app = express();
var socket = require('socket-io')

var server = app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

var socketIO = socket(server);

socketIO.on('connection', (socket)=> {
    console.log('A connection has been created with ' + socket.id)
});

// const port = process.env.PORT || port;
// const www = process.env.WWW || './';
// app.use(express.static(www));
// console.log(`serving ${www}`);
// app.get('*', (req, res) => {
//     res.sendFile(`index.html`, { root: www });
// });
// app.listen(port, () => console.log(`listening on http://localhost:${port}`));
// 