/**
 * Created by will on 09/08/16.
 */
var Storage = function(owner) {
    this.ownerName = owner.name;
    this.contents = {
        example: {
            name: 'oneMillion',
            type: 'commodity',
            amount: 100,
            equipped: false,
            value: 1000000
        },
        exampleWeapon: {
            name: 'shootyGun',
            type: 'weapon',
            damage: 1,
            amount: 1,
            equipped: true,
            value: 100000
        },
        exampleWeapon2: {
            name: 'shootyGun2',
            type: 'weapon',
            damage: 2,
            amount: 1,
            equipped: false,
            value: 500000
        }
    };

    this.addObject = function(object, storage) {
        console.log("ADDING" + object.name);
        for(var i in storage) {
            if(storage[i].name == object.name)
                storage[i].amount++;
            else {
                storage[object.name] = object;
            }
        }
    };

    this.removeObject = function(object, storage) {
        console.log("REMOVING " + object.name)
        for(var i in storage) {
            if(storage[i].name == object.name)
                storage[i].amount--;
            else {
                storage[object.name] = object;
            }
        }

    };

    this.transfer = function(item, amount, sender, recipient) {
        console.log("Y NO TRANSFER")
        sender.storage.removeObject(item);
        recipient.storage.addObject(item);
    }
};

Storage.Transfer = function(item, amount, sender, recipient) {
    console.log("Y NO TRANSFER")
    sender.storage.removeObject(item, sender.storage.contents);
    recipient.storage.addObject(item, recipient.storage.contents);
};

module.exports = Storage;