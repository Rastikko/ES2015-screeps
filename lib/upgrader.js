'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function upgrader(roomGame, creep) {
	var creepEmpty = creep.carry.energy === 0;
	var spawnFinished = roomGame.getSpawnMemory('spammerFinished');
	var transferEnergy = creep.memory.transferEnergy;

	if ((creepEmpty || transferEnergy) && spawnFinished) {
		if (Game.spawns.Spawn1.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
			creep.moveTo(Game.spawns.Spawn1);
		}
		if (creep.carry.energy !== creep.carryCapacity) {
			creep.memory.transferEnergy = true;
		} else {
			creep.memory.transferEnergy = false;
		}
	} else {
		if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.room.controller);
		}
	}
}

exports.default = upgrader;
module.exports = exports['default'];