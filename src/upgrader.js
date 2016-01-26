function upgrader(creep) {
	if (creep.carry.energy == 0) {
		if (Game.spawns.Spawn1.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
			creep.moveTo(Game.spawns.Spawn1);
		}
	} else {
		if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.room.controller);
		}
	}
}

export default upgrader;
