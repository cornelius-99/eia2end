"use strict";
var Firework;
(function (Firework) {
    class FireworkRocket {
        constructor(pos, config) {
            this.particles = [];
            this.pos = pos;
            this.config = config;
            const angleIncrement = Math.PI * 2 / this.config.particleNumber;
            for (let i = 0; i < this.config.particleNumber; i++) {
                const color = `hsl(${this.config.hues[Firework.randomNumberFromRange(0, this.config.hues.length)]},${this.config.saturation}%,${this.config.brightness}%`;
                const velocity = {
                    x: Math.cos(angleIncrement * i) * Math.random() * this.config.particleSpeed,
                    y: Math.sin(angleIncrement * i) * Math.random() * this.config.particleSpeed
                };
                const pos = new Firework.Vector(this.pos.x, this.pos.y);
                this.particles.push(new Firework.Particle(pos, this.config.particleRadius, color, velocity, this.config.gravity, this.config.friction, this.config.particleAlphaReduction));
            }
        }
        draw() {
            this.particles.forEach(particle => particle.draw());
        }
        update() {
            this.particles.forEach(particle => particle.update());
        }
        isBurnedOut() {
            return this.particles[0].alpha < 0;
        }
    }
    Firework.FireworkRocket = FireworkRocket;
})(Firework || (Firework = {}));
//# sourceMappingURL=fireworkRocket.js.map