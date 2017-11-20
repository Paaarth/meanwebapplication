/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global App */

"use strict";
App.controller('addNewPageController', ['$scope', '$rootScope', 'ModalService', 'ApiService', 'toastr', '$element', 'close', function ($scope, $rootScope, ModalService, ApiService, toastr, $element, close) {
        $scope.PageName = "Add New Page";
        $scope.submitForm = function () {
            ApiService.addNewPage($scope.page).then(function (response) {
                toastr.success('Page created successfully!', 'Success');
                $element.modal('hide');
                close(response, 300);
                setTimeout(function () {
                    $scope.listPages();
                }, 401);
            }).catch(function (error) {
                toastr.error('Something went wrong!', 'Error');
                $element.modal('hide');
                close(error, 400);
            });
        };

        $scope.listPages = function () {
            ApiService.listPages().then(function (response) {
                $scope.Pages = response.data;
            }).catch(function (error) {
            });
        };
    }]);

"use strict";
App.controller('editPageController', ['$scope', '$rootScope', 'ModalService', 'ApiService', 'toastr', '$element', 'close', function ($scope, $rootScope, ModalService, ApiService, toastr, $element, close) {
        $scope.PageName = "Edit Page";
        $scope.page = $rootScope.Page;

        $scope.submitForm = function () {
            ApiService.updatePage($scope.page).then(function (response) {
                toastr.success('Page updated successfully!', 'Success');
                $element.modal('hide');
                close(response, 300);
                setTimeout(function () {
                    $scope.listPages();
                }, 401);
            }).catch(function (error) {
                toastr.error('Something went wrong!', 'Error');
                $element.modal('hide');
                close(error, 400);
            });
        };

        $scope.listPages = function () {
            ApiService.listPages().then(function (response) {
                $scope.Pages = response.data;
            });
        };

        $scope.listPages = function () {
            ApiService.listPage().then(function (response) {
                $scope.page = response.data;
            });
        };
    }]);

"use strict";
App.controller('listPageController', ['$scope', '$rootScope', 'ModalService', 'ApiService', 'toastr', '$element', function ($scope, $rootScope, ModalService, ApiService, toastr, $element) {
        $scope.listPages = function () {
            ApiService.listPages().then(function (response) {
                $scope.Pages = response.data;
                toastr.success('Pages updated successfully!', 'Success');
            }).catch(function (error) {
                toastr.error('Something went wrong!', 'Error');
            });
        };

        $scope.addNewPage = function () {
            ModalService.showModal({
                templateUrl: "pages/page.html",
                controller: "addNewPageController"
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                });
            });
        };

        $scope.editPage = function (Page) {
            $rootScope.Page = Page;
            ModalService.showModal({
                templateUrl: "pages/page.html",
                controller: "editPageController"
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                });
            });
        };

        $scope.deletePage = function (Page) {
            ApiService.removePages(Page).then(function (response) {
                $scope.listPages();
            });
        };
    }]);