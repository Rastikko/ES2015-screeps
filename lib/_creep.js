'use strict';

var _creep_harvestEnergy = require('_creep_harvest-energy');

var _creep_harvestEnergy2 = _interopRequireDefault(_creep_harvestEnergy);

var _creep_withdrawEnergy = require('_creep_withdraw-energy');

var _creep_withdrawEnergy2 = _interopRequireDefault(_creep_withdrawEnergy);

var _creep_depositEnergy = require('_creep_deposit-energy');

var _creep_depositEnergy2 = _interopRequireDefault(_creep_depositEnergy);

var _creep_depositFlag = require('_creep_deposit-flag');

var _creep_depositFlag2 = _interopRequireDefault(_creep_depositFlag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Creep.prototype.setAction = function (action) {
  if (this.memory.action !== action) {
    this.memory.action = action || 'error';
    this.say(action);
  }
  this.hasActed = true;
};

Creep.prototype.harvestEnergy = _creep_harvestEnergy2.default;

Creep.prototype.depositEnergy = _creep_depositEnergy2.default;

Creep.prototype.depositFlag = _creep_depositFlag2.default;

Creep.prototype.withdrawEnergy = _creep_withdrawEnergy2.default;

Creep.prototype.upgrade = function () {
  if (this.hasActed) return;
  // If not enought resources just move
  if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE) {
    this.moveTo(this.room.controller);
  }
  this.setAction('upgrade');
};

Creep.prototype.buildConstruction = function () {
  if (this.hasActed) return;
  var targets = this.room.find(FIND_CONSTRUCTION_SITES);
  if (targets.length) {
    if (this.build(targets[0]) === ERR_NOT_IN_RANGE) {
      this.moveTo(targets[0]);
    }
    this.setAction('build');
  }
};

Creep.prototype.repairConstruction = function () {
  if (this.hasActed) return;
  var structuresNeedsRepair = this.room.find(FIND_STRUCTURES, {
    filter: function filter(structure) {
      var isHalfDamaged = structure.hits < structure.hitsMax / 2;
      var isNotALotOfWork = structure.hits < 300000;
      return isHalfDamaged && isNotALotOfWork;
    }
  });

  if (structuresNeedsRepair.length) {
    if (this.repair(structuresNeedsRepair[0]) === ERR_NOT_IN_RANGE) {
      this.moveTo(structuresNeedsRepair[0]);
    }
    this.setAction('repair');
  }
};

Creep.prototype.guard = function () {
  if (this.hasActed) return;
  var targets = this.room.find(FIND_HOSTILE_CREEPS);

  if (targets.length) {
    if (this.attack(targets[0]) == ERR_NOT_IN_RANGE) {
      this.moveTo(targets[0]);
    }
  } else {
    this.moveTo(Game.flags.Guard);
  }
  this.setAction('guarding');
};