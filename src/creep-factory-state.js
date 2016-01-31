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

// Tier 1 normal development
// const developmentState = {
//   harvesterminer: [3, [WORK, WORK, MOVE, CARRY], { role: 'harvester', flag: Game.flags.Miner}],
//   depositer: [8, [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY], { role: 'depositer', flag: Game.flags.Miner}],
//   harvesterUpgrader: [2, [WORK, WORK, MOVE, CARRY], { role: 'harvester', flag: Game.flags.Upgrader}],
//   upgraderFlag: [4, [WORK, MOVE, MOVE, MOVE, CARRY], { role: 'upgrader', flag: Game.flags.Upgrader}],
//   // upgrader: [4, [WORK, MOVE, MOVE, MOVE, CARRY], { role: 'upgrader'}],
//   builder: [4, [WORK, MOVE, MOVE, CARRY, CARRY], { role: 'builder' }]
//   // guard: [2, [ATTACK, ATTACK, TOUGH, MOVE, MOVE], { role: 'guard' }]
// };

export totalCount = 18;
export default state;
