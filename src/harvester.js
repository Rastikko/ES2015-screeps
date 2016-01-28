function harvester(creep) {
	if (creep.carry.energy < creep.carryCapacity) {
		let sources = creep.room.find(FIND_SOURCES);
		if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources[0]);
		}
	} else {
		creep.depositEnergy();
	}
}

export default harvester;
