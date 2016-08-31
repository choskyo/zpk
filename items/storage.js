/**
 * Created by will on 09/08/16.
 */
var items = require('./item');
var Storage = function(owner) {
    this.ownerName = owner.name;
    this.contents = {
        testy: new items.Item('testy', 10, 1, 'commodity', false, 50)
    };

    this.addObject = function(object, storage, creds) {
        for(var i in storage) {
            if(storage[i].name == object.name) {
                storage[i].amount++;
                creds -= object.rval;
                return creds;
            }
        }
        storage[object.name] = object;
        storage[object.name].amount = 1;
        creds -= object.value;
        return creds;
    };

    this.removeObject = function(object, storage, creds) {
        for(var i in storage) {
            if(storage[i].name == object.name) {
                storage[i].amount--;
                if(storage[i].amount <= 0)
                    delete storage[i];
                creds += object.rval;
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