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
      var chatMsg = name + ": " + msg;
      var numberOfMessages = localStorage.getItem("numberOfMsg");
      numberOfMessages++;
      localStorage.setItem("numberOfMsg", numberOfMessages);
      localStorage.setItem(numberOfMessages, chatMsg);
      localStorage.setItem("lastname", "Smith");
      $('#messages').append($('<li>').text(name + ": " + msg));
      var element = document.getElementById('messages');
      element.scrollTop = element.scrollHeight - element.clientHeight;
        });

        socket.on('disconnect', function () {
          sessionStorage.setItem("numberOfUsers") = io.engine.clientsCount;
        });
  });

  function myFunction() {
    var person = prompt("Please enter your name", "Jane Doe");
        sessionStorage.setItem("firstPerson", person);
        document.getElementById("nameOfUser").innerHTML = person;
}

$(window).load(function(){
  for(i = 1; i <= localStorage.getItem("numberOfMsg"); i++)
    $('#messages').append($('<li>').text(localStorage.getItem(i)));
})

function clearCache(){
  localStorage.clear();
  document.getElementById("messages").innerHTML = "";
}
