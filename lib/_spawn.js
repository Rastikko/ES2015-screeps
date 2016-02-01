"use strict";

Spawn.prototype._getPartCost = function (part) {
  switch (part) {
    case MOVE:
      return 50;
      break;
    case WORK:
      return 100;
      break;
    case CARRY:
      return 50;
      break;
    case ATTACK:
      return 80;
      break;
    case RANGED_ATTACK:
      return 150;
      break;
    case HEAL:
      return 250;
      break;
    case TOUGH:
      return 10;
      break;
  }
  throw Error('No part specified');
};

Spawn.prototype._calculateParts = function (parts, maxCost) {
  console.log(parts.toString() + maxCost.toString());
  var calculatedParts = this.memory[parts.toString() + maxCost.toString()];
  if (calculatedParts) {
    console.log("Returning from memory calculateParts " + calculatedParts);
    return calculatedParts;
  }

  var i = 0;
  var totalCost = 0;
  var finalParts = [];
  while (totalCost < maxCost) {
    finalParts.push(parts[i % parts.length]);
    i++;
    totalCost += this._getPartCost(parts[i % parts.length]);
  }
  this.memory[parts.toString() + maxCost] = finalParts;
  return finalParts;
};

Spawn.prototype.addCreep = function (attributes, memory) {
  var creepCount = Object.keys(Game.creeps).length;
  // We will expend more and more energy if we have tons of creeps
  var capacityAvailable = this.room.energyCapacityAvailable * (creepCount / this.totalCreeps);
  capacityAvailable = Math.floor(capacityAvailable);
  capacityAvailable = Math.max(capacityAvailable, 300);
  // If we have plenty creeps then lest use all our energy available
  console.log("CrepCount: " + creepCount);
  console.log("totalCreep: " + this.totalCreeps);
  console.log('energyCapacityAvailable ' + this.room.energyCapacityAvailable);

  var parts = this._calculateParts(attributes, capacityAvailable);
  return this.createCreep(parts, null, memory);
};