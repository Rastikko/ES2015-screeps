let withdrawEnergy = function(flag) {

  if (this.hasActed) return;

  let thisEmpty = this.carry.energy === 0;
  let spawnFinished = Game.spawns.Spawn1.memory['isFinished'];
  let spawnWithEnergy = Game.spawns.Spawn1.energy !== 0;
  let transferEnergy = this.memory.transferEnergy;

  if ((thisEmpty || transferEnergy) && flag) {
    let creeps = Game.creeps;
    let thechoosenone;

    Object.keys(creeps).every(key => {
      let sameFlag = (creeps[key].memory.flag) && (creeps[key].memory.flag.name === flag.name);
      let harvesterRole = creeps[key].memory.role === 'harvester';
      let isNotReserved = !creeps[key].isReserved;
      let isEmpty = !creeps[key].carry.energy === 0;
      if (sameFlag && harvesterRole && isNotReserved && !isEmpty) {
        thechoosenone = creeps[key];
        return false;
      }
      return true;
    });

    if (thechoosenone !== undefined) {
      if (thechoosenone.transfer(this, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(thechoosenone);
        this.setAction('m->steal');
      } else {
        thechoosenone.isReserved = true;
        this.setAction('steal');
      }

      if (this.carry.energy !== this.carryCapacity) {
        this.memory.transferEnergy = true;
      } else {
        this.memory.transferEnergy = false;
      }
    }
  }

  if ((thisEmpty || transferEnergy) && spawnFinished && !flag && spawnWithEnergy) {
    // If we pass a flag we should then mine the closest to the flag
    if (Game.spawns.Spawn1.transferEnergy(this) === ERR_NOT_IN_RANGE) {
      this.moveTo(Game.spawns.Spawn1);
    }
    this.setAction('withdraw');
    if (this.carry.energy !== this.carryCapacity) {
      this.memory.transferEnergy = true;
    } else {
      this.memory.transferEnergy = false;
    }
  }

  if(!spawnFinished && !this.hasActed && !flag) {
    this.moveTo(Game.flags.Away);
  }
}

export default withdrawEnergy;
