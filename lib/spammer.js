'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

function createChoosenOne() {
  if (!isEnergyOver(299)) {
    return false;
  }
  var attributes = [WORK, MOVE, CARRY, CARRY, CARRY, CARRY];
  var properties = { role: 'thechoosenone' };
  Game.spawns.Spawn1.createCreep(attributes, 'thechoosenone', properties);
  return true;
}

var developmentState = {
  harvester: [2, createHarvester],
  builder: [2, createBuilder],
  thechoosenone: [1, createChoosenOne]
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