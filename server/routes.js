/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var jwt  = require('jsonwebtoken');
var User = require('./api/user/user.model');
var config = require('./config/environment');

module.exports = function(app) {

  app.post('/signup', function(req, res, next) {

    if (req.body.password === '' || req.body.password === null || req.body.username === '' || req.body.username === null ) {
      res.json({
        success: false,
        message: 'No password provided!'
      });
    } else {

      User.create(req.body, function(err, user) {
        
        if(err) { 
          res.json({
            success: false,
            message: 'There was an error while creating a user!'
          });
        } else {
          // if user is found and password is right
          // create a token
          var token = jwt.sign({
            username: user.username
          }, config.secrets.supersecret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            user: user.username
          });
        }

      });
    }

  });

  app.post('/authenticate', function(req, res, next) {

  	User
  		.findOne({username: req.body.username})
  		.select('username password')
  		.exec(function(err, user) {

  			if(err) throw err;

  			//if no user is find
  			if(!user) {
  				res.json({
  					success: false,
  					message: 'Authentication failed. User not found.'
  				});
  			} else if (user) {

  				var validPassword = user.comparePassword(req.body.password);

  				if(!validPassword) {
  					res.json({
  						success: false,
  						message: 'Password is not valid!'
  					});
  				} else {

  					// if user is found and password is right
  					// create a token
  					var token = jwt.sign({
  						username: user.username
  					}, config.secrets.supersecret, {
  						expiresInMinutes: 1440 // expires in 24 hours
  					});

  					// return the information including token as JSON
  					res.json({
  						success: true,
  						message: 'Enjoy your token!',
  						token: token,
              user: user.username
  					});

  				}
  			}
  		});
  });

  // // route middleware to verify a token
  app.use(function(req, res, next) {
  	// do logging
  	console.log('Somebody just came to our app!');

  	// check header or url parameters or post parameters for token
  	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'] ;

  	// decode token
  	if (token) {

  		// verifies secret and checks exp
  		jwt.verify(token, config.secrets.supersecret, function(err, decoded) {
  			if (err)
  				return res.json({ success: false, message: 'Failed to authenticate token.' });
  			else
  				// if everything is good, save to request for use in other routes
  			req.decoded = decoded;
  		});

  	} else {

  		// if there is no token
  		// return an HTTP response of 403 (access forbidden) and an error message
  		return res.status(403).send({
  			success: false,
  			message: 'No token provided.'
  		});

  	}

  	next(); // make sure we go to the next routes and don't stop here
  });

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  // Insert routes below
  app.use('/api/user', require('./api/user'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
