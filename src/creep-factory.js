import developmentState from 'creep-factory-state';

function countCreeps(role, flagName) {
  let n = 0;
  for(let name in Game.creeps) {
    if (Game.creeps[name].memory.role ===role) {
      let creepFlag = Game.creeps[name].memory.flag;
      if (flagName && creepFlag && creepFlag.name === flagName) {
        n++;
      } else if (!flagName) {
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
    for (let buildStack of developmentState) {
      if (this.spawn.isFinished === false) {
        return;
      }
      let nKeyCreeps = countCreeps(buildStack.memory.role, buildStack.memory.flagName);
      if (nKeyCreeps < buildStack.count) {
        this.spawn.addCreep(buildStack.parts, buildStack.memory);
        this.spawn.isFinished= false;
      }
    }
  }

}

export default CreepFactory;
