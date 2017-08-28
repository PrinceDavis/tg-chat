/*jshint esversion: 6 */
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');


const publicPath = path.join(__dirname, ('../public'));
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('join', (params, callback) =>{
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name is required');
    }

    socket.join(params.room);

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserlist', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to TchatApp'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name}, has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);
    if (!user || !isRealString(message.text)) {
      return callback("ummm, You have to actually say something");
    }

    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords, callback) => {
    let user = users.getUser(socket.id);
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords));
    callback('acknowledged');
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserlist', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
  });
});


server.listen(PORT, () =>{
  console.log(`app started on port ${PORT}`);
})
