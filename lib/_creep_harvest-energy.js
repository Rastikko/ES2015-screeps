'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var harvestEnergy = function harvestEnergy(flag) {
  if (this.hasActed) return;

  if (this.carry.energy < this.carryCapacity) {
    var sources = undefined;
    if (flag) {
      sources = this.room.LookForAt('source', flag);
      console.log("Harvesting " + flag);
    }
    if (!sources) {
      sources = this.room.find(FIND_SOURCES);
    }
    if (this.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      this.moveTo(sources[0]);
    }
    this.setAction('harvest');
  }
};

exports.default = harvestEnergy;
module.exports = exports['default'];