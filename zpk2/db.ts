class Database {
    private static mongodb = require('mongojs');
    private static db = Database.mongodb('localhost:27017/zpk1', ['account']);

    public static createPlayer(pack:any, callback:any) {
        Database.db.account.find({
            username: pack.username
        }, function(err:any, res:any) {
            if(res.length > 0) {
                callback(false);
            } else {
                Database.db.account.insert({
                    username: pack.username,
                    x: 0,
                    y: 0,
                    storage: {}
                }, function() {
                    callback(true);
                })
            }
        });
    }

    public static playerExists(pack: any, callback:any) {
        Database.db.account.find({
            username: pack.username
        }, function(err:any, res:any) {
            if(res.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        })
    }

    public static getPlayer(pack: any, callback: any) {

    }
}

export = Database;