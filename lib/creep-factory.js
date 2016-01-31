'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _creepFactoryState = require('creep-factory-state');

var _creepFactoryState2 = _interopRequireDefault(_creepFactoryState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function countCreeps(role, flagName) {
  var n = 0;
  for (var name in Game.creeps) {
    if (Game.creeps[name].memory.role === role) {
      var creepFlag = Game.creeps[name].memory.flag;
      if (flagName && creepFlag && creepFlag.name === flagName) {
        n++;
      } else if (!flagName) {
        n++;
      }
    }
  }
  return n;
}

var CreepFactory = function () {
  function CreepFactory() {
    _classCallCheck(this, CreepFactory);

    this.spawn = Game.spawns.Spawn1;
    if (!this.spawn) {
      return;
    }

    this.spawn.isFinished = undefined;
    this._spawnCreeps();

    if (this.spawn.isFinished === undefined) {
      this.spawn.isFinished = true;
    }

    if (countCreeps('depositer') === 0) {
      this.spawn.depositerAvailable = false;
    } else {
      this.spawn.depositerAvailable = true;
    }
  }

  _createClass(CreepFactory, [{
    key: '_spawnCreeps',
    value: function _spawnCreeps() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _creepFactoryState2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var buildStack = _step.value;

          if (this.spawn.isFinished === false) {
            return;
          }
          var nKeyCreeps = countCreeps(buildStack.memory.role, buildStack.memory.flagName);
          if (nKeyCreeps < buildStack.count) {
            this.spawn.addCreep(buildStack.parts, buildStack.memory);
            this.spawn.isFinished = false;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return CreepFactory;
}();

exports.default = CreepFactory;
module.exports = exports['default'];