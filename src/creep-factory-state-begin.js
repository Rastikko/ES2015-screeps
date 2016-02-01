const workerParts = [WORK, WORK, CARRY, MOVE];
const moverParts = [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY];
const builderParts = [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY];
const attackerParts = [];

let state = [
  {
    // harvester for the miner
    count: 1,
    parts: workerParts,
    memory: {
      role: 'harvester',
      flagName: 'Miner',
      transferer: false
    }
  },
  {
    // depositers for the main miner
    count: 2,
    parts: moverParts,
    memory: {
      role: 'depositer',
      flagName: 'Miner',
      transferer: false
    }
  },
  // {
  //   // depositers for the main miner
  //   count: 3,
  //   parts: moverParts,
  //   memory: {
  //     role: 'depositer',
  //     flagName: 'Miner',
  //     transferer: false
  //   }
  // }
];

// export totalCount = 18;
export default state;
