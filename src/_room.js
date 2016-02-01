Room.prototype.getExtension = function(fullEnergyCapacity) {
  let extensions = this.find(FIND_MY_STRUCTURES, {
    filter: {
      structureType: STRUCTURE_EXTENSION
    }
  });

  if (extensions.length) {
    for (let i = 0; i < extensions.length; i++) {
      if (fullEnergyCapacity) {
        if (extensions[i].energy === extensions[i].energyCapacity) {
          return extensions[i];
        }
      }
      if (extensions[i].energy < extensions[i].energyCapacity) {
        return extensions[i];
      }
    }
  }
  return false;
}
