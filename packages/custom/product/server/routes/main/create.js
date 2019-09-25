/**
 * Created by hbzhang on 3/12/15.
 */
'use strict';

var items = require('../../controllers/main/create');

// The Package is past automatically as first parameter
module.exports = function(Item, app, auth, database) {


    app.route('/item/:itemId')
        .get(auth.requiresLogin, items.view)
        .delete(auth.requiresLogin, items.destroy)
        .put(auth.requiresLogin, items.update);

    app.route('/item')
        .get(auth.bypassrequiresLogin, items.all)
        .delete(auth.requiresLogin, items.destroy)
        .post(auth.requiresLogin, items.create);

    app.param('itemId', items.item);

    /*app._router.stack.forEach(function(r){
        if (r.route && r.route.path){
            console.log(r.route.path)
        }
    }) LIST ALL ROUTES*/



};


