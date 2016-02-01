import harvestEnergy from '_creep_harvest-energy';
import withdrawEnergy from '_creep_withdraw-energy';
import depositEnergy from '_creep_deposit-energy';

Creep.prototype.setAction = function(action) {
  if (this.memory.action !== action) {
    this.memory.action = action || 'error';
    this.say(action);
  }
  this.hasActed = true;
}

Creep.prototype.harvestEnergy = harvestEnergy;

Creep.prototype.depositEnergy = depositEnergy;

Creep.prototype.withdrawEnergy = withdrawEnergy;

Creep.prototype.upgrade = function() {
  if (this.hasActed) return;
  // If not enought resources just move
  if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE) {
    this.moveTo(this.room.controller);
  }
  this.setAction('upgrade');
}

Creep.prototype.buildConstruction = function() {
  if (this.hasActed) return;
  let targets = this.room.find(FIND_CONSTRUCTION_SITES);
  if (targets.length) {
    if (this.build(targets[0]) === ERR_NOT_IN_RANGE) {
      this.moveTo(targets[0]);
    }
    this.setAction('build');
  }
}

Creep.prototype.repairConstruction = function() {
  if (this.hasActed) return;
  let structuresNeedsRepair = this.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        let isHalfDamaged = structure.hits < structure.hitsMax / 2;
        let isNotALotOfWork = structure.hits < 300000;
        return isHalfDamaged && isNotALotOfWork;
      }
  });

  if(structuresNeedsRepair.length) {
    if(this.repair(structuresNeedsRepair[0]) === ERR_NOT_IN_RANGE) {
        this.moveTo(structuresNeedsRepair[0]);
    }
    this.setAction('repair');
  }
}

Creep.prototype.guard = function() {
  if (this.hasActed) return;
  let targets = this.room.find(FIND_HOSTILE_CREEPS);

  if(targets.length) {
    if(this.attack(targets[0]) == ERR_NOT_IN_RANGE) {
      this.moveTo(targets[0]);
    }
  } else {
    this.moveTo(Game.flags.Guard);
  }
  this.setAction('guarding');
}
