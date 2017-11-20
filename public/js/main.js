"use strict";
var App = angular.module('App', ['ui.router', 'toastr', 'angularModalService']);

App.run(['$rootScope', '$location', 'ApiService', function ($rootScope, $location, ApiService) {
        $rootScope.$on('$routeChangeStart', function (event) {
            if (!ApiService.isLoggedIn()) {
                event.preventDefault();
                $location.path('/login');
            } else {
                $location.path('/profile');
            }
        });
    }]);

App.config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);