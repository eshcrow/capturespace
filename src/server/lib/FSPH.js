// Generated by CoffeeScript 1.10.0

/* Four-Sphere Library */
var FSPH;

FSPH = typeof exports !== "undefined" && exports !== null ? exports : function() {
  return this.FSPH = {};
};

FSPH.World = (function() {
  function World(detf1) {
    this.detf = detf1;
    this.actors = [];
    this.space = null;
  }

  World.prototype.add = function(o) {
    return this.actors.push(o);
  };

  World.prototype.remove = function(o) {
    if (this.actors.indexOf(o) >= 0) {
      return this.actors.splice(this.actors.indexOf(o), 1);
    } else {
      return console.error("Element not in array!");
    }
  };

  World.prototype.step = function() {
    return for (var i = 0; i < this.actors.length; i++) {
			var actor = this.actors[i];

			if (actor.FSPHShape != null) actor = FSPHShape;
			else throw new Error("Actor does not have a shape!");

			// Extrapolate
			actor.move()
			// Collide
			for (var j = 0; j < this.actors.length; j++) {
				var other = this.actors[j];

				if (other.FSPHShape != null) other = FSPHShape;
				else throw new Error("Actor does not have a shape!");

				if actor.collides(other, @detf)
					// When collision takes place

			}
		};
  };

  return World;

})();

FSPH.FSphere = (function() {
  function FSphere(mass, radius) {
    this.mass = mass;
    this.radius = radius;
    this.prevpos = [0, 0, 0];
    this.position = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.θ = 0;
    this.dθ = 0;
  }

  FSphere.prototype.move = function() {
    var i, j;
    for (i = j = 0; j <= 2; i = ++j) {
      this.prevpos[i] = this.position[i];
      this.position[i] += this.velocity[i];
    }
    this.θ += this.dθ;
  };

  FSphere.prototype.effectiveradius = function(diff, bound) {
    var factor;
    factor = Math.cos(diff);
    if (bound >= 1) {
      return 1;
    }
    if (factor > 1 || factor === 1) {
      factor = 1;
    } else if (factor < bound) {
      factor = 0;
    } else {
      factor = (factor - bound) * (1 - bound);
    }
    return this.radius * factor;
  };

  FSphere.prototype.collides = function(other, detf) {
    var i, j, δ, ρ;
    if (!(other instanceof FSPH.FSphere)) {
      return false;
    }
    δ = 0;
    for (i = j = 0; j <= 2; i = ++j) {
      δ += (this.position[i] - other.position[i]) * (this.position[i] - other.position[i]);
    }
    ρ = this.effectiveradius(this.θ - other.θ, detf(this)) + other.effectiveradius(this.θ - other.θ, detf(other));
    ρ *= ρ;
    if (δ <= ρ) {
      return true;
    } else {
      return false;
    }
  };

  return FSphere;

})();

FSPH.SShell = (function() {
  function SShell(radius) {
    this.radius = radius;
  }

  return SShell;

})();

FSPH.Test = function() {
  var s1, s2;
  s1 = new FSPH.FSphere(1, 1);
  s2 = new FSPH.FSphere(1, 1);
  s1.collides(s2);
  s1.position = [0.5, 0.5, 0.5];
  return s1.collides(s2);
};
