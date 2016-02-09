let depositFlag = function() {
  if (this.hasActed) return;
  let target;
  let flagName = this.memory.flagName;

  // for now just transfer to upgraders
  let closestCreep = Game.flags[flagName].pos.findClosestByRange(FIND_MY_CREEPS, {
    filter: (creep) => {
      let upgraderRole = creep.memory.role === 'upgrader';
      let isAlmostEmpty = creep.carry.energy < 40;
      if (upgraderRole && isAlmostEmpty) {
        return true;
      }
    }
  });

  let result = this.transfer(closestCreep, RESOURCE_ENERGY);

  if (result === ERR_NOT_IN_RANGE) {
    this.moveTo(closestCreep);
  }

  this.setAction('deposit');
}

export default depositFlag;
