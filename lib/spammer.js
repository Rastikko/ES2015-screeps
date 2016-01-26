'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isEnergyOver(energy) {
  return Game.spawns.Spawn1.energy > energy;
}

function createHarvester() {
  if (!isEnergyOver(149)) {
    return false;
  }
  var attributes = [WORK, MOVE, CARRY];
  var properties = { role: 'harvester' };
  Game.spawns.Spawn1.createCreep(attributes, null, properties);
  return true;
}

function createBuilder() {
  if (!isEnergyOver(149)) {
    return false;
  }
  var attributes = [WORK, MOVE, CARRY];
  var properties = { role: 'builder' };
  Game.spawns.Spawn1.createCreep(attributes, null, properties);
  return true;
}

function createUpgrader() {
  if (!isEnergyOver(299)) {
    return false;
  }
  var attributes = [WORK, MOVE, CARRY, CARRY, CARRY];
  var properties = { role: 'upgrader' };
  Game.spawns.Spawn1.createCreep(attributes, null, properties);
  return true;
}

function createGuard() {
  if (!isEnergyOver(149)) {
    return false;
  }
  var attributes = [ATTACK, TOUGH, MOVE];
  var properties = { role: 'guard' };
  Game.spawns.Spawn1.createCreep(attributes, null, properties);
  return true;
}

// Number of creeeps, createFunction, isFinished
var developmentState = {
  harvester: [3, createHarvester],
  builder: [8, createBuilder],
  upgrader: [2, createUpgrader],
  guard: [2, createGuard]
};

var Spammer = function () {
  function Spammer(roomGame, state) {
    _classCallCheck(this, Spammer);

    this.roomGame = roomGame;

    this.calculateState(state);

    if (this.isFinished === undefined) {
      this.isFinished = true;
      // If we have extra energy to spare then create some more guards
      if (isEnergyOver(280) && this.roomGame.countCreeps('guard') < 8) {
        createGuard();
      }
    }
  }

  _createClass(Spammer, [{
    key: 'calculateState',
    value: function calculateState(state) {
      var _this = this;

      // right now we are just assuming we are always in development state
      Object.keys(developmentState).forEach(function (key) {
        // if we already defined that we are not finished it means that we
        // attempted to create a creep before
        if (_this.isFinished === false) {
          return;
        }
        var nKeyCreeps = _this.roomGame.countCreeps(key);
        if (nKeyCreeps < developmentState[key][0]) {
          developmentState[key][1]();
          _this.isFinished = false;
        }
      });
    }
  }]);

  return Spammer;
}();

exports.default = Spammer;
module.exports = exports['default'];