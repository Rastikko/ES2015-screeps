"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function countCreeps() {
  var n = 0;
  Object.keys(Game.creeps).forEach(function () {
    n++;
  });
  return n;
}

function createHarvester() {}

function createBuilder() {}

var developmentState = [createHarvester, createHarvester, createBuilder];

var Spammer = function Spammer(state) {
  _classCallCheck(this, Spammer);

  console.log(countCreeps());
};

exports.default = Spammer;
module.exports = exports['default'];