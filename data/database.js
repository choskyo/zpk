/**
 * Created by will on 31/07/16.
 */
module.exports = function() {
    var mongojs = require("mongojs"); var Station = require('./../entities/station.js');
    var items = require('./../items/item.js');
    var db = mongojs('localhost:27017/zpk1', ['account', 'station', 'items']);

    this.isPasswordValid = function(pack, callback) {
        db.account.find({username:pack.username}, function(error, result) {
            if(result.length > 0) {
                callback(true);
            }
            else {
                callback(false);
            }
        });

        /*
        db.account.find({username:pack.username, password:pack.password}, function(error, result) {
            if(result.length > 0) {
                callback(true);
            }
            else {
                callback(false);
            }
        });*/
    };

    this.isUserTaken = function(pack, callback) {
        db.account.find({username:pack.username}, function(error, result) {
            if(result.length > 0) {
                callback(true);
            }
            else {
                callback(false);
            }
        })
    };

    this.newUser = function(pack, callback) {
        db.account.insert({username:pack.username, x: 0, y: 0, storage: {}}, function(error) {
            callback();
        });
        /*
        db.account.insert({username:pack.username, password:pack.password}, function(error) {
            callback();
        });*/
    };

    this.getStations = function() {
        db.station.find(function(error, result) {
            if(result.length > 0) {
                for(var i = 0; i < result.length; i++) {
                    new Station(result[i].name, result[i].x, result[i].y, result[i].area);
                }
            }
        });
    };

    this.getItems = function() {
        var itemList = {};

        db.items.find(function(error, result) {
            if(result.length > 0) {
                for(var i = 0; i < result.length; i++) {
                    var it = result[i];
                    itemList[it.name] = new items.Item(it.name, it.amount, it.size, it.type, it.gear, it.bval);
                }
            }
        });
        return itemList;
    };

    this.getPlayer = function(player, callback) {
        db.account.find({username:player.username}, function(error, result) {
            if(result.length > 0) {
                callback(result[0]);
            }
            else {
                callback(null);
            }
        });
    };

    this.savePlayer = function(player) {
       db.account.remove({
            username: player.name
        });
        
        db.account.update({
            username: player.name
        },
            {
                username: player.name,
                credits: player.credits,
                x: Math.floor(player.x),
                y: Math.floor(player.y),
                storage: player.storage.contents
            }, {
                upsert:true
            });
    };
};