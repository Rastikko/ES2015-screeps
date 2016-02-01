import _ from 'lodash';
import developmentState from 'creep-factory-state';

function countCreeps(memory) {
  let n = 0;
  for (let name in Game.creeps) {
    let creepMemory = Game.creeps[name].memory;
    let sameCreep = true;
    for (let memoryKey in memory) {
      if (creepMemory.hasOwnProperty(memoryKey) && creepMemory[memoryKey] === memory[memoryKey] ) {
        continue;
      }
      sameCreep = false;
    }
    if (sameCreep) {
      n++;
    }
  }
  return n;
}

class CreepFactory {
  constructor() {
    this.spawn = Game.spawns.Spawn1;
    this.spawn.totalCreeps = 14;

    if (!this.spawn) {
      return;
    }

    this.spawn.isFinished = undefined;
    this._spawnCreeps();

    if (this.spawn.isFinished === undefined) {
      this.spawn.isFinished = true;
    }

    if (countCreeps({role: 'depositer'}) === 0) {
      this.spawn.depositerAvailable = false;
    } else {
      this.spawn.depositerAvailable = true;
    }
  }

  _spawnCreeps() {
    for (let buildStack of developmentState) {
      if (this.spawn.isFinished === false) {
        return;
      }
      let nKeyCreeps = countCreeps(buildStack.memory);
      if (nKeyCreeps < buildStack.count) {
        console.log("Creating " + buildStack.memory.role + " " + nKeyCreeps + "/" + buildStack.count + ", flag: " + buildStack.memory.flagName);
        this.spawn.addCreep(buildStack.parts, buildStack.memory);
        this.spawn.isFinished= false;
      }
    }
  }

}

export default CreepFactory;
