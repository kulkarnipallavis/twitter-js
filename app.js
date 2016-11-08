const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

const chalk = require('chalk');

var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
// nunjucks.configure('views', {noCache: true});
// nunjucks.render('index.html', locals, function (err, output) {
//     console.log(output);
// });

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache : true}); // point nunjucks to the proper directory for templates


// app.all('/', function(req,res){
// 	console.log("calling app.all");
// 	res.send("Hello All");
// });

app.use('/', function(req, res, next){
	console.log(chalk.blue("using blue"));
	console.log("in use", req.method, req.url);	
	next();
});

app.get('/', function(req, res){
	const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	res.render( 'index', {title: 'Hall of Fame', people: people} );
	// res.send("Hello world!");
});

app.use('/special', function(req, res, next){
	console.log(chalk.blue("in use special"));
	console.log(res.statusCode);
	next();
});

app.get('/special', function(req, res){
	console.log("in get special");
	var body = 'Hello special!!';
	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', body.length);
	res.end(body);
});

app.get('/news', function(req, res){
	res.send("Welcome to news!!");
});

app.listen(3000, function(){
	console.log("server listening");
});