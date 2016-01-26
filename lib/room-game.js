"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoomGame = function () {
  function RoomGame(spawn) {
    _classCallCheck(this, RoomGame);

    this.spawn = spawn;
  }

  _createClass(RoomGame, [{
    key: "countCreeps",
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
    key: "isEnergyOver",
    value: function isEnergyOver(energy) {
      return Game.spawns[this.spawn].energy > energy;
    }
  }, {
    key: "createMinion",
    value: function createMinion(attributes, properties) {
      // TODO
    }
  }]);

  return RoomGame;
}();

exports.default = RoomGame;
module.exports = exports['default'];