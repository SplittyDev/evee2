"use strict";
var Evee = (function () {
    function Evee(debug) {
        if (debug === void 0) { debug = false; }
        this.debug = debug;
        this.gid = 0;
        this.holders = [];
    }
    Evee.prototype.on = function (name, action) {
        if (this.debug) {
            if (name.constructor !== String) {
                throw new TypeError("name has to be of type <String>.");
            }
            if (action.constructor !== Function) {
                throw new TypeError("action has to be of type <Function>.");
            }
        }
        var event = {
            action: action,
            id: this.gid++,
            name: name
        };
        for (var holderIndex = 0; holderIndex < this.holders.length; holderIndex++) {
            var items = this.holders[holderIndex];
            if (items.name === name) {
                items.items.push(event);
                return event;
            }
        }
        this.holders.push({
            items: [event],
            name: name
        });
        return event;
    };
    Evee.prototype.internal_get_holders = function () {
        return this.holders;
    };
    return Evee;
}());
exports.Evee = Evee;
