const express = require('express');

var app = express();

var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

var logFile = 'server.log';
var fs = require('fs');

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile(logFile, log + '\n', (err) => {
		if (err) {
			console.log(`Unable to append to ${logFile}: ${err}`);
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	//res.send('<h1>Hello World!</h1>');
	/*res.send({
		name: 'Andrew',
		likes: [
			'Biking',
			'Cities'
		]
	});*/
	res.render('home.hbs', {
		pageTitle: 'Home page',
		//currentYear: new Date().getFullYear(),
		welcomeMessage: 'Hello World!'
	});
});
app.get('/about', (req, res) => {
	//res.send('About page');
	res.render('about.hbs',  {
		pageTitle: 'About Page2',
		//currentYear: new Date().getFullYear()
	});
});
app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});
app.listen(port, () => {
	console.log('Server is up on port 3000');
});
