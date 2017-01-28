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

  socket.on('createMessage', (newMessage) => {
    console.log('incoming message', newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createAt: new Date().getTime()
    })
  });

  socket.on('disconnect', () => {
    console.log('user has left');
  });
});


server.listen(PORT, () =>{
  console.log(`app started on port ${PORT}`);
})
