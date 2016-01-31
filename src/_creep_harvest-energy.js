let harvestEnergy = function() {
  if (this.hasActed) return;

  if (this.carry.energy < this.carryCapacity) {
    let sources;
    let flag = Game.flags[this.memory.flagName];
    
    if (flag) {
      sources = this.room.lookForAt('source', flag.pos.x, flag.pos.y);
    }
    if (!sources) {
      sources = this.room.find(FIND_SOURCES);
    }
		if (this.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
			this.moveTo(sources[0]);
		}
    this.setAction('harvest');
	}

}

export default harvestEnergy;
