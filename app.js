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

// blog home page
app.get('/',function(req,res){
    res.render('test');
})


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.use('/assignments', assignmentsRouter);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.set('port', process.env.PORT || 8888)

http.listen(app.get('port'))

console.log('listening on port 8888')

