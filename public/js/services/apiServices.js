/* global App */

"use strict";

App.factory('ApiService', function ($http) {
    var user;

    return {
        createUser: function (userData) {
            return $http.post('/signup', userData);
        },
        login: function (userData) {
            return $http.post('/login', userData);
        },
        logout: function () {
            return $http.post('/logout');
        },
        addNewPage: function (pageData) {
            return $http.post('/createPage', pageData);
        },
        listPages: function () {
            return $http.post('/listPages');
        },
        removePages: function (page) {
            return $http.post('/removePage', page);
        },
        listPage: function (page) {
            return $http.post('/getPage', page);
        },
        updatePage: function (page) {
            return $http.post('/updatePage', page);
        },
        profile: function (page) {
            return $http.get('/profile', page);
        },
        getUserInfo: function () {
            return $http.get('/getUserInfo');
        },
        setUser: function (aUser) {
            user = aUser;
        },
        isLoggedIn: function () {
            user = $http.post('/api/loggedin');
            return(user) ? user : false;
        }
    };
});
