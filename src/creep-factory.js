import developmentState from 'creep-factory-state';

// Tier 0 just for practice
// const developmentState = {
//   harvesterSpawn: [1, [WORK, WORK, MOVE, CARRY], { role: 'harvester', flag: Game.flags.Miner}],
//   depositer: [1, [MOVE, MOVE, MOVE, CARRY, CARRY], { role: 'depositer', flag: Game.flags.Miner}],
// };

// Tier 1 normal development
// const developmentState = {
//   harvesterminer: [3, [WORK, WORK, MOVE, CARRY], { role: 'harvester', flag: Game.flags.Miner}],
//   depositer: [8, [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY], { role: 'depositer', flag: Game.flags.Miner}],
//   harvesterUpgrader: [2, [WORK, WORK, MOVE, CARRY], { role: 'harvester', flag: Game.flags.Upgrader}],
//   upgraderFlag: [4, [WORK, MOVE, MOVE, MOVE, CARRY], { role: 'upgrader', flag: Game.flags.Upgrader}],
//   // upgrader: [4, [WORK, MOVE, MOVE, MOVE, CARRY], { role: 'upgrader'}],
//   builder: [4, [WORK, MOVE, MOVE, CARRY, CARRY], { role: 'builder' }]
//   // guard: [2, [ATTACK, ATTACK, TOUGH, MOVE, MOVE], { role: 'guard' }]
// };

function countCreeps(role, flagName) {
  let n = 0;
  for(let name in Game.creeps) {
    if (Game.creeps[name].memory.role ===role) {
      let creepFlag = Game.creeps[creepKey].memory.flag;
      if (flagName && creepFlag && creepFlag.name === flagName) {
        n++;
      } else if (!flag) {
        n++;
      }
    }
  }
  return n;
}

class CreepFactory {
  constructor() {
    this.spawn = Game.spawns.Spawn1;
    if (!this.spawn) {
      return;
    }

    this.spawn.isFinished = undefined;
    this._spawnCreeps();

    if (this.spawn.isFinished === undefined) {
      this.spawn.isFinished = true;
    }

    if (countCreeps('depositer') === 0) {
      this.spawn.depositerAvailable = false;
    } else {
      this.spawn.depositerAvailable = true;
    }
  }

  _spawnCreeps() {

    for(let buildStack in developmentState) {
      if (this.spawn.isFinished === false) {
        return;
      }
      let nKeyCreeps = countCreeps(buildStack.memory.role, buildStack.memory.flagName);
      if (nKeyCreeps < buildStack.count) {
        this.spawn.addCreep(buildStack.attributes, buildStack.memory);
        this.spawn.isFinished= false;
      }
    }
  }
}

export default CreepFactory;
