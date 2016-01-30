let harvestEnergy = function(flag) {
  if (this.hasActed) return;

  if (this.carry.energy < this.carryCapacity) {
    let sources;
    if (flag) {
      sources = this.room.LookForAt('source', flag);
      console.log("Harvesting " + flag);
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
