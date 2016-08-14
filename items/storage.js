/**
 * Created by will on 09/08/16.
 */
var Storage = function(owner) {
    this.ownerName = owner.name;
    this.contents = {
        example: {
            name: 'oneMillion',
            type: 'commodity',
            amount: 10,
            equipped: false,
            value: 1000000
        },
        exampleWeapon: {
            name: 'shootyGun',
            type: 'weapon',
            damage: 1,
            amount: 10,
            equipped: true,
            value: 100000
        },
        exampleWeapon2: {
            name: 'shootyGun2',
            type: 'weapon',
            damage: 2,
            amount: 10,
            equipped: false,
            value: 500000
        }
    };

    this.addObject = function(object, storage, creds) {
        console.log("ADDING" + object.name);
        for(var i in storage) {
            if(storage[i].name == object.name) {
                storage[i].amount++;
                creds -= object.value;
                return creds;
            }

        }
        storage[object.name] = object;
        storage[object.name].amount = 1;
        creds -= object.value;
        return creds;
    };

    this.removeObject = function(object, storage, creds) {
        console.log("REMOVING " + object.name)
        for(var i in storage) {
            if(storage[i].name == object.name) {
                storage[i].amount--;
                if(storage[i].amount <= 0)
                    delete storage[i];
                creds += object.value;
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