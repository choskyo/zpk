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

    this.addObject = function(object) {
        this.contents[object] = object;
    };

    this.removeObject = function(object) {
        delete this.contents[object];
    };

    this.transfer = function(item, amount, target) {

    }
};

module.exports = Storage;