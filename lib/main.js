'use strict';

require('_structure');

var _roomGame = require('room-game');

var _roomGame2 = _interopRequireDefault(_roomGame);

var _spammer = require('spammer');

var _spammer2 = _interopRequireDefault(_spammer);

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

  var roomGame = new _roomGame2.default('Spawn1');
  var spammer = new _spammer2.default(roomGame, 'placeholder');

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    // TODO: create grab max capacity mixin

    if (creep.memory.role == 'harvester') {
      (0, _harvester2.default)(creep);
    }

    if (creep.memory.role === 'upgrader') {
      (0, _upgrader2.default)(roomGame, creep);
    }

    if (creep.memory.role == 'builder') {
      (0, _builder2.default)(roomGame, creep);
    }

    if (creep.memory.role == 'guard') {
      (0, _guard2.default)(creep);
    }
  }

  // TODO: if nobody have reserved the energy then spam guards
};