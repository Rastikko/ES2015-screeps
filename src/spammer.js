function countCreeps() {
  let n = 0;
  Object.keys(Game.creeps).forEach(() => {
    n++;
  });
  return n;
}

function createHarvester() {

}

function createBuilder() {

}

const developmentState = [createHarvester, createHarvester, createBuilder];

class spammer {
  constructor(state) {
    console.log(countCreeps());
  }
}

export default spammer;
