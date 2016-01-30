'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const developmentState = {
//   harvesterSpawn: [4, [WORK, WORK, MOVE, CARRY], { role: 'harvester', flag: Game.flags.Miner}],
//   haversterUpgrader: [1, [WORK, WORK, MOVE, CARRY], { role: 'harvester', flag: Game.flags.Upgrader}],
//   builder: [3, [WORK, MOVE, MOVE, CARRY, CARRY], { role: 'builder' }],
//   upgrader: [5, [WORK, MOVE, MOVE, MOVE, CARRY], { role: 'upgrader' }],
//   // guard: [2, [ATTACK, ATTACK, TOUGH, MOVE, MOVE], { role: 'guard' }]
// };

var developmentState = {
  harvesterSpawn: [1, [WORK, WORK, MOVE, CARRY], { role: 'harvester', flag: Game.flags.Miner }],
  depositer: [1, [MOVE, MOVE, MOVE, CARRY, CARRY], { role: 'depositer', flag: Game.flags.Miner }]
};

function countCreeps(role) {
  var n = 0;
  Object.keys(Game.creeps).forEach(function (creepKey) {
    if (Game.creeps[creepKey].memory.role === role) {
      n++;
    }
  });
  return n;
}

var CreepFactory = function () {
  function CreepFactory(state) {
    _classCallCheck(this, CreepFactory);

    this.spawn = Game.spawns.Spawn1;
    if (!this.spawn) {
      return;
    }
    this.spawn.memory['isFinished'] = undefined;

    this._calculateState(state);

    if (this.spawn.memory['isFinished'] === undefined) {
      this.spawn.memory['isFinished'] = true;
    }
    if (countCreeps('depositer') === 0) {
      this.spawn.depositerAvailable = false;
    } else {
      this.spawn.depositerAvailable = true;
    }
  }

  _createClass(CreepFactory, [{
    key: '_calculateState',
    value: function _calculateState(state) {
      var _this = this;

      // right now we are just assuming we are always in development state
      Object.keys(developmentState).forEach(function (key) {
        // if we already defined that we are not finished it means that we
        // attempted to create a creep before
        if (_this.spawn.memory['isFinished'] === false) {
          return;
        }
        var nKeyCreeps = countCreeps(developmentState[key][2].role);
        if (nKeyCreeps < developmentState[key][0]) {
          _this.spawn.addCreep(developmentState[key][1], developmentState[key][2]);
          _this.spawn.memory['isFinished'] = false;
        }
      });
    }
  }]);

  return CreepFactory;
}();

exports.default = CreepFactory;
module.exports = exports['default'];