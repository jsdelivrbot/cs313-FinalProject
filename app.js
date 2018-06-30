/* app.js */

// require and instantiate express
const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs')
// blog home page
app.get('/',function(req,res){
  res.render('chatPage')
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.set('port', process.env.PORT || 8888)

http.listen(app.get('port'))

console.log('listening on port 8888')


