function builder(roomGame, creep) {
  let creepEmpty = creep.carry.energy === 0;
	let spawnFinished = roomGame.getSpawnMemory('spammerFinished');
	let transferEnergy = creep.memory.transferEnergy;

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
    	let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    	if (targets.length) {
    		if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
    			creep.moveTo(targets[0]);
    		}
    	}

      if (!targets.length) {
        let halfBroken = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: function(object) {
                return (object.hits / object.hitsMax) < 0.5;
            }
        });
        if(halfBroken) {
            if(creep.repair(wall) == ERR_NOT_IN_RANGE) {
                creep.moveTo(wall);
            }
        }
      }

    }
}

export default builder;
