import '_creep';
import '_spawn';
import CreepFactory from 'creep-factory';
import harvester from 'harvester';
import builder from 'builder';
import guard from 'guard';
import upgrader from 'upgrader';

module.exports.loop = function () {

  let spammer = new CreepFactory('placeholder_state');

	for(let name in Game.creeps) {
		let creep = Game.creeps[name];

		if(creep.memory.role == 'harvester') {
      creep.harvestEnergy();
			creep.depositEnergy();
		}

    if (creep.memory.role === 'upgrader') {
      creep.withdrawEnergy();
      creep.upgrade();
    }

		if(creep.memory.role == 'builder') {
      builder(creep);
		}

		if(creep.memory.role == 'guard') {
    	guard(creep);
    }
	}

  // TODO: if nobody have reserved the energy then spam guards
}
