'use strict';

require('_creep');

require('_spawn');

var _creepFactory = require('creep-factory');

var _creepFactory2 = _interopRequireDefault(_creepFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.loop = function () {

  var spammer = new _creepFactory2.default('placeholder_state');

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role == 'harvester') {
      creep.harvestEnergy(creep.memory.flag);
      if (!Game.spawns.Spawn1.depositerAvailable) {
        creep.depositEnergy();
      }
    }

    if (creep.memory.role == 'depositer') {
      creep.withdrawEnergy(creep.memory.flag);
      creep.depositEnergy(creep.memory.flag);
    }

    if (creep.memory.role === 'upgrader') {
      // creep.withdrawEnergy(creep.memory.flag);
      creep.upgrade();
    }

    if (creep.memory.role == 'builder') {
      creep.withdrawEnergy();
      creep.buildConstruction();
      creep.repairConstruction();
    }

    if (creep.memory.role == 'guard') {
      creep.guard();
    }
  }

  // TODO: if nobody have reserved the energy then spam guards
};