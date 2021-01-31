namespace Firework {

  //Klasse zum Darstellen eines Partikels
  export class Particle {
    //alle notwendigen Parameter definieren
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

    //Zeichnet den Partikel
    public draw(): void {
      //Speichern der Aktuellen Canvas Eintellungen
      ctx.save();

      //Alpha mit dem gezeichnet wird konfigurieren
      ctx.globalAlpha = this.alpha;

      //Kreis Zeichnen
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
      //Farbe mit der gezeichnet wird updaten
      ctx.fillStyle = this.color;

      //Kreis ausfüllen
      ctx.fill();
      ctx.closePath();

      //Status wiederherstellen (globalAlpha wird wieder zurückgesetzt)
      ctx.restore();
    }

    //Update funktion Zeichnet ein Partikel und updated die Parameter
    public update(): void {
      //Zeichnet den Partikel
      this.draw();

      //x und y velocity mit friction(Reibung) multiplizieren (verlangsamt x und y geschwindigkeit über Zeit)
      this.velocity.x *= this.friction;
      this.velocity.y *= this.friction;

      //Gravity auf velocity y dazuaddieren, Damit der Partikel immer schneller zu boden sinkt
      this.velocity.y += this.gravity;

      //velocity auf position dazuaddieren
      this.pos.x += this.velocity.x;
      this.pos.y += this.velocity.y;

      //Alpha des Partikels verringern, damit der Partikel an Helligkeit über Zeit verliert
      this.alpha -= this.alphaReduction;
    }

  }
}
