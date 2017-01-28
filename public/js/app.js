let socket = io();
socket.on('connect', () => {
  console.log('i am connect to the server');
});

socket.on('newMessage', (message) =>{
  console.log('message from server', message);
  let li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});



socket.on('disconnect', () =>  {
  console.log('disconnected from server');
});

$('#message-form').on('submit', (e) => {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, (data) => {
    console.log(data);
  });
  $('[name=message]').val('');
});
