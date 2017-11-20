/* global App */

"use strict";
App.controller('loginController', ['ApiService', '$location', '$rootScope', 'toastr', '$q', function (ApiService, $location, $rootScope, toastr, $q) {
        var vm = this;
        vm.loginUser = {};
        var deferred = $q.defer();
        vm.sendForm = function () {
            ApiService.login(vm.loginUser).then(function (response) {
                toastr.success('Login successfully!', 'Success');
                deferred.resolve();
                $location.path("/profile");
            }).catch(function (error) {
                toastr.error(error.data, error.status);
                deferred.reject();
                $location.url('/login');
                console.clear();
            });
        };
    }]);

"use strict";
App.controller('registrationController', ['ApiService', 'toastr', '$rootScope', '$location', function (ApiService, toastr, $rootScope, $location) {
        var vm = this;
        vm.sendForm = function () {
            ApiService.createUser(vm.registerUser).then(function (response) {
                toastr.success('User created successfully!', 'Success');
                $rootScope.userEmail = response.config;
                $location.path("/profile");
            }).catch(function (error) {

                toastr.error(error.status, error.data);
            });
        };
    }]);