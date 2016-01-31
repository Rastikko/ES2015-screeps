'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var workerParts = [WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY];
var moverParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY];
var builderParts = [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY];

var state = [{
  // harvester for the miner
  count: 1,
  parts: workerParts,
  memory: {
    role: 'harvester',
    flagName: 'Miner'
  }
}, {
  // depositers for the main miner
  count: 2,
  parts: moverParts,
  memory: {
    role: 'depositer',
    flagName: 'Miner'
  }
}, {
  // harvester for the miner
  count: 2,
  parts: workerParts,
  memory: {
    role: 'harvester',
    flagName: 'Miner'
  }
}, {
  // depositers for the main miner
  count: 4,
  parts: moverParts,
  memory: {
    role: 'depositer',
    flagName: 'Miner'
  }
}, {
  // harvester for secondary miner (near upgrader)
  count: 2,
  parts: workerParts,
  memory: {
    role: 'harvester',
    flagName: 'Upgrader'
  }
}, {
  // transporters for the upgraders
  count: 3,
  parts: moverParts,
  memory: {
    role: 'depositer',
    flagName: 'Upgrader'
  }
}, {
  // workers to upgrade
  count: 2,
  parts: workerParts,
  memory: {
    role: 'upgrader',
    flagName: 'Upgrader'
  }
}, {
  // builders and repair
  count: 6,
  parts: builderParts,
  memory: {
    role: 'builder'
  }
}];

// export totalCount = 18;
exports.default = state;
module.exports = exports['default'];