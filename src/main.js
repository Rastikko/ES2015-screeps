import '_creep';
import '_spawn';
import '_room';
import CreepFactory from 'creep-factory';

module.exports.loop = function () {

  let spammer = new CreepFactory();

	for(let name in Game.creeps) {
		let creep = Game.creeps[name];

		if(creep.memory.role == 'harvester') {
      creep.harvestEnergy();
      // optimization for the firsts spawns
      if (!Game.spawns.Spawn1.depositerAvailable) {
        creep.depositEnergy();
      }
		}

    if(creep.memory.role == 'depositer') {
      creep.withdrawEnergy();
      if (creep.memory.transferer) {
        creep.depositFlag();
      }
      creep.depositEnergy();
    }

    if (creep.memory.role === 'upgrader') {
      creep.upgrade();
    }

		if(creep.memory.role == 'builder') {
      creep.withdrawEnergy();
      creep.buildConstruction();
      creep.repairConstruction();
		}

    if(creep.memory.role == 'repairer') {
      creep.withdrawEnergy();
      creep.repairConstruction();
      creep.buildConstruction();
		}

		if(creep.memory.role == 'guard') {
      creep.guard();
    }
	}

  // TODO: if nobody have reserved the energy then spam guards

}
