'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoomGame = function () {
  function RoomGame(spawn) {
    _classCallCheck(this, RoomGame);

    this.spawn = spawn;
    this.setSpawnMemory('spammerFinished', undefined);
  }

  _createClass(RoomGame, [{
    key: 'setSpawnMemory',
    value: function setSpawnMemory(key, value) {
      Game.spawns[this.spawn].memory[key] = value;
    }
  }, {
    key: 'getSpawnMemory',
    value: function getSpawnMemory(key) {
      return Game.spawns[this.spawn].memory[key];
    }
  }, {
    key: 'countCreeps',
    value: function countCreeps(role) {
      var n = 0;
      Object.keys(Game.creeps).forEach(function (creepKey) {
        if (Game.creeps[creepKey].memory.role === role) {
          n++;
        }
      });
      return n;
    }
  }, {
    key: 'createCreep',
    value: function createCreep(attributes, properties) {
      if (this._haveEnoughEnergy(attributes)) {
        Game.spawns[this.spawn].createCreep(attributes, null, properties);
        return true;
      }
      return false;
    }
  }, {
    key: '_haveEnoughEnergy',
    value: function _haveEnoughEnergy(attributes) {
      var total = 0;

      // Let's save some CPU by saving the cost of the attributes
      var savedAttributeCost = this.getSpawnMemory(attributes.toString());
      if (savedAttributeCost !== undefined) {
        total = savedAttributeCost;
      } else {
        for (var i = 0; i < attributes.length; i++) {
          switch (attributes[i]) {
            case 'move':
              total += 50;
              break;
            case 'work':
              total += 100;
              break;
            case 'carry':
              total += 50;
              break;
            case 'attack':
              total += 80;
              break;
            case 'ranged_attack':
              total += 150;
              break;
            case 'heal':
              total += 250;
              break;
            case 'tough':
              total += 10;
              break;
          }
        }
        this.setSpawnMemory(attributes.toString(), total);
      }

      if (Game.spawns[this.spawn].energyCapacity < total) {
        console.log('Your spawn does not have enough energy to build the parts');
        console.log('Total: ' + total);
        console.log(attributes);
      }

      return Game.spawns[this.spawn].energy >= total;
    }
  }]);

  return RoomGame;
}();

exports.default = RoomGame;
module.exports = exports['default'];