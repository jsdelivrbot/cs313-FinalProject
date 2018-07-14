$(function () {
    var socket = io();
    $.ajax({
        type:'GET',
        success:$('form').submit(function(){
      socket.emit('chat message', $('#message').val(), document.getElementById("nameOfUser").innerHTML);
      $('#message').val('');
      return false;    
    })
});
    socket.on('chat message', function(msg, name){
      $('#messages').append($('<li>').text(name +":" + msg));
    });
  });

  function myFunction() {
    var person = prompt("Please enter your name", "Jane Doe");
        sessionStorage.setItem("firstPerson", person);
        document.getElementById("nameOfUser").innerHTML = person;
}

