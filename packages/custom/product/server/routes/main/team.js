/**
 * Created by hbzhang on 3/5/17.
 */
'use strict';

var teams = require('../../controllers/main/team');

// The Package is past automatically as first parameter
module.exports = function(Item, app, auth, database) {


    app.route('/team/:teamId')
        .get(auth.requiresLogin, teams.view)
        .delete(auth.requiresLogin, teams.destroy)
        .put(auth.requiresLogin, teams.update);

    app.route('/team')
        .get(auth.bypassrequiresLogin, teams.all)
        .delete(auth.requiresLogin, teams.destroy)
        .post(auth.requiresLogin, teams.create);

    app.param('teamId', teams.team);

    /*app._router.stack.forEach(function(r){
     if (r.route && r.route.path){
     console.log(r.route.path)
     }
     }) LIST ALL ROUTES*/



};

