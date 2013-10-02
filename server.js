var util = require('util'),    
    http = require('http'),
    express = require('express'),
    routes = require('./config/routes'),
    path = require('path');

var app = express();


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('We\'re in \n');
}).listen(8000);
console.log('Server running at http://<your server ip address>:3000/');


// app.set('port', process.env.PORT || 8000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');
app.use(express.static(path.join(__dirname, 'public')));

var before = function(req, res, next){
	console.log("Before request: " + req.url);
	next();
}

app.configure(function(){
  app.set('title', 'angela h park');
  app.use(before);
  app.use(app.router);
});

routes(app);

app.use(function(err, req, res, next){
  // treat as 404
  if (~err.message.indexOf('not found')) return next();

  // log it
  console.error(err.stack);

  // error page
  res.status(500).render('5xx');
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});

// http.createServer(app).listen(app.get('port'), function(){
  
//   console.log('Express server listening on port ' + app.get('port'));
// });