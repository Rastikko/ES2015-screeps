module.exports = function() {

  // Check priority
    // If we are control level 1, we should go for level 2
    // If there are enemies lest spam guards and miners
    // If there are no enemies lest spam builders and miners
  // Build the ratio
  
    // console.log("Spawn1 energy: " + Game.spawns.Spawn1.energy);
    if (Game.creeps.miner1 === undefined && Game.spawns.Spawn1.energy > 200) {
        Game.spawns.Spawn1.createCreep([WORK, MOVE, CARRY], 'miner1');
        Memory.creeps.miner1.role = 'harvester';
    } else if (Game.creeps.miner2 === undefined && Game.spawns.Spawn1.energy > 200) {
        Game.spawns.Spawn1.createCreep([WORK, MOVE, CARRY], 'miner2');
        Memory.creeps.miner2.role = 'harvester';
    } else if (Game.creeps.builder1 === undefined && Game.spawns.Spawn1.energy > 200) {
        Game.spawns.Spawn1.createCreep([WORK, MOVE, CARRY], 'builder1');
        Memory.creeps.builder1.role = 'builder';
    } else if (Game.creeps.guard1 === undefined && Game.spawns.Spawn1.energy > 200) {
        console.log("CREATING GUARD!");
        Game.spawns.Spawn1.createCreep([ATTACK, TOUGH, MOVE], 'guard1');
        Memory.creeps.guard1.role = 'guard';
    }

}
