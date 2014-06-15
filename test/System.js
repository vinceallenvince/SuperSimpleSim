var test = require('tape'),
    Item = require('../src/Item').Item,
    Vector = require('../src/Vector').Vector,
    System, obj;

test('load System.', function(t) {
  System = require('../src/System').System;
  t.ok(System, 'object loaded');
  t.end();
});

test('check static properties.', function(t) {
  t.equal(typeof System.Classes, 'object', 'has a Classes object.');
  t.equal(System.gravity.x, 0, 'has a gravity Vector; default x = 0.');
  t.equal(System.gravity.y, 1, 'has a gravity Vector; default y = 1.');
  t.equal(System.wind.x, 0, 'has a wind Vector; default x = 0.');
  t.equal(System.wind.y, 0, 'has a wind Vector; default y = 0.');
  t.assert(typeof System._records === 'object' && System._records.length === 0, 'has an empty _records array.');
  t.end();
});

test('setup() should execute a callback.', function(t) {
  var val;
  System.setup(function() {val = this._records.length;});
  t.equal(val, 0);
  t.end();
});

test('add() should add create a new item and add it to _records.', function(t) {
  System.add();
  t.equal(System._records.length, 1, 'should add a new item to _records');
  function Box() {}
  Box.prototype.init = function() {};
  System.Classes.Box = Box;
  System.add('Box');
  t.equal(System._records.length, 2, 'should add an instance of a custom class to _records');
  t.end();
});

test('add() should add create a new item and add it to _records.', function(t) {
  System._records = [];
  System.add();
  System._records[System._records.length - 1].init();
  System.loop();
  t.equal(System._records.length, 1, 'should add an instance of a custom class to _records');
  System.loop();
  t.end();
});
