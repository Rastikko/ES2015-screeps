function builder(creep) {
  let creepEmpty = creep.carry.energy === 0;
	let spawnFinished = Game.spawns.Spawn1.memory['isFinished'];
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
    creep.setAction('b:withdraw');
	} else {
    	let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    	if (targets.length) {
    		if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
    			creep.moveTo(targets[0]);
    		}
        creep.setAction('build');
    	}

      if (!targets.length) {
        let structuresNeedsRepair = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => { return structure.hits < structure.hitsMax / 2 }
        });

        if(structuresNeedsRepair) {
            if(creep.repair(structuresNeedsRepair) === ERR_NOT_IN_RANGE) {
                creep.moveTo(structuresNeedsRepair);
            }
            creep.setAction('repair');
        }
      }

    }
}

export default builder;
