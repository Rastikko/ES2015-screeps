// const workerParts = [WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY];
// const moverParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY];
// const builderParts = [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY];

// const workerParts = [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY];
// const moverParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
// const builderParts = [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY];

const workerParts = [WORK, WORK, CARRY, MOVE];
const moverParts = [CARRY, MOVE];
const builderParts = [WORK, CARRY, MOVE, CARRY, MOVE];

let state = [
  {
    // harvester for the miner
    count: 2,
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
  {
    // harvester for secondary miner (near upgrader)
    count: 2,
    parts: workerParts,
    memory: {
      role: 'harvester',
      flagName: 'Upgrader',
      transferer: false
    }
  },
  {
    // transporters for the upgraders
    count: 2,
    parts: moverParts,
    memory: {
      role: 'depositer',
      flagName: 'Upgrader',
      transferer: true
    }
  },
  {
    // workers to upgrade
    count: 3,
    parts: workerParts,
    memory: {
      role: 'upgrader',
      flagName: 'Upgrader',
      transferer: false
    }
  },
  {
    // builders
    count: 1,
    parts: builderParts,
    memory: {
      role: 'builder',
      flagName: false,
      transferer: false
    }
  }
];

export default state;
