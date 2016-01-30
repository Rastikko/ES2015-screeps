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
      creep.harvestEnergy(creep.memory.flag);
			creep.depositEnergy();
		}

    if (creep.memory.role === 'upgrader') {
      creep.withdrawEnergy();
      creep.upgrade();
    }

		if(creep.memory.role == 'builder') {
      creep.buildConstruction();
      creep.repairConstruction();
		}

		if(creep.memory.role == 'guard') {
      creep.guard();
    }
	}

  // TODO: if nobody have reserved the energy then spam guards
}
