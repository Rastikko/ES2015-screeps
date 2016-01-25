"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function guard(creep) {
    var targets = creep.room.find(FIND_HOSTILE_CREEPS);

    if (targets.length) {
        if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
    }
}

exports.default = guard;
module.exports = exports['default'];