'use strict';

// The Package is past automatically as first parameter
module.exports = function(Report, app, auth, database) {

  app.get('/report/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/report/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/report/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/report/example/render', function(req, res, next) {
    Report.render('index', {
      package: 'report'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
