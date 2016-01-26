import RoomGame from 'room-game';
import Spammer from 'spammer';
import harvester from 'harvester';
import builder from 'builder';
import guard from 'guard';
import upgrader from 'upgrader';

module.exports.loop = function () {

  let roomGame = new RoomGame('Spawn1');
  let spammer = new Spammer(roomGame, 'placeholder');

	for(var name in Game.creeps) {
		var creep = Game.creeps[name];

		if(creep.memory.role == 'harvester') {
			harvester(creep);
		}

    if (creep.memory.role === 'upgrader') {
      upgrader(creep);
    }

		if(creep.memory.role == 'builder') {
      builder(creep, spammer.isFinished);
		}

		if(creep.memory.role == 'guard') {
    	guard(creep);
    }
	}
}
