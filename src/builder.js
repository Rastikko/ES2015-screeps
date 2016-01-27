function builder(roomGame, creep) {
    if (creep.carry.energy === 0 && roomGame.getSpawnMemory('spammerFinished')) {
    	if (Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
    		creep.moveTo(Game.spawns.Spawn1);
    	}
    } else {
    	let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    	if (targets.length) {
    		if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
    			creep.moveTo(targets[0]);
    		}
    	}

      // If there are no construction the repair walls
      if (!targets.length) {
        let wall = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if(wall) {
            if(creep.repair(wall) == ERR_NOT_IN_RANGE) {
                creep.moveTo(wall);
            }
        }
      }

    }
}

export default builder;
