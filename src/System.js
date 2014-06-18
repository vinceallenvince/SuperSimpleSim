/*global window, document, setTimeout, Burner, Modernizr */
/*jshint supernew:true */

var Item = require('./Item').Item,
    Vector = require('./Vector').Vector;

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/** @namespace */
var System = {
  name: 'System'
};

/**
 * Holds additional classes that can be defined at runtime.
 */
System.Classes = {};

/**
 * Holds a vector describing the system gravity.
 */
System.gravity = new Vector(0, 1);

/**
 * Holds a vector describing the system wind.
 */
System.wind = new Vector();

/**
 * Stores references to all items in the system.
 * @private
 */
System._records = [];

/**
 * Stores references to all items removed from the system.
 * @private
 */
System._pool = [];

/**
 * Call to execute any setup code before starting the animation loop.
 * @function setup
 * @memberof System
 */
System.setup = function(func) {
  func.call(this);
};

/**
 * Adds instances of class to _records and calls init on them.
 * @function add
 * @memberof System
 */
System.add = function(klass, opt_options) {

  var records = this._records,
      options = opt_options || {};

  if (System.Classes[klass]) {
    records.push(new System.Classes[klass](this));
  } else {
    records.push(new Item(this));
  }
  records[records.length - 1].init(options);
  return records[records.length - 1];
};

/**
 * Removes an item from the system.
 * @function remove
 * @memberof System
 * @param {Object} obj The item to remove.
 */
System.remove = function (obj) {

  var i, max, records = System._records;

  for (i = 0, max = records.length; i < max; i++) {
    if (records[i].id === obj.id) {
      records[i].el.style.visibility = 'hidden'; // hide item
      System._pool[System._pool.length] = records.splice(i, 1)[0]; // move record to pool array
      break;
    }
  }
};

/**
 * Iterates over records.
 * @function loop
 * @memberof System
 */
System.loop = function() {
  var i, records = System._records,
      len = System._records.length;
  for (i = len - 1; i >= 0; i -= 1) {
    records[i].step();
  }
  for (i = len - 1; i >= 0; i -= 1) {
    records[i].draw();
  }
  if (typeof window.requestAnimationFrame !== 'undefined') {
    window.requestAnimationFrame(System.loop);
  }
};

module.exports.System = System;
