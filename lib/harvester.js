'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function harvester(creep) {
	if (creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES);
		if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources[0]);
			creep.setAction('harvest');
		}
	} else {
		creep.depositEnergy();
	}
}

exports.default = harvester;
module.exports = exports['default'];