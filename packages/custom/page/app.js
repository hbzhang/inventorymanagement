'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Page = new Module('page');

//var Restangular = require('restangular');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Page.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Page.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Page.menus.add({
    title: 'Home',
    link: 'home',
    roles: ['authenticated'],
    menu: 'main'
  });

  Page.menus.add({
    title: 'Reviewer',
    link: 'reviewerpublicmenu',
    roles: ['reviewer'],
    menu: 'main'
  });


  Page.menus.add({
    title: 'Supervisor',
    link: 'supervisorpublicmenu',
    roles: ['supervisor','tworoles'],
    menu: 'main'
  });

  Page.menus.add({
    title: 'Employee',
    link: 'employeepublicmenu',
    roles: ['authenticated'],
    menu: 'main'
  });

  Page.menus.add({
    title: 'Version Control',
    link: 'simpleversioncontrol',
    roles: ['dsahradmin'],
    menu: 'main'
  });


  Page.menus.add({
    title: 'Pay',
    link: 'paypublicmenu',
    roles: ['authenticated'],
    menu: 'main'
  });

  Page.menus.add({
    title: 'Manage',
    link: 'managepublicmenu',
    roles: ['authenticated'],
    menu: 'main'
  });


  //Page.menus = PageMenuData.menu;

  Page.aggregateAsset('css', 'page.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Page.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Page.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Page.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Page;
});
