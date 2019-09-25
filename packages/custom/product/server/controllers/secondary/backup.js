/**
 * Created by hbzhang on 11/21/14.
 */

var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    User = mongoose.model('User'),
    Backup = mongoose.model('Backup'),
    Upload = mongoose.model('Upload'),
    _ = require('lodash'),
    config = require('meanio').loadConfig(),
    nodemailer = require('nodemailer'),
    templates = require('../../emailtemplate'),
    grid = require('gridfs-stream');

/**
 * get user
 */
exports.getuser = function(req, res, next, userid) {
    //var _id = mongoose.Types.ObjectId.fromString(userid);
    //console.log(userid);
    User.findOne({
        _id: userid
    }, function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user' + userid));
        console.log(user);
        req.user = user;
        next()
    });
};


/**
 * Find registers by reason id
 */
exports.Backupsforonereasaon = function(req, res, next, id) {

    var populateQuery = [{path:'users'}];
    Backup.find({'reasonforregister':id}, '_id supervisor_edit users information otherinformation reasonforregister registercreatedtime').populate(populateQuery).exec(function(err, backups) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the backups'
            });
        }
       //next();
        res.jsonp(backups);
    });
};

/**
 * Find backup by id  function(req, res, next, id)
 */
exports.backup = function(req, res) {
    var populateQuery = [{path:'users'}];
    Backup.find({'_id':req.param('backupID')}, '_id supervisor_edit users information otherinformation reasonforregister registercreatedtime').populate(populateQuery).exec(function(err, backups) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot find a backup by id'
            });
        }
        //req.register = registeries;
        res.jsonp(backups);
        //next();
    });
};


exports.view = function(req, res) {
    //res.jsonp(req.class_);
    console.log('view backup called');
    next();
};



/**
 * Delete a backup
 */
exports.destroy = function(req, res) {
    Backup.remove({ _id: req.param('backupedID') }, function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the backup'
            });
        }
        res.jsonp({ _id: req.param('backupedID') });
    });
};


/**
 * Update a backup
 */
exports.update = function(req, res) {
    Backup.findOne({_id: req.param('backupID') }, function (err, item){
        if( typeof req.param('information')!== "undefined")
        item.information = req.param('information');
        if( typeof req.param('reasonforregister')!== "undefined")
        item.reasonforregister = req.param('reasonforregister');
        if( typeof req.param('users')!== "undefined")
        item.users = req.param('users');
        if( typeof req.param('supervisor_edit')!== "undefined")
        item.supervisor_edit = req.param('supervisor_edit');
        if( typeof req.param('otherinformation')!== "undefined")
        item.otherinformation = req.param('otherinformation');
        item.registercreatedtime = new Date().toLocaleString();
        item.save(function(err) {
            if (err) {
                console.log(err);
                return res.jsonp(500, {
                    error: 'Cannot update the backup'
                });
            }
            res.jsonp(item);
        });
    });

};


/**
 * create a backup
 */
exports.create= function(req, res) {
    var backup = new Backup(req.body);
    backup.registercreatedtime = new Date().toLocaleString();
    backup.save(function(err) {
        //sendmail(register,user);
        if (err) {
            console.log(err);
            return res.jsonp(500, {error: 'cannot save the backup'});
        }
        res.jsonp(backup);
    });
};

/**
 * List of all backups
 */
exports.all = function(req, res) {
    var populateQuery = [{path:'users'}];
    Backup.find({}, '_id supervisor_edit users information otherinformation reasonforregister registercreatedtime').populate(populateQuery).exec(function(err, backups) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the backups'
            });
        }
        res.jsonp(backups);
    });
};
