function plusOrMinus() {
	return Math.random() < 0.5 ? -1 : 1;
}

// Vectors

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function getAngle(from, to) {
	return Math.atan2(from.y - to.y, from.x - to.x);
}

function getDirectionVector(angle) {
	return {
		x: Math.cos(angle),
		y: Math.sin(angle)
	};
}

function getVectorTowards(from, to) {
	var angle = getAngle(from, to);
	return getDirectionVector(angle - Math.PI);
}

// Particle

var Particle = function () {
	function Particle(context, x, y) {
		var color = arguments.length <= 3 || arguments[3] === undefined ? '#000' : arguments[3];
		var diameter = arguments.length <= 4 || arguments[4] === undefined ? Math.random() * 2 + 0.5 : arguments[4];
		var direction = arguments.length <= 5 || arguments[5] === undefined ? Math.random() * Math.PI : arguments[5];
		var damping = arguments.length <= 6 || arguments[6] === undefined ? 0.85 : arguments[6];
		var steeringRandomness = arguments.length <= 7 || arguments[7] === undefined ? 0.25 : arguments[7];
		var steeringForceRest = arguments.length <= 8 || arguments[8] === undefined ? 0.1 : arguments[8];
		var steeringForceTarget = arguments.length <= 9 || arguments[9] === undefined ? 0.5 : arguments[9];
		var boundaryForce = arguments.length <= 10 || arguments[10] === undefined ? 0.2 : arguments[10];
		var movementRadius = arguments.length <= 11 || arguments[11] === undefined ? Math.random() * 50 + 10 : arguments[11];

		this.position = {
			current: {
				x: x,
				y: y
			},
			home: {
				x: x,
				y: y
			}
		};

		this.velocity = {
			x: 0,
			y: 0
		};

		this.direction = direction;

		this.settings = {
			boundaryForce: boundaryForce,
			color: color,
			context: context,
			diameter: diameter,
			damping: damping,
			movementRadius: movementRadius,
			steeringForceRest: steeringForceRest,
			steeringForceTarget: steeringForceTarget,
			steeringRandomness: steeringRandomness
		};
	}

	Particle.prototype.move = function move() {
		var _settings = this.settings;
		var steeringForceTarget = _settings.steeringForceTarget;
		var steeringForceRest = _settings.steeringForceRest;
		var movementRadius = _settings.movementRadius;
		var boundaryForce = _settings.boundaryForce;
		var damping = _settings.damping;
		var _position = this.position;
		var current = _position.current;
		var home = _position.home;
		var velocity = this.velocity;

		// Add velocity in the current direction.

		var steeringVector = getDirectionVector(this.direction);
		var steeringForce = this.hasTarget ? steeringForceTarget : steeringForceRest;
		velocity.x += steeringVector.x * steeringForce;
		velocity.y += steeringVector.y * steeringForce;

		// Randomly steer the direction around
		this.setDirection();

		// Get distance from home coordinates
		var dist = distance(current.x, current.y, home.x, home.y);

		// Apply a force shoving each particle back toward the "home" position modulated by the distance from that home point compared to the `movementRadius` threshold.
		if (dist > 0) {
			var steerToHome = getVectorTowards(current, home);

			dist = Math.min(movementRadius, dist);
			dist = dist / movementRadius;

			velocity.x += steerToHome.x * dist * boundaryForce;
			velocity.y += steerToHome.y * dist * boundaryForce;
		}

		velocity.x *= damping;
		velocity.y *= damping;

		current.x += velocity.x;
		current.y += velocity.y;
	};

	Particle.prototype.draw = function draw() {
		var _settings2 = this.settings;
		var diameter = _settings2.diameter;
		var context = _settings2.context;
		var color = _settings2.color;
		var current = this.position.current;

		var radius = diameter / 2;

		context.fillStyle = color;
		context.beginPath();
		context.arc(current.x, current.y, radius, 0, Math.PI * 2, false);
		context.closePath();
		context.fill();
	};

	Particle.prototype.setDirection = function setDirection(target) {
		var steeringRandomness = this.settings.steeringRandomness;

		if (target) {
			var current = this.position.current;

			this.hasTarget = true;
			this.direction = getAngle(target, current);
		} else {
			this.hasTarget = false;
			this.direction += (Math.random() * 2 - 1) * steeringRandomness;
		}
	};

	return Particle;
}();

// Canvas

var Canvas = function () {
	function Canvas(element) {
		var particleSpacing = arguments.length <= 1 || arguments[1] === undefined ? 50 : arguments[1];
		var fps = arguments.length <= 2 || arguments[2] === undefined ? 1000 / 100 : arguments[2];

		this.canvas = element;
		this.context = element.getContext('2d');

		this.particleSpacing = particleSpacing;
		this.fps = fps;

		this.init();
	}

	Canvas.prototype.init = function init() {
		this.stop();
		this.clear();

		this.resize();

		this.createParticles();
		this.animate();

		this.bind();
	};

	Canvas.prototype.bind = function bind() {
		var _this = this;

		var canvas = this.canvas;
		var particles = this.particles;

		function setCoordinates(x, y) {
			particles.forEach(function (particle) {
				return particle.setDirection({
					x: x,
					y: y
				});
			});
		}

		window.addEventListener('resize', function () {
			return _this.init();
		});

		canvas.addEventListener('mousemove', function (event) {
			event.preventDefault();
			setCoordinates(event.clientX, event.clientY);
		});

		canvas.addEventListener('touchstart', function (event) {
			event.preventDefault();
			setCoordinates(event.touches[0].clientX, event.touches[0].clientY);
		});

		canvas.addEventListener('touchmove', function (event) {
			event.preventDefault();
			setCoordinates(event.touches[0].clientX, event.touches[0].clientY);
		});
	};

	Canvas.prototype.resize = function resize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = 300;
	};

	Canvas.prototype.clear = function clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	Canvas.prototype.createParticles = function createParticles() {
		var _canvas = this.canvas;
		var width = _canvas.width;
		var height = _canvas.height;
		var particleSpacing = this.particleSpacing;

		var cols = Math.floor(width / particleSpacing),
		    rows = Math.floor(height / particleSpacing),
		    colGutter = (particleSpacing + (width - cols * particleSpacing)) / 2,
		    rowGutter = (particleSpacing + (height - rows * particleSpacing)) / 2;

		this.particles = [];
		for (var col = 0; col < cols; col++) {
			for (var row = 0; row < rows; row++) {
				var x = col * particleSpacing + colGutter + particleSpacing * Math.random() * plusOrMinus(),
				    y = row * particleSpacing + rowGutter + particleSpacing * Math.random() * plusOrMinus(),
				    color = 'rgba(0, 0, 0, 0.6)',
				    particle = new Particle(this.context, x, y, color);
				this.particles.push(particle);
			}
		}
	};

	Canvas.prototype.draw = function draw() {
		this.clear();
		if (this.particles) {
			for (var i = 0; i < this.particles.length; i++) {
				var particle = this.particles[i];
				particle.move();
				particle.draw();
			}
		}
	};

	Canvas.prototype.animate = function animate() {
		var _this2 = this;

		var now = Date.now();
		if (this.lastFrameDate === undefined || now - this.lastFrameDate > this.fps) {
			this.lastFrameDate = now;

			this.draw();
		}

		this.animationFrame = window.requestAnimationFrame(function () {
			return _this2.animate();
		});
	};

	Canvas.prototype.stop = function stop() {
		window.cancelAnimationFrame(this.animationFrame);
	};

	return Canvas;
}();

// Init

new Canvas(document.getElementById('canvas'));