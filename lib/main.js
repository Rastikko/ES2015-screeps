'use strict';

require('_creep');

require('_spawn');

var _creepFactory = require('creep-factory');

var _creepFactory2 = _interopRequireDefault(_creepFactory);

var _harvester = require('harvester');

var _harvester2 = _interopRequireDefault(_harvester);

var _builder = require('builder');

var _builder2 = _interopRequireDefault(_builder);

var _guard = require('guard');

var _guard2 = _interopRequireDefault(_guard);

var _upgrader = require('upgrader');

var _upgrader2 = _interopRequireDefault(_upgrader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.loop = function () {

  var spammer = new _creepFactory2.default('placeholder_state');

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role == 'harvester') {
      creep.harvestEnergy();
      creep.depositEnergy();
    }

    if (creep.memory.role === 'upgrader') {
      creep.withdrawEnergy();
      creep.upgrade();
    }

    if (creep.memory.role == 'builder') {
      (0, _builder2.default)(creep);
    }

    if (creep.memory.role == 'guard') {
      (0, _guard2.default)(creep);
    }
  }

  // TODO: if nobody have reserved the energy then spam guards
};