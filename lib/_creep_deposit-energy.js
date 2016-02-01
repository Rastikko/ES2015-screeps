'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var depositEnergy = function depositEnergy() {
  if (this.hasActed) return;
  var target = undefined;
  var flagName = this.memory.flagName;
  // for now just transfer to upgraders
  var transferer = this.memory.transferer;

  // An upgrader flag means that we want to deposit on upgraders
  if (transferer) {
    (function () {
      var creeps = Game.creeps;

      Object.keys(creeps).every(function (key) {
        var upgraderRole = creeps[key].memory.role === 'upgrader';
        var isAlmostEmpty = creeps[key].carry.energy < 40;
        if (upgraderRole && isAlmostEmpty) {
          target = creeps[key];
          return false;
        }
        return true;
      });
    })();
  } else {
    var extension = this.room.getExtension();
    if (extension) {
      target = extension;
    }
  }

  // TODO: find a efficient way so Upgraders can default to just depositers
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