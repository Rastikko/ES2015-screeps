'use strict';

var _harvester = require('harvester');

var _harvester2 = _interopRequireDefault(_harvester);

var _builder = require('builder');

var _builder2 = _interopRequireDefault(_builder);

var _guard = require('guard');

var _guard2 = _interopRequireDefault(_guard);

var _spammer = require('spammer');

var _spammer2 = _interopRequireDefault(_spammer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.loop = function () {

		(0, _spammer2.default)();

		for (var name in Game.creeps) {
				var creep = Game.creeps[name];

				if (creep.memory.role == 'harvester') {
						(0, _harvester2.default)(creep);
				}

				if (creep.memory.role == 'builder') {
						(0, _builder2.default)(creep);
				}
				if (creep.memory.role == 'guard') {
						(0, _guard2.default)(creep);
				}
		}
};