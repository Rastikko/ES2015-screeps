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
    // Behaviour copy/pasta from https://github.com/Garethp/Screeps/blob/master/roles_builder.js
    //First, we're going to check for damaged ramparts. We're using ramparts as the first line of defense
    //and we want them nicely maintained. This is especially important when under attack. The builder will
    //repair the most damaged ramparts first
    var structures = creep.room.find(Game.STRUCTURES);
    var damagedRamparts = [ ];

    for(var index in structures)
    {
      var structure = structures[index];
      if(structure.structureType == 'rampart' && structure.hits < (structure.hitsMax - 50))
        damagedRamparts.push(structure);
    }

    damagedRamparts.sort(function(a, b)
    {
      return(a.hits - b.hits);
    });

    if(damagedRamparts.length)
    {
      creep.moveTo(damagedRamparts[0]);
      creep.repair(damagedRamparts[0]);

      return;
    }

    //Next we're going to look for general buildings that have less than 50% health, and we'll go to repair those.
    //We set it at 50%, because we don't want builders abandoning their duty every time a road gets walked on
    var halfBroken = creep.room.find(Game.STRUCTURES);
    var toRepair = [ ];
    for(var index in halfBroken)
      if((halfBroken[index].hits / halfBroken[index].hitsMax) < 0.5)
        toRepair.push(halfBroken[index]);

    if(toRepair.length)
    {
      var structure = toRepair[0];
      creep.moveTo(structure);
      creep.repair(structure);

      return;
    }

    //If no repairs are needed, we're just going to go find some structures to build
    var targets = creep.pos.findClosestByPath(Game.CONSTRUCTION_SITES);
    if(targets) {

      if(!creep.pos.isNearTo(targets))
        creep.moveTo(targets);

      if(creep.pos.inRangeTo(targets, 0))
        creep.suicide();

      creep.build(targets);
      return;
    }
  }
}

export default builder;
