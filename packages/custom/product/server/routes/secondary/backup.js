/**
 * Created by hbzhang on 11/21/14.
 */

'use strict';

var backups = require('../../controllers/secondary/backup');

//The Package is past automatically as first parameter
module.exports = function(Register, app, auth, database) {

    app.route('/backup/:backupID')
        .get(auth.requiresLogin, backups.backup)
        .put(auth.requiresLogin, backups.update);


    app.route('/backup/:backupedID')
        .delete(auth.requiresLogin, backups.destroy);

    app.route('/backup')
        .get(auth.requiresLogin, backups.all)
        .post(auth.bypassrequiresLogin, backups.create);

    app.param('backupID', backups.update);
    app.param('userid', backups.getuser);

    //app.param('id', /^\d+$/);

};


