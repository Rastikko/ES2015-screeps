// const developmentState = {
//   harvesterSpawn: [4, [WORK, WORK, MOVE, CARRY], { role: 'harvester', flag: Game.flags.Miner}],
//   haversterUpgrader: [1, [WORK, WORK, MOVE, CARRY], { role: 'harvester', flag: Game.flags.Upgrader}],
//   builder: [3, [WORK, MOVE, MOVE, CARRY, CARRY], { role: 'builder' }],
//   upgrader: [5, [WORK, MOVE, MOVE, MOVE, CARRY], { role: 'upgrader' }],
//   // guard: [2, [ATTACK, ATTACK, TOUGH, MOVE, MOVE], { role: 'guard' }]
// };

const developmentState = {
  harvesterSpawn: [1, [WORK, WORK, MOVE, CARRY], { role: 'harvester', flag: Game.flags.Miner}],
  depositer: [1, [MOVE, MOVE, MOVE, CARRY, CARRY], { role: 'depositer', flag: Game.flags.Miner}],
};


function countCreeps(role) {
  let n = 0;
  Object.keys(Game.creeps).forEach((creepKey) => {
    if (Game.creeps[creepKey].memory.role === role) {
      n++;
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
      let nKeyCreeps = countCreeps(developmentState[key][2].role);
      if (nKeyCreeps < developmentState[key][0]) {
        this.spawn.addCreep(developmentState[key][1], developmentState[key][2]);
        this.spawn.memory['isFinished'] = false;
      }
    });
  }
}

export default CreepFactory;
