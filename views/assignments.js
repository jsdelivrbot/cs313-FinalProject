var express = require('express');
var router = express.Router();
console.log("post received");


/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log("redirect");
    res.redirect('/');
});

router.use(express.static('public'))
router.use(express.static(__dirname + '/public'));
router.use(express.static(__dirname + '/views'));
router.post('/login', function(req, res, next) {

            console.log(req.body.username);
              if(req.body.username == req.session.roomcode)
              {		
              res.render('chatPage', {RC:req.session.roomcode}); 
              }
              else
              {
              console.log("no login");
              res.redirect('/');
              }                    
          next();          
    });

module.exports = router;
