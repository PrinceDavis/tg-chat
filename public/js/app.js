let socket = io();
socket.on('connect', () => {
  console.log('i am connect to the server');
});

socket.on('newMessage', (message) =>{
  console.log('message from server', message);
});



socket.on('disconnect', () =>  {
  console.log('disconnected from server');
});
