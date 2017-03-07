var express = require('express');
var path = require('path');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var swig = require('swig');
var index = require('./routes/index');
var websites = require('./routes/website');
var contents = require('./routes/content');
var config = require('./config.json');
var credentials = require('./lib/credentials');
var method_override = require('method-override');


var app = express();

// view engine setup
app.engine('html',swig.renderFile);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(method_override('_method'));

//sessions
 app.use(sessions({
   secret : credentials.secret,
   resave : true,
   saveUninitialized : true,
 }));
 
 

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

//routes
 app.use('/',index);
 app.use('/websites',websites);
 app.use('/content',contents);



/*app.get('/headers', function(req,res){
res.set('Content-Type','text/plain');
var s = '';
for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
res.send(s);
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('404', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('404', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
