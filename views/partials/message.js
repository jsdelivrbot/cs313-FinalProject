$(function () {
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
      $('#messages').append($('<li>').text(localStorage.getItem("lastname") +":" + msg));
    });
  });

  function myFunction() {
    var person = prompt("Please enter your name", "Jane Doe");
    localStorage.setItem("lastname", person);
    if (person != null) {
        document.getElementById("nameOfUser").innerHTML =
        "Your name is: " + person ;
    }
}