const developmentState = {
  harvester: [3, [WORK, WORK, MOVE, CARRY]],
  builder: [4, [WORK, MOVE, MOVE, CARRY, CARRY]],
  upgrader: [4, [WORK, MOVE, MOVE, MOVE, CARRY]],
  guard: [2, [ATTACK, ATTACK, TOUGH, MOVE, MOVE]]
};

class Spammer {
  constructor(roomGame, state) {
    this.roomGame = roomGame;

    this._calculateState(state);

    if (this.roomGame.getSpawnMemory('spammerFinished') === undefined) {
      this.roomGame.setSpawnMemory('spammerFinished', true);
      // If we have extra energy to spare then create some more guards
      // if (isEnergyOver(280) && this.roomGame.countCreeps('guard') < 8) {
      //   createGuard();
      // }
    }
  }

  _calculateState(state) {
    // right now we are just assuming we are always in development state
    Object.keys(developmentState).forEach((key) => {
      // if we already defined that we are not finished it means that we
      // attempted to create a creep before
      if (this.roomGame.getSpawnMemory('spammerFinished') === false) {
        return;
      }
      let nKeyCreeps = this.roomGame.countCreeps(key);
      if (nKeyCreeps < developmentState[key][0]) {
        this.roomGame.createCreep(developmentState[key][1], {
          role: key
        });
        this.roomGame.setSpawnMemory('spammerFinished', false);
      }
    });
  }
}

export default Spammer;
