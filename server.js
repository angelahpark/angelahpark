var util = require('util'),    
    http = require('http'),
    express = require('express'),
    routes = require('./config/routes'),
    path = require('path');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 8000);
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/app/views');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.set('title', 'angela h park');
  app.use(before);
  app.use(app.router);
});

var before = function(req, res, next){
	console.log("Before request: " + req.url);
	next();
}

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
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  }).listen(80, '192.241.232.72');

  console.log('Express server listening on port ' + app.get('port'));
});