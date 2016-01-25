function countCreeps(role) {
  let n = 0;
  Object.keys(Game.creeps).forEach((creepKey) => {
    if (Game.creeps[creepKey].memory.role === role) {
      n++;
    }
  });
  return n;
}

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

function createChoosenOne() {
  if (!isEnergyOver(299)) {
    return false;
  }
  let attributes = [WORK, MOVE, CARRY, CARRY, CARRY, CARRY];
  let properties =  { role: 'thechoosenone' };
  Game.spawns.Spawn1.createCreep(attributes, 'thechoosenone', properties);
  return true;
}

const developmentState = {
  harvester: [2, createHarvester],
  builder: [2, createBuilder],
  thechoosenone: [1, createChoosenOne]
};

class Spammer {
  constructor(state) {
    // right now we are just assuming we are always in development state

    let totalCreeps = 0;
    Object.keys(developmentState).forEach((key) => {
      // if we already defined that we are not finished it means that we
      // attempted to create a creep before
      if (this.isFinished === false) {
        return;
      }
      let nKeyCreeps = countCreeps(key);
      if (nKeyCreeps < developmentState[key][0]) {
        developmentState[key][1]();
        this.isFinished = false;
      }
    });

    if (this.isFinished === undefined) {
      this.isFinished = true;
    }
  }
}

export default Spammer;
