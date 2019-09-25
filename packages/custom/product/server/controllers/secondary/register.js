/**
 * Created by hbzhang on 11/21/14.
 */

var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    User = mongoose.model('User'),
    Register = mongoose.model('Register'),
    Upload = mongoose.model('Upload'),
    _ = require('lodash'),
    config = require('meanio').loadConfig(),
    nodemailer = require('nodemailer'),
    templates = require('../../emailtemplate'),
    grid = require('gridfs-stream');

//    QRCode = require('qrcode');


/**
 * Send reset password email
 */
function sendMail(mailOptions) {
    var transport = nodemailer.createTransport(config.mailer);
    transport.sendMail(mailOptions, function(err, response) {
        if (err) return err;
        return response;
    });
}

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
 * get qrcode
 */
exports.getqrcode = function(req, res) {
    //console.log(req.user);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var qrcode = req.user.username;
    //QRCode.QRCodeDraw.color.dark = '#d4d4d4';
    /*  QRCode.save(path, qrcode,function(err,written){
        console.log(path);
        if(err) console.log('error: '+err);
        res.end(written, 'binary');
        //res.end("<!DOCTYPE html/><html><head><title>node-qrcode</title></head><body><img src='"+url+"'/></body></html>");
    });
    */

    QRCode.toDataURL(qrcode,function(err,url){
        if(err) console.log('error: '+err);
        res.end("<!DOCTYPE html/><html><head><title>node-qrcode</title></head><body><img width='300' src='"+url+"'/></body></html>");
    });
};

/**
 * Find registers by reason id
 */
exports.registersforonereasaon = function(req, res, next, id) {

    var populateQuery = [{path:'users'}];
    Register.find({'reasonforregister':id}, '_id supervisor_edit users qrcode information otherinformation reasonforregister registercreatedtime').populate(populateQuery).exec(function(err, registeries) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the registeries'
            });
        }
       //next();
        res.jsonp(registeries);
    });
};

/**
 * Find registers by id  function(req, res, next, id)
 */
exports.register = function(req, res) {
    var populateQuery = [{path:'users'}];
    Register.find({'_id':req.param('registerID')}, '_id supervisor_edit users qrcode information otherinformation reasonforregister registercreatedtime').populate(populateQuery).exec(function(err, registeries) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot find register by id'
            });
        }
        //req.register = registeries;
        res.jsonp(registeries);
        //next();
    });
};


exports.view = function(req, res) {
    //res.jsonp(req.class_);
    console.log('view register called');
    next();
};



/**
 * Delete a register
 */
exports.destroy = function(req, res) {
    console.log('destroy called');
    Register.remove({ _id: req.param('registeredID') }, function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the register'
            });
        }
        res.jsonp({ _id: req.param('registerID') });
    });
};


/**
 * Update a register
 */
exports.update = function(req, res) {
  /*  var register = req.register;
    register = _.extend(register, req.body);
    register.save(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot update the register'
            });
        }
        res.jsonp(register);
    });*/
    //register = _.extend(register, req.body);

    Register.findOne({_id: req.param('registerID') }, function (err, item){
        if( typeof req.param('information')!== "undefined")
        item.information = req.param('information');
        if( typeof req.param('reasonforregister')!== "undefined")
        item.reasonforregister = req.param('reasonforregister');
        if( typeof req.param('users')!== "undefined")
        item.users = req.param('users');
        if( typeof req.param('qrcode')!== "undefined")
        item.qrcode = req.param('qrcode');
        if( typeof req.param('supervisor_edit')!== "undefined")
        item.supervisor_edit = req.param('supervisor_edit');
        if( typeof req.param('otherinformation')!== "undefined")
        item.otherinformation = req.param('otherinformation');
        item.registercreatedtime = new Date().toLocaleString();
        item.save(function(err) {
            if (err) {
                console.log(err);
                return res.jsonp(500, {
                    error: 'Cannot update the register'
                });
            }
            res.jsonp(item);
        });
    });

};

/**
 * send mail
 */
var sendmail = function(register,user){
    var mailOptions = {
        to: user.email,
        from: config.emailFrom
    };
    var imgurl = 'http://nightwing.recsports.vt.edu/registrationqrcode/'+ register.reasonforregister + '/'+user._id
    //var imgurl = 'http://localhost:3000/registrationqrcode/'+ register.reasonforregister + '/'+user._id
    mailOptions = templates.thanks_for_register_werememberrun(imgurl,user, mailOptions);
    sendMail(mailOptions);
};

/**
 * create a register
 */
exports.create= function(req, res) {
    var register = new Register(req.body);
    /* var e = dateValidation(class_);
     if (e !== '') {
     console.log(e);
     return res.jsonp(500, {
     error: e
     });
     }
     */
    register.registercreatedtime = new Date().toLocaleString();
    register.save(function(err) {
        //sendmail(register,user);
        if (err) {
            console.log(err);
            return res.jsonp(500, {error: 'cannot save the register'});
        }
        res.jsonp(register);
    });
};

/**
 * List of all registeries
 */
exports.all = function(req, res) {
    var populateQuery = [{path:'users'}];
    Register.find({}, '_id supervisor_edit users qrcode information otherinformation reasonforregister registercreatedtime').populate(populateQuery).exec(function(err, registeries) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the registeries'
            });
        }
        res.jsonp(registeries);
    });
};
