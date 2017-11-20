/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Page = require('../models/page');

module.exports = {
    getPage: function (req, res) {
        var myquery = {
            _id: req.body._id
        };
        Page.find(myquery, function (err, pages) {
            if (err) {
                return res.send(err);
            }
            return res.send(pages);
        });
    },

    updatePage: function (req, res) {
        var myquery = {
            _id: req.body._id
        };
        Page.find(myquery, function (error, page) {
            if (error) {
                return res.send(error);
            } else {
                page[0].skype = req.body.skype;
                page[0].phone = req.body.phone;
                page[0].email = req.body.email;
                page[0].companyname = req.body.companyname;
                page[0].name = req.body.name;
                page[0].save(function (err, updated_page) {
                    if (err) {
                        return res.send(err);
                    }
                    return res.send(updated_page);
                });
            }
        });
    },

    removePage: function (req, res) {
        var myquery = {
            _id: req.body._id
        };
        Page.remove(myquery, function (err, obj) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(obj);
            }
        });
    },

    listPages: function (req, res) {
        Page.find({}, function (err, pages) {
            if (err) {
                return res.send(err);
            }
            return res.send(pages);
        });
    },

    createPage: function (req, res) {
        var page = new Page();
        page.name = req.body.name;
        page.companyname = req.body.companyname;
        page.email = req.body.email;
        page.phone = req.body.phone;
        page.skype = req.body.skype;
        page.save(function (err, page) {
            if (err) {
                return res.send(err);
            }
            return res.send(page);
        });
    }
};