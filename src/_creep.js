Creep.prototype.depositEnergy = function() {
  if (this.hasActed) return;
  let extensions = this.room.find(FIND_MY_STRUCTURES, {
    filter: {
      structureType: STRUCTURE_EXTENSION
    }
  });
  let target = Game.spawns.Spawn1;
  if (this.memory.tag === 'secondary') {
    let tower = this.room.find(FIND_MY_STRUCTURES, {
      filter: {
        structureType: STRUCTURE_TOWER
      }
    });
    if (tower[0].energy < tower[0].energyCapacity) {
      target = tower[0];
    }
  }
  if (extensions.length) {
    for (let i = 0; i < extensions.length; i++) {
      if (extensions[i].energy < extensions[i].energyCapacity) {
        target = extensions[i];
      }
    }
  }
  if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    this.moveTo(target);
  }
  this.setAction('depositing');
}
