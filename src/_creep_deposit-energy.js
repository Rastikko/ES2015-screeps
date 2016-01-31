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
    let extensions = this.room.find(FIND_MY_STRUCTURES, {
      filter: {
        structureType: STRUCTURE_EXTENSION
      }
    });

    if (extensions.length) {
      for (let i = 0; i < extensions.length; i++) {
        if (extensions[i].energy < extensions[i].energyCapacity) {
          target = extensions[i];
        }
      }
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
}

export default depositEnergy;
