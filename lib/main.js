'use strict';

require('_creep');

require('_spawn');

require('_room');

var _creepFactory = require('creep-factory');

var _creepFactory2 = _interopRequireDefault(_creepFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.loop = function () {

  var spammer = new _creepFactory2.default();

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role == 'harvester') {
      creep.harvestEnergy();
      // optimization for the firsts spawns
      if (!Game.spawns.Spawn1.depositerAvailable) {
        creep.depositEnergy();
      }
    }

    if (creep.memory.role == 'depositer') {
      creep.withdrawEnergy();
      creep.depositEnergy();
    }

    if (creep.memory.role === 'upgrader') {
      creep.upgrade();
    }

    if (creep.memory.role == 'builder') {
      creep.withdrawEnergy();
      creep.buildConstruction();
      creep.repairConstruction();
    }

    if (creep.memory.role == 'repairer') {
      creep.withdrawEnergy();
      creep.repairConstruction();
    }

    if (creep.memory.role == 'guard') {
      creep.guard();
    }
  }

  // TODO: if nobody have reserved the energy then spam guards
};