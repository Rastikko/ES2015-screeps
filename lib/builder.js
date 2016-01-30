'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function builder(creep) {
    var creepEmpty = creep.carry.energy === 0;
    var spawnFinished = Game.spawns.Spawn1.memory['isFinished'];
    var transferEnergy = creep.memory.transferEnergy;

    if ((creepEmpty || transferEnergy) && spawnFinished) {
        if (Game.spawns.Spawn1.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns.Spawn1);
        }
        if (creep.carry.energy !== creep.carryCapacity) {
            creep.memory.transferEnergy = true;
        } else {
            creep.memory.transferEnergy = false;
        }
        creep.setAction('b:withdraw');
    } else {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
            creep.setAction('build');
        }

        if (!targets.length) {
            var structuresNeedsRepair = creep.room.find(FIND_STRUCTURES, {
                filter: function filter(structure) {
                    return structure.hits < structure.hitsMax / 2;
                }
            });

            if (structuresNeedsRepair.length) {
                if (creep.repair(structuresNeedsRepair) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structuresNeedsRepair);
                }
                creep.setAction('repair');
            }
        }
    }
}

exports.default = builder;
module.exports = exports['default'];