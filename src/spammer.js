function countCreeps() {
  let n = 0;
  Object.keys(Game.creeps).forEach(() => {
    n++;
  });
  return n;
}

function isEnergyOver(energy) {
  return Game.spawns.Spawn1.energy > energy;
}

function createHarvester() {
  if (!isEnergyOver(150)) {
    return false;
  }
  let attributes = [WORK, MOVE, CARRY];
  let name = 'harvester' + countCreeps();
  let properties =  { role: 'harvester' };
  Game.spawns.Spawn1.createCreep(attributes, name, properties);
  return true;
}

function createBuilder() {
  if (!isEnergyOver(150)) {
    return false;
  }
  let attributes = [WORK, MOVE, CARRY];
  let name = 'builder' + countCreeps();
  let properties =  { role: 'builder' };
  Game.spawns.Spawn1.createCreep(attributes, name, properties);
  return true;
}

const developmentState = [createHarvester, createHarvester, createBuilder];

class Spammer {
  constructor(state) {
    // Right now we are just assuming we are always in development state
    let nCreeps = countCreeps();
    let createFunction = developmentState[nCreeps % developmentState.length];
    createFunction();
  }
}

export default Spammer;
