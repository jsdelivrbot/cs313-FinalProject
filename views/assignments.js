var express = require('express');
var router = express.Router();
console.log("post received");


/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log("redirect");
    res.redirect('/');
});

router.use(express.static('public'))

router.post('/login', function(req, res, next) {

            console.log(req.body.username);
              if(req.body.username == 'admin')
              {		
              console.log("logged in");
              res.render('chatPage'); 
              }
              else
              {
              console.log("no login");
              res.redirect('/');
              }
              
          
          next();          
    });

module.exports = router;
