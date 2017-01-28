let socket = io();
socket.on('connect', () => {
  console.log('i am connect to the server');
});

socket.on('newMessage', (message) =>{
  let li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  let li = $('<li></li>');
  let a = $('<a target="_blank"> My current location</a>');
  li.text(`${message.from}`);
  a.attr('href', message.url);
  li.append(a);
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

let locationButton = $('#send-location');
locationButton.on('click', (e) => {
  if (!navigator.geolocation) {
    return alert('geolocation is not support in your browser');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, (error) => {
    alert('Unable to access your location.');
  })
});
