// const workerParts = [WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY];
// const moverParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY];
// const builderParts = [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY];

// const workerParts = [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY];
// const moverParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
// const builderParts = [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY];

const workerParts = [WORK, CARRY, MOVE];
const moverParts = [CARRY, MOVE];
const builderParts = [WORK, MOVE, CARRY];

let state = [
  {
    // harvester for the miner
    count: 3,
    parts: workerParts,
    memory: {
      role: 'harvester',
      flagName: 'Miner',
      transferer: false
    }
  },
  {
    // depositers for the main miner
    count: 3,
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
    // transporters for the spawn in miner 2
    count: 2,
    parts: moverParts,
    memory: {
      role: 'depositer',
      flagName: 'Upgrader',
      transferer: false
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
    // builders and repair
    count: 2,
    parts: builderParts,
    memory: {
      role: 'builder',
      flagName: false,
      transferer: false
    }
  }
];

// export totalCount = 18;
export default state;
