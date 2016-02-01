'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var withdrawEnergy = function withdrawEnergy(flag) {
  var _this = this;

  if (this.hasActed) return;

  var thisEmpty = this.carry.energy === 0;
  var spawnFinished = Game.spawns.Spawn1.isFinished;
  var transferEnergy = this.memory.transferEnergy;
  var flagName = this.memory.flagName;

  if ((thisEmpty || transferEnergy) && flagName) {
    (function () {
      var creeps = Game.creeps;
      var thechoosenone = undefined;

      // TODO: instead of choosing the first available
      Object.keys(creeps).every(function (key) {
        var sameFlag = creeps[key].memory.flagName === flagName;
        var harvesterRole = creeps[key].memory.role === 'harvester';
        var isNotReserved = !creeps[key].isReserved;
        var isEmpty = creeps[key].carry.energy < 20;
        if (sameFlag && harvesterRole && isNotReserved && !isEmpty) {
          thechoosenone = creeps[key];
          return false;
        }
        return true;
      });

      if (thechoosenone !== undefined) {
        if (thechoosenone.transfer(_this, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          _this.moveTo(thechoosenone);
          _this.setAction('m->steal');
        } else {
          thechoosenone.isReserved = true;
          _this.setAction('steal');
        }

        if (_this.carry.energy !== _this.carryCapacity) {
          _this.memory.transferEnergy = true;
        } else {
          _this.memory.transferEnergy = false;
        }
      }
    })();
  }

  if ((thisEmpty || transferEnergy) && spawnFinished && !flagName) {

    var target = this.room.getExtension(true);
    if (!target) {
      target = Game.spawns.Spawn1;
    }
    // If we pass a flag we should then mine the closest to the flag
    if (target.transferEnergy(this) === ERR_NOT_IN_RANGE) {
      this.moveTo(target);
    }
    this.setAction('withdraw');
    if (this.carry.energy !== this.carryCapacity) {
      this.memory.transferEnergy = true;
    } else {
      this.memory.transferEnergy = false;
    }
  }

  if (!spawnFinished && !this.hasActed && !flagName) {
    this.moveTo(Game.flags.Away);
  }
};

exports.default = withdrawEnergy;
module.exports = exports['default'];