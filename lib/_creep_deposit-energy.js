'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var depositEnergy = function depositEnergy() {
  if (this.hasActed) return;
  var target = undefined;

  var extension = this.room.getExtension();
  if (extension) {
    target = extension;
  }

  if (target === undefined) {
    target = Game.spawns.Spawn1;
    if (target.energy === target.energyCapacity) {
      target = this.room.getStorage();
    }
  }

  if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    this.moveTo(target);
  }

  this.setAction('deposit');
};

exports.default = depositEnergy;
module.exports = exports['default'];