class RoomGame
{
  constructor(spawn) {
    this.spawn = spawn;
    this.setSpawnMemory('spammerFinished', undefined);
  }

  setSpawnMemory(key, value) {
    Game.spawns[this.spawn].memory[key] = value;
  }

  getSpawnMemory(key) {
    return Game.spawns[this.spawn].memory[key];
  }

  countCreeps(role) {
    let n = 0;
    Object.keys(Game.creeps).forEach((creepKey) => {
      if (Game.creeps[creepKey].memory.role === role) {
        n++;
      }
    });
    return n;
  }

  createCreep(attributes, properties) {
    if (this._haveEnoughEnergy(attributes)) {
      Game.spawns[this.spawn].createCreep(attributes, null, properties);
      return true;
    }
    return false;
  }

  _haveEnoughEnergy(attributes) {
    let total = 0;

    // Let's save some CPU by saving the cost of the attributes
    let savedAttributeCost = this.getSpawnMemory(attributes.toString());
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
      this.setSpawnMemory(attributes.toString(), total);
    }
    if (Game.spawns[this.spawn].room.energyCapacityAvailable < total) {
      console.log('Your spawn does not have enough energy to build the parts');
      console.log('Total: ' + total);
      console.log(attributes);
    }

    return Game.spawns[this.spawn].room.energyCapacity >= total;
  }
}

export default RoomGame;
