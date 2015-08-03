/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /user              ->  index
 * POST    /user              ->  create
 * GET     /user/:id          ->  show
 * PUT     /user/:id          ->  update
 * DELETE  /user/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var User = require('./user.model');

// Get list of users
// TODO see if you even need to get a list of users
exports.index = function(req, res) {

  User.find(function(err, users) {
    if(err) {return handleError(res, err); }
    return res.status(200).json(users);
  });

};

// Get a single user
exports.show = function(req, res) {

  User.findById(req.params.id, function(err, user) {
      if(err) {return handleError(res, err); }
      if(!user) {return res.status(404).send('Did not find a user'); }
      return res.json(user);
  });

};

// Creates a user
exports.create = function(req, res) {

  User.create(req.body, function(err, user) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(user);
  });

};

// Updates an existing user
exports.update = function(req, res) {

  if(req.body._id) { delete req.body._id; }

  User.findById(req.params.id, function(err, user) {
    if (err) { return handleError(res, err); }
    if(!user) {return res.status(404).send('Did not find a user'); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });

};

// Deletes a user
exports.destroy = function(req, res) {

  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });


};

function handleError(res, err) {
  return res.status(500).send(err);
}
