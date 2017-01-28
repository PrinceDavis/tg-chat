const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, ('../public'));
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('new user connected to the server');

  //welcome for admin
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to wechat'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A user has joined'));

  socket.on('createMessage', (newMessage, callback) => {
    console.log('incoming message', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords, callback) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
    callback('acknowledged');
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('newMessage', generateMessage('User', 'Has left'));
  });
});


server.listen(PORT, () =>{
  console.log(`app started on port ${PORT}`);
})
