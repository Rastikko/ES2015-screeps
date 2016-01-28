'use strict';

Creep.prototype.setAction = function (action) {
  if (this.memory.action !== action) {
    this.memory.action = action || 'error';
    this.say(action);
  }
  this.hasActed = true;
};

Creep.prototype.harvestEnergy = function (flag) {
  if (this.hasActed) return;
  if (this.carry.energy < this.carryCapacity) {
    var sources = this.room.find(FIND_SOURCES);
    if (this.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      this.moveTo(sources[0]);
    }
    this.setAction('harvest');
  }
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

Creep.prototype.withdrawEnergy = function () {
  if (this.hasActed) return;

  var thisEmpty = this.carry.energy === 0;
  var spawnFinished = Game.spawns.Spawn1.memory['isFinished'];
  var transferEnergy = this.memory.transferEnergy;

  if ((thisEmpty || transferEnergy) && spawnFinished) {
    // If we pass a flag we should then mine the closest to the flag

    if (Game.spawns.Spawn1.transferEnergy(this) === ERR_NOT_IN_RANGE) {
      this.moveTo(Game.spawns.Spawn1);
    }
    if (this.carry.energy !== this.carryCapacity) {
      this.memory.transferEnergy = true;
    } else {
      this.memory.transferEnergy = false;
    }
    this.setAction('withdraw');
  }
};

Creep.prototype.upgrade = function () {
  if (this.hasActed) return;
  if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE) {
    this.moveTo(this.room.controller);
  }
  this.setAction('u:upgrade');
};