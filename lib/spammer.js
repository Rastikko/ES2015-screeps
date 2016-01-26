'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: decouple all Game references into a gameInstance object

function countCreeps(role) {
  var n = 0;
  Object.keys(Game.creeps).forEach(function (creepKey) {
    if (Game.creeps[creepKey].memory.role === role) {
      n++;
    }
  });
  return n;
}

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

var developmentState = {
  harvester: [3, createHarvester],
  builder: [1, createBuilder],
  upgrader: [2, createUpgrader],
  guard: [2, createGuard]
};

var Spammer = function Spammer(state) {
  var _this = this;

  _classCallCheck(this, Spammer);

  // right now we are just assuming we are always in development state

  var totalCreeps = 0;
  Object.keys(developmentState).forEach(function (key) {
    // if we already defined that we are not finished it means that we
    // attempted to create a creep before
    if (_this.isFinished === false) {
      return;
    }
    var nKeyCreeps = countCreeps(key);
    if (nKeyCreeps < developmentState[key][0]) {
      developmentState[key][1]();
      _this.isFinished = false;
    }
  });

  if (this.isFinished === undefined) {
    this.isFinished = true;
  }
};

exports.default = Spammer;
module.exports = exports['default'];