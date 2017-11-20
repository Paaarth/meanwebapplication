/* global App */

"use strict";
App.controller('mainController', ['$scope', '$rootScope', 'ApiService', '$location', function ($scope, $rootScope, ApiService, $location) {}]);

"use strict";
App.controller('profileController', ['ApiService', '$location', '$rootScope', 'toastr', '$window', function (ApiService, $location, $rootScope, toastr, $window) {
        var vm = this;
        vm.user = {};
        vm.logout = function () {
            ApiService.logout();
            $location.path("/login");
            setTimeout(function () {
                toastr.success('Logout successfully!', 'Success!');
            }, 100);
        };
    }]);
