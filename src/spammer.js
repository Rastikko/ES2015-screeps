function isEnergyOver(energy) {
  return Game.spawns.Spawn1.energy > energy;
}

function createHarvester() {
  if (!isEnergyOver(149)) {
    return false;
  }
  let attributes = [WORK, MOVE, CARRY];
  let properties =  { role: 'harvester' };
  Game.spawns.Spawn1.createCreep(attributes, null, properties);
  return true;
}

function createBuilder() {
  if (!isEnergyOver(149)) {
    return false;
  }
  let attributes = [WORK, MOVE, CARRY];
  let properties =  { role: 'builder' };
  Game.spawns.Spawn1.createCreep(attributes, null, properties);
  return true;
}

function createUpgrader() {
  if (!isEnergyOver(299)) {
    return false;
  }
  let attributes = [WORK, MOVE, CARRY, CARRY, CARRY];
  let properties =  { role: 'upgrader' };
  Game.spawns.Spawn1.createCreep(attributes, null, properties);
  return true;
}

function createGuard() {
  if (!isEnergyOver(149)) {
    return false;
  }
  let attributes = [ATTACK, TOUGH, MOVE];
  let properties =  { role: 'guard' };
  Game.spawns.Spawn1.createCreep(attributes, null, properties);
  return true;
}

// Number of creeeps, createFunction, isFinished
const developmentState = {
  harvester: [3, createHarvester],
  builder: [8, createBuilder],
  upgrader: [2, createUpgrader],
  guard: [2, createGuard]
};

class Spammer {
  constructor(roomGame, state) {
    this.roomGame = roomGame;

    this.calculateState(state);

    if (this.isFinished === undefined) {
      this.isFinished = true;
      // If we have extra energy to spare then create some more guards
      if (isEnergyOver(280) && this.roomGame.countCreeps('guard') < 8) {
        createGuard();
      }
    }
  }

  calculateState(state) {
    // right now we are just assuming we are always in development state
    Object.keys(developmentState).forEach((key) => {
      // if we already defined that we are not finished it means that we
      // attempted to create a creep before
      if (this.isFinished === false) {
        return;
      }
      let nKeyCreeps = this.roomGame.countCreeps(key);
      if (nKeyCreeps < developmentState[key][0]) {
        developmentState[key][1]();
        this.isFinished = false;
      }
    });
  }
}

export default Spammer;
