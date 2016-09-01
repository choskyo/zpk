/**
 * Created by will on 09/08/16.
 */
var items = require('./item');
var Storage = function(owner) {
    this.ownerName = owner.name;
    this.contents = {
        testy: new items.Item('testy', 100, 1, 'commodity', false, 50)
    };

    this.addObject = function(object, storage, creds) {
        for(var i in storage) {
            if(storage[i].name == object.name) {
                creds -= object.rval;
                storage[i].amount++;
                return creds;
            }
        }
        storage[object.name] = object;
        storage[object.name].amount = 1;
        creds -= object.rval;
        if(isNaN(creds))
            console.log("CREDS ISNAN");
        return creds;
    };

    this.removeObject = function(object, storage, creds) {
        for(var i in storage) {
            if(storage[i].name == object.name) {
                storage[i].amount--;
                creds += object.rval;
                if(storage[i].amount <= 0)
                    delete storage[i];
                if(isNaN(creds))
                    console.log("CREDS ISNAN");
                return creds;
            }
        }
    };
};

Storage.Transfer = function(item, amount, sender, recipient) {
    sender.credits = sender.storage.removeObject(item, sender.storage.contents, sender.credits);
    recipient.credits = recipient.storage.addObject(item, recipient.storage.contents, recipient.credits);
};

module.exports = Storage;