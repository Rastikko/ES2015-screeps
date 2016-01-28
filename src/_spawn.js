Spawn.prototype._haveEnoughEnergy = function(attributes) {
  let total = 0;

  // Let's save some CPU by saving the cost of the attributes
  let savedAttributeCost = this.memory[attributes.toString()];
  if (savedAttributeCost !== undefined) {
    total = savedAttributeCost;
  } else {
    for(let i = 0; i < attributes.length; i++) {
      switch (attributes[i]) {
        case 'move':
          total += 50;
          break;
        case 'work':
          total += 100;
          break;
        case 'carry':
          total += 50;
          break;
        case 'attack':
          total += 80;
          break;
        case 'ranged_attack':
          total += 150;
          break;
        case 'heal':
          total += 250;
          break;
        case 'tough':
          total += 10;
          break;
      }
    }
    this.memory[attributes.toString()] = total;
  }
  // Game.rooms.W18S23.energyCapacityAvailable
  if (this.room.energyCapacityAvailable < total) {
    console.log('Your spawn does not have enough energy to build the parts');
    console.log('Total: ' + total);
    console.log(attributes);
  }

  return this.room.energyAvailable >= total;
}

Spawn.prototype.addCreep = function(attributes, properties) {
  if (this._haveEnoughEnergy(attributes)) {
    return this.createCreep(attributes, null, properties);
  }
  return false;
}
