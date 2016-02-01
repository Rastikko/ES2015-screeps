let depositEnergy = function() {
  if (this.hasActed) return;
  let target;
  let flagName = this.memory.flagName;
  // for now just transfer to upgraders
  let transferer = this.memory.transferer;

  // An upgrader flag means that we want to deposit on upgraders
  if (transferer) {
    let creeps = Game.creeps;

    Object.keys(creeps).every(key => {
      let upgraderRole = creeps[key].memory.role === 'upgrader';
      let isAlmostEmpty = creeps[key].carry.energy < 40;
      if (upgraderRole && isAlmostEmpty) {
        target = creeps[key];
        return false;
      }
      return true;
    });
  } else {
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
  }

  if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    this.moveTo(target);
  }

  this.setAction('deposit');
}

export default depositEnergy;
