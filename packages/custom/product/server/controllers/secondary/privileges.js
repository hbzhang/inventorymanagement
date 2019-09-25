/**
 * Created by hbzhang on 10/1/16.
 */

var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    Privilege = mongoose.model('Privilege'),
    Upload = mongoose.model('Upload'),
    _ = require('lodash'),
    grid = require('gridfs-stream');


/**
 * Find privilege by id
 */
exports.privilege = function(req, res, next, id) {
    Privilege.load(id, function(err, privilege) {
        if (err) return next(err);
        if (!privilege) return next(new Error('Failed to load the event participant' + id));
        req.event = privilege;
        next();
    });
};

/**
 * Delete a privilege
 */
exports.destroy = function(req, res) {

    //var event = req.event;
    //console.log(req.param('eventID'));
    Privilege.remove({ _id: req.param('privilegeID') }, function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the privilege'
            });
        }
        res.jsonp({ _id: req.param('privilegeID') });
    });
};


/**
 * Update a privilege
 */
exports.update = function(req, res) {
    var privilege = req.privilege;
    privilege = _.extend(privilege, req.body);

    privilege.save(function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {
                error: 'Cannot update the privilege'
            });
        }
        res.jsonp(privilege);
    });
};



/**
 * form an privilege
 */
exports.create= function(req, res) {

    console.log(req.body);

    var privilege = new Privilege(req.body);

    console.log(privilege);

    /* var e = dateValidation(class_);
     if (e !== '') {
     console.log(e);
     return res.jsonp(500, {
     error: e
     });
     }
     */

    privilege.save(function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {error: 'cannot save the privilege'});
        }
        res.jsonp(privilege);
    });
};

/**
 * List of all privileges
 */
exports.all = function(req, res) {
    var populateQuery = [{path:'students'},{path:'event'}];
    Privilege.find({}, '_id eventinformation event').populate(populateQuery).exec(function(err, privileges) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the privileges'
            });
        }
        res.jsonp(privileges);
    });
};

exports.view = function(req, res) {
    //res.jsonp(req.class_);
};


