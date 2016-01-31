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

// Tier 2
const developmentState = {
  harvesterminer: [3, [WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY], { role: 'harvester', flag: Game.flags.Miner}],
  depositer: [6, [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], { role: 'depositer', flag: Game.flags.Miner}],
  harvesterUpgrader: [2, [WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY], { role: 'harvester', flag: Game.flags.Upgrader}],
  depositerUpgrader: [2, [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], { role: 'depositer', flag: Game.flags.Upgrader}],
  upgrader: [3, [WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY], { role: 'upgrader', flag: Game.flags.Upgrader}],
  // upgrader: [4, [WORK, MOVE, MOVE, MOVE, CARRY], { role: 'upgrader'}],
  builder: [2, [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY], { role: 'builder' }]
  // guard: [2, [ATTACK, ATTACK, TOUGH, MOVE, MOVE], { role: 'guard' }]
};

function countCreeps(role, flag) {
  let n = 0;
  Object.keys(Game.creeps).forEach((creepKey) => {
    if (Game.creeps[creepKey].memory.role === role) {
      if (flag && Game.creeps[creepKey].memory.flag && flag.name === Game.creeps[creepKey].memory.flag.name) {
        n++;
      } else if (!flag) {
        n++;
      }
    }
  });
  return n;
}

class CreepFactory {
  constructor(state) {
    this.spawn = Game.spawns.Spawn1;
    if (!this.spawn) {
      return;
    }
    this.spawn.memory['isFinished'] = undefined;

    this._calculateState(state);

    if (this.spawn.memory['isFinished'] === undefined) {
      this.spawn.memory['isFinished'] = true;
    }
    if (countCreeps('depositer') === 0) {
      this.spawn.depositerAvailable = false;
    } else {
      this.spawn.depositerAvailable = true;
    }
  }

  _calculateState(state) {
    // right now we are just assuming we are always in development state
    Object.keys(developmentState).forEach((key) => {
      // if we already defined that we are not finished it means that we
      // attempted to create a creep before
      if (this.spawn.memory['isFinished'] === false) {
        return;
      }
      let nKeyCreeps = countCreeps(developmentState[key][2].role, developmentState[key][2].flag);
      if (nKeyCreeps < developmentState[key][0]) {
        this.spawn.addCreep(developmentState[key][1], developmentState[key][2]);
        this.spawn.memory['isFinished'] = false;
      }
    });
  }
}

export default CreepFactory;
