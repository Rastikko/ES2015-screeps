class RoomGame
{
  constructor(spawn) {
    this.spawn = spawn;
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

  isEnergyOver(energy) {
    return Game.spawns[this.spawn].energy > energy;
  }

  createMinion(attributes, properties) {
    // TODO
  }
}

export default RoomGame;
