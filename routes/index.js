"use strict";
const express = require('express');
const router = express.Router();

const tweetBank = require('../tweetBank');

router.get('/', function(req, res){
	let tweets = tweetBank.list();
	res.render('index', { tweets : tweets });
});

router.use('/', express.static('public'));

router.get('/stylesheets', function(req,res){
	var fileName = req.params.name;
	res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });

});

module.exports = router;