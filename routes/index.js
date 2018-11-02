var express = require('express');
var router = express.Router();

var Users = require('../models/users');//users.js ma export gareko lai yaha require gareko
/* GET home page. */
var Notes = require('../models/notes');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'WLIT' });
});

router.get('/login', function(req,res){
	res.render('login');// (/)login ko lagi route gareko //render ma login vanne name diyo bt file banayena so error aayo
});

router.get('/signup',function(req,res){
	res.render('signup');
});

router.post('/signup', function(req,res){
	console.log('req..........', req.body);//esle data linxa browser bata ani console ma dekhauxa
	var user = new Users({
		username: req.body.username,
		password: req.body.password
	});
	var promise = user.save()
	promise.then((user) => {
		console.log('user signed up with values', user);//then(user) chai promise le return gareko value 
	})
	
});



router.post('/login', function(req,res){
	//console.log('req.....', req.body);
	if(req.body.username && req.body.password){
		Users.findOne({username: req.body.username,
				password: req.body.password}, function(err,user){
					console.log('logged in user is...', user);
					res.redirect('/');
				})
	}
	else{
		console.log('enter username and password');
	}
	
	
});

router.get('/addnote', function(req,res){
	res.render('addnote');
});

router.get('/viewnote', function(req,res){
	Notes.find().exec(function(err, notes){
		res.render('viewnote', {notes});
	});
});

router.post('/addnote',function(req,res){
	//console.log('req...............', req.body);
	var note = new Notes({
	title: req.body.title,
	notes: req.body.notes,
	 });
	var promise = note.save()
	promise.then((note) =>{

	console.log('saved note is:', note);
	Notes.find().exec(function(err, notes){
		res.render('viewnote', {notes});
	});
 });

});

router.post('/viewnote', function(req,res){
	console.log('req...........', req.body);
});

router.get('/deletenote/:id', function(req, res) {
  Notes.findOneAndRemove({_id: req.params.id}, function(err, note) {
    console.log('deleted note is', note);
    res.redirect('/viewNote')
  });
})

//router.put

module.exports = router;
