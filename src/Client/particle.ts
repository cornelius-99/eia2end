namespace Firework {
  export class Particle {
    public alpha: number = 1;
    private pos: Vector;
    private radius: number;
    private color: string;
    private velocity: Vector;
    private gravity: number;
    private friction: number;
    private alphaReduction: number;

    constructor(pos: Vector, radius: number, color: string, velocity: Vector, gravity: number, friction: number, alphaReduction: number) {
      this.pos = pos;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
      this.gravity = gravity;
      this.friction = friction;
      this.alphaReduction = alphaReduction;
    }

    public draw(): void {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }

    public update(): void {
      this.draw();
      this.velocity.x *= this.friction;
      this.velocity.y *= this.friction;
      this.velocity.y += this.gravity;
      this.pos.x += this.velocity.x;
      this.pos.y += this.velocity.y;
      this.alpha -= this.alphaReduction;
    }

  }
}