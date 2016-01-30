'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var withdrawEnergy = function withdrawEnergy(flag) {
  var _this = this;

  console.log("AAAAAAAAAAAAAAAAAAAAAAA");
  if (this.hasActed) return;

  var thisEmpty = this.carry.energy === 0;
  var spawnFinished = Game.spawns.Spawn1.memory['isFinished'];
  var transferEnergy = this.memory.transferEnergy;

  if ((thisEmpty || transferEnergy) && flag) {
    (function () {
      var creeps = Game.creeps;
      var creepStack = [];
      Object.keys(creeps, function (key) {
        if (creeps[key].memory.flag === flag) {
          console.log('same flag creep: ');
          console.log(creeps[key]);
          creepStack.push(creeps[key]);
        }
      });
      console.log(creepStack);

      for (var creep in creepStack) {
        var creepReserved = creep.isReserved;
        var creepIsHarvester = creep.memory.role === 'harvester';
        if (!creepReserved && creepIsHarvester) {
          if (_this.transfer(creep, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            _this.moveTo(creep);
          }
        }
      }

      // let creepStack = [];
      // grab harvesters with the flag
      // Object.keys(areaCreeps).forEach(keyY => {
      //   Object.keys(keyY).forEach(keyX => {
      //       console.log("CHECKING ", keyY, keyX);
      //       console.log(keyY);
      //       console.log(keyX);
      //       console.log(areaCreeps[keyY][keyX]);
      //       if (areaCreeps[keyY][keyX] !== undefined) {
      //         creepStack.push(areaCreeps[keyY][keyX]);
      //       }
      //   });
      // });

      // if (creepStack.length > 0) {
      //   console.log("CREEEPS");
      //   console.log(creepStack);
      //   console.log(creepStack)
      //   for (let creep in creepStack) {
      //     console.log(creep);
      //     let creepReserved = creep.isReserved;
      //     let creepIsHarvester = creep.memory.role === 'harvester'
      //     if (!creepReserved && creepIsHarvester) {
      //       if (this.transfer(creep, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      //         this.moveTo(creep);
      //       }
      //     }
      //   }
      // }
      _this.setAction('steal');
    })();
  }

  if ((thisEmpty || transferEnergy) && spawnFinished && !this.hasActed) {
    // If we pass a flag we should then mine the closest to the flag
    if (Game.spawns.Spawn1.transferEnergy(this) === ERR_NOT_IN_RANGE) {
      this.moveTo(Game.spawns.Spawn1);
    }
    this.setAction('withdraw');
  }

  if (this.carry.energy !== this.carryCapacity) {
    this.memory.transferEnergy = true;
  } else {
    this.memory.transferEnergy = false;
  }
};

exports.default = withdrawEnergy;
module.exports = exports['default'];