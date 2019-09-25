'use strict';

/**
 * Module dependencies.
 */

var populateQuery = [{path:'members', select:'name username picture'}, {path:'creator', select:'name username picture'}, {path:'fans',select:'name username picture'}];


var mongoose = require('mongoose'),
  Team = mongoose.model('Team'),
  _ = require('lodash');


/**
 * Find team by id
 */
exports.team = function(req, res, next, id) {
  Team.load(id, function(err, team) {
    if (err) return next(err);
    if (!team) return next(new Error('Failed to load team ' + id));
    req.team = team;
    next();
  });
};

/**
 * Create an team
 */
exports.create = function(req, res) {
  var team = new Team(req.body);
  team.creator = req.user;
  console.log(req.body);
  team.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the team'
      });
    }
    res.json(team);

  });
};

/**
 * Update an team
 */
exports.update = function(req, res) {
  var team = req.team;

  team = _.extend(team, req.body);

  team.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the team'
      });
    }
    res.json(team);

  });
};

/**
 * Delete an team
 */
exports.destroy = function(req, res) {
  var article = req.article;

  article.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the article'
      });
    }
    res.json(article);

  });
};

/**
 * Show an team
 */
exports.view = function(req, res) {
  Item.findOne({_id: req.param('teamId') }, function (err, team){
    res.jsonp(team);
    console.log(team);
  });
};

/**
 * List of teams
 */
exports.all = function(req, res) {
  Team.find({},'_id created name creator members teamloggedinlandingpagepath teamlandingpagepath').populate(populateQuery).exec(function(err, teams) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the teams'
      });
    }
    res.json(teams);

  });
};
