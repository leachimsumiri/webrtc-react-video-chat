const app = require("express")();
const server = require("http").createServer(app);
const socketio = require("socket.io")(server);
var users = {};

socketio.on('connection', function(socket){

    if (users[socket.id] === null || users[socket.id] === undefined) {
        users[socket.id] = socket.id;
    }

    socket.emit("yourID", socket.id);
    socketio.sockets.emit("allUsers", users);

    socket.on('disconnect', function(){
        delete users[socket.id];
    });

    socket.on("callUser", function(data){
        socketio.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    });

    socket.on("acceptCall", function(data){
        socketio.to(data.to).emit('callAccepted', data.signal);
    });

});

server.listen(8080, function(){console.log('server is running on port 8080')});