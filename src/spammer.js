function countCreeps() {
  let n = 0;
  Object.keys(Game.creeps).forEach(() => {
    n++;
  });
  return n;
}

function createHarvester() {
  console.log("CREATE HARVESTER!");
}

function createBuilder() {
  console.log("CREATE BUILDER!");
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
