'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var developmentState = {
  harvester: [4, [WORK, WORK, MOVE, CARRY]],
  builder: [3, [WORK, MOVE, MOVE, CARRY, CARRY]],
  upgrader: [5, [WORK, MOVE, MOVE, MOVE, CARRY]],
  guard: [2, [ATTACK, ATTACK, TOUGH, MOVE, MOVE]]
};

var Spammer = function () {
  function Spammer(roomGame, state) {
    _classCallCheck(this, Spammer);

    this.roomGame = roomGame;

    this._calculateState(state);

    if (this.roomGame.getSpawnMemory('spammerFinished') === undefined) {
      this.roomGame.setSpawnMemory('spammerFinished', true);
    }
  }

  _createClass(Spammer, [{
    key: '_calculateState',
    value: function _calculateState(state) {
      var _this = this;

      // right now we are just assuming we are always in development state
      Object.keys(developmentState).forEach(function (key) {
        // if we already defined that we are not finished it means that we
        // attempted to create a creep before
        if (_this.roomGame.getSpawnMemory('spammerFinished') === false) {
          return;
        }
        var nKeyCreeps = _this.roomGame.countCreeps(key);
        if (nKeyCreeps < developmentState[key][0]) {
          _this.roomGame.createCreep(developmentState[key][1], {
            role: key
          });
          _this.roomGame.setSpawnMemory('spammerFinished', false);
        }
      });
    }
  }]);

  return Spammer;
}();

exports.default = Spammer;
module.exports = exports['default'];