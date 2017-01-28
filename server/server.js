const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const publicPath = path.join(__dirname, ('../public'));
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('new user connected to the server');

  //welcome for admin
  socket.emit('newMessage', {
    from: 'admin',
    text: 'Welcome to wechat',
    createAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'new user Has joined',
    createAt: new Date().getTime()
  });

  socket.on('createMessage', (newMessage) => {
    console.log('incoming message', newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('user has left');
  });
});


server.listen(PORT, () =>{
  console.log(`app started on port ${PORT}`);
})
