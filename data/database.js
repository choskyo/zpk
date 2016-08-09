/**
 * Created by will on 31/07/16.
 */
module.exports = function() {
    var mongojs = require("mongojs"); var Station = require('./../entities/station.js');
    var db = mongojs('localhost:27017/zpk1', ['account', 'station']);


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
        db.account.insert({username:pack.username}, function(error) {
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

    this.savePlayer = function(player) {
        db.account.update( {
            username: player.username
        },
            {
                username: player.username,
                password: player.password,
                x: Math.floor(player.x),
                y: Math.floor(player.y)
            })
    };
};