// Node server which will handle socket I/O connections
const io = require("socket.io")(9000, {
  cors: {
    origin: "*",
  },
});
const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    // console.log("New user", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});


// Node server which will handle socket I/O connections
// var express = require('express')
// var cors = require('cors')
// var app = express()
// app.use(cors())
// const io=require('socket.io')(9000);
// const cors=require("cors");
// const io = require("socket.io")(9000, {
//         cors: {
//               origin: "*",
//             }
//           });
// const users={};

// io.on('connection', socket =>{
//     socket.on('new-user-joined', name=>{
//         // console.log("New user", name);
//         users[socket.id]=name;
//         socket.brodcast.emit('user-joined', name);
//     });
//     socket.on('send', message=>{
//         socket.brodcast.emit('recieve', {message:message, name:users[socket.id]}) //user-->users
//     });
//     socket.on('disconnect', message=>{
//         socket.broadcast.emit('left', users[socket.id]);
//         delete users[socket.id];
//     });
// });
