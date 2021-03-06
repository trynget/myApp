// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,todoList,noteList) {
  $ionicPlatform.ready(function() {
      todoList.initDB();
      noteList.initDB();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
      .state('tab.dash-inform', {
          url: '/dash/inform',
          views: {
              'tab-dash': {
                  templateUrl: 'templates/inform.html',
                  controller: 'InformCtrl'
              }
          }
      })
      .state('tab.inform-detail', {
          url: '/dash/inform/:chatId',
          views: {
              'tab-dash': {
                  templateUrl: 'templates/inform-detail.html',
                  controller: 'InformDetailCtrl'
              }
          }
      })

  .state('tab.todo', {
      url: '/todo',
      views: {
        'tab-todo': {
          templateUrl: 'templates/tab-todo.html',
          controller: 'TodoCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
      .state('tab.account-aboutus',{
          url: '/account/aboutus',
          views: {
              'tab-account': {
                  templateUrl: 'templates/aboutus.html',
                  controller: 'AccountCtrl'
              }
          }
      })

      .state('schedule', {
          url: '/dash/schedule',
          templateUrl: 'templates/schedule.html',
          controller: 'ScheduleCtrl'
      })

      .state('tab.dash-share', {
          url: '/dash/share',
          views: {
              'tab-dash': {
                  templateUrl: 'templates/share.html',
                  controller: 'ShareCtrl'
              }
          }
      })
      .state('tab.share-detail', {
          url: '/dash/share/:shareId',
          views: {
              'tab-dash': {
                  templateUrl: 'templates/share-detail.html',
                  controller: 'ShareDetailCtrl'
              }
          }
      })

      .state('tab.dash-dateCounter', {
          url: '/dash/dateCounter',
          views:{
              'tab-dash': {
                  templateUrl: 'templates/dateCounter.html',
                  controller: 'DateCounterCtrl'
              }
          }
      })
      .state('tab.dash-dateCounter-detail',{
          url: '/dash/dateCounter/:dataId',
          views: {
              'tab-dash': {
                  templateUrl: 'templates/dateCounter-detail.html',
                  controller: 'DateCounterDetailCtrl'
              }
          }
      })
      .state('tab.dash-note', {
          url: '/dash/note',
          views:{
              'tab-dash': {
                  templateUrl: 'templates/note.html',
                  controller: 'NoteCtrl'
              }
          }
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.config(function($ionicConfigProvider){
    $ionicConfigProvider.tabs.position("bottom");  //参数可以是：top | bottom
});
