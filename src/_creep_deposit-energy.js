let depositEnergy = function() {
  if (this.hasActed) return;
  let target;
  
  let extension = this.room.getExtension();
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
}

export default depositEnergy;
