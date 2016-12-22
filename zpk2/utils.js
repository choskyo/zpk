"use strict";
var Utilities = (function () {
    function Utilities() {
    }
    Utilities.getTime = function () {
        var d = new Date();
        return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    };
    return Utilities;
}());
module.exports = Utilities;
