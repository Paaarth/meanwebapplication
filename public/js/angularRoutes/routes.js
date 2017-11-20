/* global App */

"use strict";

App.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('home');
    $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'pages/main.html',
                controller: 'mainController',
                controllerAs: 'MainController',
                resolve: {
                    checkLoggedin: checkLoggedin
                }
            })

            .state('registration', {
                url: '/registration',
                templateUrl: 'pages/registration.html',
                controller: 'registrationController',
                controllerAs: 'RegistrationController'
            })

            .state('login', {
                url: '/login',
                templateUrl: 'pages/login.html',
                controller: 'loginController',
                controllerAs: 'LoginController'
            })

            .state('profile', {
                url: '/profile',
                templateUrl: 'pages/profile.html',
                controller: 'profileController',
                controllerAs: 'ProfileController',
                resolve: {
                    checkLoggedin: checkLoggedin
                }
            })

            .state('logout', {
                url: '/login',
                templateUrl: 'pages/login.html',
                controller: 'loginController',
                controllerAs: 'LoginController'
            });

    $locationProvider.html5Mode(true);
});

var checkLoggedin = function ($q, $location, $rootScope, ApiService)
{
    var deferred = $q.defer();
    ApiService.isLoggedIn("/api/loggedin").then(function (response) {
        $rootScope.errorMessage = '';
        $rootScope.currentUser = response.data;
        deferred.resolve();
        console.clear();
    }).catch(function (response) {
        $rootScope.errorMessage = response.data;
        $rootScope.currentUser = '';
        deferred.reject();
        $location.url('/login');
        console.clear();
    });
    return deferred.promise;
};
    