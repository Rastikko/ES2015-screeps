'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function builder(roomGame, creep) {
    var creepEmpty = creep.carry.energy === 0;
    var spawnFinished = roomGame.getSpawnMemory('spammerFinished');
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
    } else {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }

        if (!targets.length) {
            var halfBroken = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: function filter(object) {
                    return object.hits / object.hitsMax < 0.5;
                }
            });
            if (halfBroken) {
                if (creep.repair(wall) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(wall);
                }
            }
        }
    }
}

exports.default = builder;
module.exports = exports['default'];