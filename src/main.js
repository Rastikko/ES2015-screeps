import harvester from 'harvester';
import builder from 'builder';
import guard from 'guard';
import spammer from 'spammer';

module.exports.loop = function () {

  spammer();

	for(var name in Game.creeps) {
		var creep = Game.creeps[name];

		if(creep.memory.role == 'harvester') {
			harvester(creep);
		}

		if(creep.memory.role == 'builder') {
		  builder(creep);
		}
		if(creep.memory.role == 'guard') {
    	guard(creep);
    }
	}
}
