'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var depositFlag = function depositFlag() {
  if (this.hasActed) return;
  var target = undefined;
  var flagName = this.memory.flagName;

  // for now just transfer to upgraders
  var closestCreep = Game.flags[flagName].pos.findClosestByRange(FIND_MY_CREEPS, {
    filter: function filter(creep) {
      var upgraderRole = creep.memory.role === 'upgrader';
      var isAlmostEmpty = creep.carry.energy < 40;
      if (upgraderRole && isAlmostEmpty) {
        return true;
      }
    }
  });

  var result = this.transfer(closestCreep, RESOURCE_ENERGY);

  if (result === ERR_NOT_IN_RANGE) {
    this.moveTo(closestCreep);
  }

  this.setAction('deposit');
};

exports.default = depositFlag;
module.exports = exports['default'];