const workerParts = [WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY];
const moverParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY];
const builderParts = [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY];

let state = [
  {
    // harvester for the miner
    count: 3,
    parts: workerParts,
    memory: {
      role: 'harvester',
      flagName: 'Miner'
    }
  },
  {
    // depositers for the main miner
    count: 6,
    parts: moverParts,
    memory: {
      role: 'depositer',
      flagName: 'Miner'
    }
  },
  {
    // harvester for secondary miner (near upgrader)
    count: 2,
    parts: workerParts,
    memory: {
      role: 'harvester',
      flagName: 'Upgrader'
    }
  },
  {
    // transporters for the upgraders
    count: 3,
    parts: moverParts,
    memory: {
      role: 'depositer',
      flagName: 'Upgrader'
    }
  },
  {
    // workers to upgrade
    count: 2,
    parts: workerParts,
    memory: {
      role: 'upgrader',
      flagName: 'Upgrader'
    }
  },
  {
    // builders and repair
    count: 6,
    parts: builderParts,
    memory: {
      role: 'builder'
    }
  }
];

// export totalCount = 18;
export default state;
