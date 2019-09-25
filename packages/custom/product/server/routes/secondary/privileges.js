/**
 * Created by hbzhang on 10/1/16.
 */
/**
 * Created by hbzhang on 11/21/14.
 */
'use strict';

var priviliges = require('../../controllers/secondary/privileges');

// The Package is past automatically as first parameter
module.exports = function(Event, app, auth, database) {

    app.route('/privilege/:privilegeID')
        .get(auth.bypassrequiresLogin, priviliges.view)
        .delete(auth.requiresLogin, priviliges.destroy)
        .put(auth.requiresLogin, priviliges.update);

    app.route('/privilege')
        .get(auth.bypassrequiresLogin, priviliges.all)
        .post(auth.requiresLogin, priviliges.create);

    app.param('privilegeID', priviliges.privilege);
};
