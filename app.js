/* app.js */

// require and instantiate express
const express = require('express');
var session = require('express-session');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var assignmentsRouter = require('./views/assignments');

// set up sessions
app.use(session({  
	secret: 'mySecret',
	resave: false,
  saveUninitialized: true
}));

// Because we will be using post values, we need to include the body parser module
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');
let roomCode = null;

// blog home page
app.get('/',function(req,res){
  
  if(numUsers(req) > 1){
      res.render('nav');
  }
 else if(numUsers(req) == 0){
    roomCode = { RmCd: Math.random().toString(36).substring(7)};
    req.session.roomcode = roomCode.RmCd;      
    res.render('chatPage', {RC:req.session.roomcode}); 
  }
  else if(numUsers(req) == 1)
  {    
      console.log("Number Of Users " + Object.keys(io.sockets.connected).length);
      res.render('test');
    }
  
})


io.on('connection', function(socket){
      socket.on('chat message', function(msg, name){
      io.emit('chat message', msg, name);
  });

//Whenever someone disconnects this piece of code executed
socket.on('disconnect', function () {
 });
});

app.use('/assignments', assignmentsRouter);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.set('port', process.env.PORT || 8888)

http.listen(app.get('port'))

console.log('listening on port 8888')

function numUsers(req)
{
  req.session.numberOfUsers = io.engine.clientsCount;
  return req.session.numberOfUsers;
}