/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var Message = require('./api/messages.model');
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});

require('./config/express')(app);
require('./routes')(app);
// require('./config/socketio')(socketio);

socketio.on('connection', function(socket) {
	console.log('We just got a new client connected to our socketio thing!');

	socket.on('request-messages', function() {   

    console.log('Insepcitng all of the msg onthe server side');

    Message.find(function(err, msgs) {
      socket.emit('all-msg', msgs);
    })
    .sort({_id: -1})
    .limit(5);

  });

  socket.on('chat message', function(msg) {
    Message.create(msg, function(err, msg) {
      if(err) { console.log(err); }
      console.log('Success in saving the message to mongo db!');
    });
		socket.broadcast.emit('chat message', msg);
	});

	socket.on('disconnect', function() {
		console.log('Client just got disconnected!');
	});

});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
