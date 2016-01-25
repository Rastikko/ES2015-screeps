import Spammer from 'spammer';
import harvester from 'harvester';
import builder from 'builder';
import guard from 'guard';
import thechoosenone from 'thechoosenone';

module.exports.loop = function () {

  let spammer = new Spammer('placeholder');

	for(var name in Game.creeps) {
		var creep = Game.creeps[name];

		if(creep.memory.role == 'harvester') {
			harvester(creep);
		}

    if (creep.memory.role === 'thechoosenone') {
      thechoosenone(creep);
    }

		if(creep.memory.role == 'builder') {
      if (spammer.isFinished) {
        builder(creep);
      }
		}

		if(creep.memory.role == 'guard') {
    	guard(creep);
    }
	}
}
