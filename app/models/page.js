/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    name: String,
    companyname: String,
    email: String,
    phone: String,
    skype: String
});

module.exports = mongoose.model('Page', pageSchema);
