/**
 * Created by hbzhang on 3/12/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Item = mongoose.model('Item'),
    Upload = mongoose.model('Upload'),
    _ = require('lodash'),
    grid = require('gridfs-stream');

var gfs = new grid(mongoose.connection.db, mongoose.mongo);

/**
 * Find item by id
 */
exports.item = function(req, res, next, id) {
    //console.log(id);
    Item.load(id, function(err, item) {
        if (err) return next(err);
        if (!item) return next(new Error('Failed to load the item' + id));
        req.item = item;
        next();
    });
};

exports.view = function(req, res) {
    //res.jsonp(req.class_);
    console.log('wait, I am loading the item');
    Item.findOne({_id: req.param('itemId') }, function (err, item){
        res.jsonp(item);
        console.log(item);
    });
};

/**
 * Create a item
 */
exports.create = function(req, res) {

    //console.log(req.body);
    var item = new Item(req.body);
    console.log(item);
    /* var e = dateValidation(class_);
     if (e !== '') {
     console.log(e);
     return res.jsonp(500, {
     error: e
     });
     }
     */
    item.save(function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {error: 'cannot save the item'});
        }
        res.jsonp(item);
    });
};


/**
 * List all items
 */
exports.all = function(req, res) {
    console.log('i am loading all the items');
    var populateQuery = [{path:'itemcreator'}];
    Item.find({}, '_id itembasicinformation itemformbuilder itemcustom itemprogam itemassociatedforms itemcreatedtime itemcontrol itemothers').populate(populateQuery).exec(function(err, items) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the items'
            });
        }
        res.jsonp(items);
    });
};

/**
 * Delete an item
 */
exports.destroy = function(req, res) {
    //var event = req.event;
    console.log('i am deleting the item');
    Item.remove({ _id: req.param('itemId') }, function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the item'
            });
        }
        res.jsonp({ _id: req.param('itemID') });
    });

};

/**
 * Update a item
 */

exports.update = function(req, res) {
    Item.findOne({_id: req.param('itemId') }, function (err, item){
        item.itembasicinformation = req.param('itembasicinformation');
        item.itemformbuilder = req.param('itemformbuilder');
        item.itemcreator = req.param('itemcreator');
        item.itemcustom = req.param('itemcustom');
        item.itemprogam = req.param('itemprogam');
        item.itemcreatedtime = req.param('itemcreatedtime');
        item.itemcontrol = req.param('itemcontrol');
        item.itemothers = req.param('itemothers');
        item.itemassociatedforms= req.param('itemassociatedforms');
        item.save();
        res.jsonp(item);
    });
};

