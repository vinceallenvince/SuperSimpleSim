/*global window, document, setTimeout, Burner, Modernizr */
/*jshint supernew:true */
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
System.gravity = {};

/**
 * Holds a vector describing the system wind.
 */
System.wind = {};

/**
 * Holds a transform property based on supportedFeatures.
 * @private
 */
System._stylePosition =
		'transform: translate3d(<x>px, <y>px, 0) rotate(<angle>deg) scale(<scale>, <scale>); ' +
    '-webkit-transform: translate3d(<x>px, <y>px, 0) rotate(<angle>deg) scale(<scale>, <scale>); ' +
    '-moz-transform: translate3d(<x>px, <y>px, 0) rotate(<angle>deg) scale(<scale>, <scale>); ' +
    '-o-transform: translate3d(<x>px, <y>px, 0) rotate(<angle>deg) scale(<scale>, <scale>); ' +
    '-ms-transform: translate3d(<x>px, <y>px, 0) rotate(<angle>deg) scale(<scale>, <scale>);';

/**
 * Stores references to all items in the system.
 * @private
 */
System._records = [];

/**
 * Call to execute any setup code before starting the animation loop.
 * @function setup
 * @memberof System
 */
System.setup = function(func) {
  this.gravity = new exports.Vector(0, 1);
  this.wind = new exports.Vector(0, 0);
  func.call(this);
};

/**
 * Adds instances of class to _records and calls init on them.
 * @function add
 * @memberof System
 */
System.add = function(klass, options) {
  var records = this._records;
  if (SuperSimpleSim[klass]) {
    records.push(new SuperSimpleSim[klass]());
  } else if (SuperSimpleSim.System.Classes[klass]) {
    records.push(new SuperSimpleSim.System.Classes[klass](options));
  } else {
    records.push(new exports.Item());
  }
  records[records.length - 1].init(options);
};

/**
 * Iterates over records.
 * @function loop
 * @memberof System
 */
System.loop = function() {
	var i, records = System._records;
	var len = System._records.length;
  for (i = len - 1; i >= 0; i -= 1) {
    records[i].step();
  }
  for (i = len - 1; i >= 0; i -= 1) {
    records[i].draw();
  }
  window.requestAnimFrame(System.loop);
};

/**
 * Updates the corresponding DOM element's style property.
 *
 * @function map
 * @memberof System
 * @param {Object} obj An item.
 */
System._draw = function(obj) {

  var cssText = this.getCSSText({
    x: obj.location.x - (obj.width / 2),
    y: obj.location.y - (obj.height / 2),
    angle: obj.angle,
    scale: obj.scale || 1,
    width: obj.width,
    height: obj.height,
    color0: obj.color[0],
    color1: obj.color[1],
    color2: obj.color[2]
  });
  obj.el.style.cssText = cssText;
};

/**
 * Concatenates a new cssText string.
 *
 * @function getCSSText
 * @memberof System
 * @param {Object} props A map of object properties.
 * @returns {string} A string representing cssText.
 */
System.getCSSText = function(props) {
  return this._stylePosition.replace(/<x>/g, props.x).replace(/<y>/g, props.y).replace(/<angle>/g, props.angle).replace(/<scale>/g, props.scale) + 'width: ' + props.width + 'px; height: ' + props.height + 'px; background-color: rgb(' + props.color0 + ', ' + props.color1 + ', ' + props.color2 + ')';
};

/**
 * Extends the properties and methods of a superClass onto a subClass.
 *
 * @function extend
 * @memberof System
 * @param {Object} subClass The subClass.
 * @param {Object} superClass The superClass.
 */
System.extend = function(subClass, superClass) {
  function F() {}
  F.prototype = superClass.prototype;
  subClass.prototype = new F;
  subClass.prototype.constructor = subClass;
};

/**
 * Generates a psuedo-random number within a range.
 *
 * @function getRandomNumber
 * @memberof System
 * @param {number} low The low end of the range.
 * @param {number} high The high end of the range.
 * @param {boolean} [flt] Set to true to return a float.
 * @returns {number} A number.
 */
System.getRandomNumber = function(low, high, flt) {
  if (flt) {
    return Math.random()*(high-(low-1)) + low;
  }
  return Math.floor(Math.random()*(high-(low-1))) + low;
};

/**
 * Re-maps a number from one range to another.
 *
 * @function map
 * @memberof System
 * @param {number} value The value to be converted.
 * @param {number} min1 Lower bound of the value's current range.
 * @param {number} max1 Upper bound of the value's current range.
 * @param {number} min2 Lower bound of the value's target range.
 * @param {number} max2 Upper bound of the value's target range.
 * @returns {number} A number.
 */
System.map = function(value, min1, max1, min2, max2) { // returns a new value relative to a new range
  var unitratio = (value - min1) / (max1 - min1);
  return (unitratio * (max2 - min2)) + min2;
};

