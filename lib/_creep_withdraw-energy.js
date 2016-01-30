'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var withdrawEnergy = function withdrawEnergy(flag) {
  var _this = this;

  if (this.hasActed) return;

  var thisEmpty = this.carry.energy === 0;
  var spawnFinished = Game.spawns.Spawn1.memory['isFinished'];
  var transferEnergy = this.memory.transferEnergy;

  if ((thisEmpty || transferEnergy) && flag) {
    (function () {
      var creeps = Game.creeps;
      var thechoosenone = undefined;

      Object.keys(creeps).every(function (key) {
        var sameFlag = creeps[key].memory.flag && creeps[key].memory.flag.name === flag.name;
        var harvesterRole = creeps[key].memory.role === 'harvester';
        var isNotReserved = !creeps[key].isReserved;
        if (sameFlag && harvesterRole && isNotReserved) {
          thechoosenone = creeps[key];
          return false;
        }
        return true;
      });

      if (thechoosenone !== undefined) {
        if (thechoosenone.transfer(_this, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          _this.moveTo(thechoosenone);
        }
        thechoosenone.isReserved = true;
        _this.setAction('steal');
        if (_this.carry.energy !== _this.carryCapacity) {
          _this.memory.transferEnergy = true;
        } else {
          _this.memory.transferEnergy = false;
        }
      }
    })();
  }

  if ((thisEmpty || transferEnergy) && spawnFinished && !flag) {
    // If we pass a flag we should then mine the closest to the flag
    if (Game.spawns.Spawn1.transferEnergy(this) === ERR_NOT_IN_RANGE) {
      this.moveTo(Game.spawns.Spawn1);
    }
    this.setAction('withdraw');
    if (this.carry.energy !== this.carryCapacity) {
      this.memory.transferEnergy = true;
    } else {
      this.memory.transferEnergy = false;
    }
  }

  if (!spawnFinished && !this.hasActed) {
    this.moveTo(Game.flags.Away);
  }
};

exports.default = withdrawEnergy;
module.exports = exports['default'];