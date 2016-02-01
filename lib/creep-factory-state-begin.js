'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var workerParts = [WORK, WORK, CARRY, MOVE];
var moverParts = [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY];
var builderParts = [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY];
var attackerParts = [];

var state = [{
  // harvester for the miner
  count: 1,
  parts: workerParts,
  memory: {
    role: 'harvester',
    flagName: 'Miner',
    transferer: false
  }
}, {
  // depositers for the main miner
  count: 2,
  parts: moverParts,
  memory: {
    role: 'depositer',
    flagName: 'Miner',
    transferer: false
  }
}];

// export totalCount = 18;

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
exports.default = state;
module.exports = exports['default'];