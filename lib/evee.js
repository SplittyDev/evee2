"use strict";
var Evee = (function () {
    function Evee() {
        this.gid = 0;
        this.holders = [];
    }
    Evee.prototype.on = function (name, action) {
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
    Evee.prototype.drop = function (event) {
        if (event.constructor === String) {
            var eventName = event;
            for (var holderIndex = 0; holderIndex < this.holders.length; holderIndex++) {
                var holder = this.holders[holderIndex];
                if (holder.name === eventName) {
                    holder.items = [];
                    return;
                }
            }
        }
        else {
            var eventObject = event;
            for (var holderIndex = 0; holderIndex < this.holders.length; holderIndex++) {
                var holder = this.holders[holderIndex];
                if (holder.name === eventObject.name) {
                    for (var eventIndex = 0; eventIndex < holder.items.length; eventIndex++) {
                        var currentEvent = holder.items[eventIndex];
                        if (currentEvent.id === eventObject.id) {
                            holder.items.splice(eventIndex, 1);
                            return;
                        }
                    }
                }
            }
        }
    };
    Evee.prototype.internal_get_holders = function () {
        return this.holders;
    };
    return Evee;
}());
exports.Evee = Evee;
