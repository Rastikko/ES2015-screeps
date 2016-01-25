'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function countCreeps() {
  var n = 0;
  Object.keys(Game.creeps).forEach(function () {
    n++;
  });
  return n;
}

function isEnergyOver(energy) {
  return Game.spawns.Spawn1.energy > energy;
}

function createHarvester() {
  if (!isEnergyOver(150)) {
    return false;
  }
  var attributes = [WORK, MOVE, CARRY];
  var name = 'harvester' + countCreeps();
  var properties = { role: 'harvester' };
  Game.spawns.Spawn1.createCreep(attributes, name, properties);
  return true;
}

function createBuilder() {
  if (!isEnergyOver(150)) {
    return false;
  }
  var attributes = [WORK, MOVE, CARRY];
  var name = 'builder' + countCreeps();
  var properties = { role: 'builder' };
  Game.spawns.Spawn1.createCreep(attributes, name, properties);
  return true;
}

var developmentState = [createHarvester, createHarvester, createBuilder];

var Spammer = function Spammer(state) {
  _classCallCheck(this, Spammer);

  // Right now we are just assuming we are always in development state
  var nCreeps = countCreeps();
  var createFunction = developmentState[nCreeps % developmentState.length];
  createFunction();
};

exports.default = Spammer;
module.exports = exports['default'];