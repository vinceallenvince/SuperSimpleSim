/*global document */

/**
 * Creates a new Item.
 * @constructor
 */
function Item() {

  this.world = document.body;
  this.name = 'Item';
  this.id = this.name + Item._idCount;

  this.el = document.createElement('div');
  this.el.id = this.id;
  this.el.className = this.name.toLowerCase();
  this.world.appendChild(this.el);

  Item._idCount++;
}

Item._idCount = 0;

/**
 * Resets all properties.
 *
 * @param {Object} [opt_options=] A map of initial properties.
 * @param {number} [opt_options.width = 10] Width.
 * @param {number} [opt_options.height = 10] Height.
 * @param {number} [opt_options.scale = 1] Scale.
 * @param {number} [opt_options.angle = 0] Angle.
 * @param {Array} [opt_options.color = 0, 0, 0] Color.
 * @param {number} [opt_options.mass = 10] mass.
 * @param {Function|Object} [opt_options.acceleration = new Vector()] acceleration.
 * @param {Function|Object} [opt_options.velocity = new Vector()] velocity.
 * @param {Function|Object} [opt_options.location = new Vector()] location.
 * @param {number} [opt_options.maxSpeed = 10] maxSpeed.
 * @param {number} [opt_options.minSpeed = 0] minSpeed.
 */
Item.prototype.init = function(opt_options) {

  var i, options = opt_options || {};

  for (i in options) {
    if (options.hasOwnProperty(i)) {
      this[i] = options[i];
    }
  }

  this.width = typeof options.width === 'undefined' ? 10 : options.width;
  this.height = typeof options.height === 'undefined' ? 10 : options.height;
  this.scale = options.scale || 1;
  this.angle = options.angle || 0;
  this.color = options.color || [0, 0, 0];
  this.mass = typeof options.mass === 'undefined' ? 10 : options.mass;
  this.acceleration = options.acceleration || new exports.Vector();
  this.velocity = options.velocity || new exports.Vector();
  this.location = options.location || new exports.Vector(this.world.scrollWidth / 2,
      this.world.scrollHeight / 2);
  this.maxSpeed = typeof options.maxSpeed === 'undefined' ? 10 : options.maxSpeed;
  this.minSpeed = options.minSpeed || 0;
  this.bounciness = options.bounciness || 0.5;
  this._force = new exports.Vector();
  this.checkWorldEdges = typeof options.checkWorldEdges === 'undefined' ?
      true : options.checkWorldEdges;
};

/**
 * Applies forces to item.
 */
Item.prototype.step = function() {
  this.applyForce(exports.System.gravity);
  this.applyForce(exports.System.wind);
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed, this.minSpeed);
  this.location.add(this.velocity);
  if (this.checkWorldEdges) {
    this._checkWorldEdges();
  } else {
    this._wrapWorldEdges();
  }
  this.acceleration.mult(0);
};

/**
 * Adds a force to this object's acceleration.
 *
 * @param {Object} force A Vector representing a force to apply.
 * @returns {Object} A Vector representing a new acceleration.
 */
Item.prototype.applyForce = function(force) {
  // calculated via F = m * a
  if (force) {
    this._force.x = force.x;
    this._force.y = force.y;
    this._force.div(this.mass);
    this.acceleration.add(this._force);
    return this.acceleration;
  }
};

/**
 * Prevents object from moving beyond world bounds.
 *
 * @private
 */
Item.prototype._checkWorldEdges = function() {

  var x, y, worldRight = this.world.scrollWidth,
      worldBottom = this.world.scrollHeight,
      location = this.location,
      velocity = this.velocity,
      width = this.width,
      height = this.height,
      bounciness = this.bounciness;

  if (location.x + width / 2 > worldRight) {
    location.x = worldRight - width / 2;
    velocity.x *= -1 * bounciness;
  } else if (location.x < width / 2) {
    location.x = width / 2;
    velocity.x *= -1 * bounciness;
  }

  if (location.y + height / 2 > worldBottom) {
    location.y = worldBottom - height / 2;
    velocity.y *= -1 * bounciness;
  } else if (location.y < height / 2) {
    location.y = height / 2;
    velocity.y *= -1 * bounciness;
  }
};

/**
 * Prevents object from moving beyond world bounds.
 * @private
 */
Item.prototype._wrapWorldEdges = function() {

  var x, y, worldRight = this.world.scrollWidth,
      worldBottom = this.world.scrollHeight,
      location = this.location,
      width = this.width,
      height = this.height;

  if (location.x + width / 2 > worldRight) {
    location.x = width / 2;
  } else if (location.x < width / 2) {
    location.x = worldRight - width / 2;
  }

  if (location.y + height / 2 > worldBottom) {
    location.y = height / 2;
  } else if (location.y < height / 2) {
    location.y = scrollHeight - height / 2;
  }
};

/**
 * Updates the corresponding DOM element's style property.
 */
Item.prototype.draw = function() {
  exports.System._draw(this);
};

