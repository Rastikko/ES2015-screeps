'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var depositEnergy = function depositEnergy(flag) {
  if (this.hasActed) return;
  var target = undefined;

  // An upgrader flag means that we want to deposit on upgraders
  if (flag && flag.name === 'Upgrader') {
    (function () {
      var creeps = Game.creeps;

      Object.keys(creeps).every(function (key) {
        var upgraderRole = creeps[key].memory.role === 'upgrader';
        var isEmpty = creeps[key].carry.energy === 0;
        if (upgraderRole && isEmpty) {
          target = creeps[key];
          return false;
        }
        return true;
      });
    })();
  } else {
    var extensions = this.room.find(FIND_MY_STRUCTURES, {
      filter: {
        structureType: STRUCTURE_EXTENSION
      }
    });

    if (extensions.length) {
      for (var i = 0; i < extensions.length; i++) {
        if (extensions[i].energy < extensions[i].energyCapacity) {
          target = extensions[i];
        }
      }
    }
  }

  if (target === undefined) {
    target = Game.spawns.Spawn1;
  }

  if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    this.moveTo(target);
  }

  // TODO: delete legacy code
  // if (this.memory.tag === 'secondary') {
  //   let tower = this.room.find(FIND_MY_STRUCTURES, {
  //     filter: {
  //       structureType: STRUCTURE_TOWER
  //     }
  //   });
  //   if (tower[0].energy < tower[0].energyCapacity) {
  //     target = tower[0];
  //   }
  // }

  // TODO: if the spawn and the creep are full get out of the way

  this.setAction('deposit');
};

exports.default = depositEnergy;
module.exports = exports['default'];