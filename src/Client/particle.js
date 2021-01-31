"use strict";
var Firework;
(function (Firework) {
    class Particle {
        constructor(pos, radius, color, velocity, gravity, friction, alphaReduction) {
            this.alpha = 1;
            this.pos = pos;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
            this.gravity = gravity;
            this.friction = friction;
            this.alphaReduction = alphaReduction;
        }
        draw() {
            Firework.ctx.save();
            Firework.ctx.globalAlpha = this.alpha;
            Firework.ctx.beginPath();
            Firework.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
            Firework.ctx.fillStyle = this.color;
            Firework.ctx.fill();
            Firework.ctx.closePath();
            Firework.ctx.restore();
        }
        update() {
            this.draw();
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.velocity.y += this.gravity;
            this.pos.x += this.velocity.x;
            this.pos.y += this.velocity.y;
            this.alpha -= this.alphaReduction;
        }
    }
    Firework.Particle = Particle;
})(Firework || (Firework = {}));
//# sourceMappingURL=particle.js.map