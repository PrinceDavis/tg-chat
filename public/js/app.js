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
  let messageTextBox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, (data) => {
    messageTextBox.val('');
  });

});

let locationButton = $('#send-location');
locationButton.on('click', (e) => {
  if (!navigator.geolocation) {
    return alert('geolocation is not support in your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending Location..');
  navigator.geolocation.getCurrentPosition((position) => {

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, (data) =>{
      locationButton.removeAttr('disabled').text('Send Location');
    });
  }, (error) => {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to access your location.');
  })
});
