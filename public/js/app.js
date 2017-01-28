let socket = io();

const scrollToBottom = () => {
  let messages = $('#messages');
  let newMessage = messages.children('li:last-child');
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('newMessage', (message) =>{
  let formattedTime = moment(message.createAt).fromNow();
  let template = $('#message-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    time: formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
  let formattedTime = moment(message.createAt).fromNow();
  let template = $('#location-message-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    time: formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
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
