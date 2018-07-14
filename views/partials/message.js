window.onload = $(function () {
    var socket = io();
    $.ajax({
        type:'GET',
        success:$('form').submit(function(){
      socket.emit('chat message', $('#message').val());
      $('#message').val('');
      return false;    
    })
});

    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
  });
