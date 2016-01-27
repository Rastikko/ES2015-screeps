import RoomGame from 'room-game';
import Spammer from 'spammer';
import harvester from 'harvester';
import builder from 'builder';
import guard from 'guard';
import upgrader from 'upgrader';

module.exports.loop = function () {

  let roomGame = new RoomGame('Spawn1');
  let spammer = new Spammer(roomGame, 'placeholder');

	for(let name in Game.creeps) {
		let creep = Game.creeps[name];

    // TODO: create grab max capacity mixin

		if(creep.memory.role == 'harvester') {
			harvester(creep);
		}

    if (creep.memory.role === 'upgrader') {
      upgrader(roomGame, creep);
    }

		if(creep.memory.role == 'builder') {
      builder(roomGame, creep);
		}

		if(creep.memory.role == 'guard') {
    	guard(creep);
    }
	}
}
