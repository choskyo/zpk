"use strict";
var Database = (function () {
    function Database() {
    }
    Database.createPlayer = function (pack, callback) {
        Database.db.account.find({
            username: pack.username
        }, function (err, res) {
            if (res.length > 0) {
                callback(false);
            }
            else {
                Database.db.account.insert({
                    username: pack.username,
                    x: 0,
                    y: 0,
                    storage: {}
                }, function () {
                    callback(true);
                });
            }
        });
    };
    Database.playerExists = function (pack, callback) {
        Database.db.account.find({
            username: pack.username
        }, function (err, res) {
            if (res.length > 0) {
                callback(true);
            }
            else {
                callback(false);
            }
        });
    };
    Database.getPlayer = function (pack, callback) {
    };
    return Database;
}());
Database.mongodb = require('mongojs');
Database.db = Database.mongodb('localhost:27017/zpk1', ['account']);
module.exports = Database;
