"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function thechoosenone(creep) {
	if (creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES);
		if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources[0]);
		}
	} else {
		if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.room.controller);
		}
	}
}

exports.default = thechoosenone;
module.exports = exports['default'];