var util = require('util'),    
    http = require('http'),
    express = require('express'),
    routes = require('./config/routes'),
    path = require('path');

var app = express();

app.set('port', process.env.PORT || 8000);
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





// contact
// var nodemailer = require("nodemailer");

// var smtpTransport = nodemailer.createTransport("SMTP",{
//    service: "Gmail",  // sets automatically host, port and connection security settings
//    auth: {
//        user: "ahaekyungp@gmail.com",
//        pass: "Park1125"
//    }
// });

// smtpTransport.sendMail({  //email options
//    from: "Angela Park <ahaekyungp@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
//    to: "Angela Park <ahaekyungp@gmail.com>", // receiver
//    subject: "Emailing with nodemailer", // subject
//    text: "Email Example with nodemailer" // body
// }, function(error, response){  //callback
//    if(error){
//        console.log(error);
//    }else{
//        console.log("Message sent: " + response.message);
//    }
   
//    smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
// });






http.createServer(app).listen(app.get('port'), function(){
  
  console.log('Express server listening on port ' + app.get('port'));
});