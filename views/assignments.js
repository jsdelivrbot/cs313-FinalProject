var express = require('express');
var router = express.Router();
console.log("post received");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log("redirect");
    res.redirect('/');
});

router.use(express.static('public'))
router.use(express.static(__dirname + '/public'));
router.use(express.static(__dirname + '/views'));
router.post('/login', function(req, res, next) {      
              if(req.body.username == req.session.roomcode || Object.keys(io.sockets.connected).length == 0)
              {		           
                res.render('chatPage', {RC:req.session.roomcode}); 
              }
              else{
                res.redirect('/');
              }                    
          next();       
    });

module.exports = router;
