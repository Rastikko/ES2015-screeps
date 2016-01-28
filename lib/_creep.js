'use strict';

Creep.prototype.setAction = function (action) {
  if (this.memory.action !== action) {
    this.memory.action = action || 'error';
    this.say(action);
  }
  this.hasActed = true;
};

Creep.prototype.depositEnergy = function () {
  if (this.hasActed) return;
  var extensions = this.room.find(FIND_MY_STRUCTURES, {
    filter: {
      structureType: STRUCTURE_EXTENSION
    }
  });
  var target = Game.spawns.Spawn1;
  if (this.memory.tag === 'secondary') {
    var tower = this.room.find(FIND_MY_STRUCTURES, {
      filter: {
        structureType: STRUCTURE_TOWER
      }
    });
    if (tower[0].energy < tower[0].energyCapacity) {
      target = tower[0];
    }
  }
  if (extensions.length) {
    for (var i = 0; i < extensions.length; i++) {
      if (extensions[i].energy < extensions[i].energyCapacity) {
        target = extensions[i];
      }
    }
  }
  if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    this.moveTo(target);
  }
  this.setAction('deposit');
};