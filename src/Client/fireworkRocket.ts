namespace Firework {
  export class FireworkRocket {
    private pos: Vector;
    private config: FireworkConfig;
    private particles: Particle[] = [];

    constructor(pos: Vector, config: FireworkConfig) {
      this.pos = pos;
      this.config = config;
      const angleIncrement: number = Math.PI * 2 / this.config.particleNumber;
      for (let i: number = 0; i < this.config.particleNumber; i++) {
        const color: string = `hsl(${this.config.hues[randomNumberFromRange(0, this.config.hues.length)]},${this.config.saturation}%,${this.config.brightness}%`;
        const velocity: Vector = {
          x: Math.cos(angleIncrement * i) * Math.random() * this.config.particleSpeed,
          y: Math.sin(angleIncrement * i) * Math.random() * this.config.particleSpeed
        };
        const pos: Vector = new Vector(this.pos.x, this.pos.y);
        this.particles.push(new Particle(pos, this.config.particleRadius, color, velocity, this.config.gravity, this.config.friction, this.config.particleAlphaReduction));
      }
    }

    public draw(): void {
      this.particles.forEach(particle => particle.draw());
    }

    public update(): void {
      this.particles.forEach(particle => particle.update());

    }

    public isBurnedOut(): boolean {
      return this.particles[0].alpha < 0;
    }
  }
}