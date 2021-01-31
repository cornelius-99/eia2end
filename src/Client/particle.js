"use strict";
var Firework;
(function (Firework) {
    //Klasse zum Darstellen eines Partikels
    class Particle {
        constructor(pos, radius, color, velocity, gravity, friction, alphaReduction) {
            //alle notwendigen Parameter definieren
            this.alpha = 1;
            this.pos = pos;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
            this.gravity = gravity;
            this.friction = friction;
            this.alphaReduction = alphaReduction;
        }
        //Zeichnet den Partikel
        draw() {
            //Speichern der Aktuellen Canvas Eintellungen
            Firework.ctx.save();
            //Alpha mit dem gezeichnet wird konfigurieren
            Firework.ctx.globalAlpha = this.alpha;
            //Kreis Zeichnen
            Firework.ctx.beginPath();
            Firework.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
            //Farbe mit der gezeichnet wird updaten
            Firework.ctx.fillStyle = this.color;
            //Kreis ausfüllen
            Firework.ctx.fill();
            Firework.ctx.closePath();
            //Status wiederherstellen (globalAlpha wird wieder zurückgesetzt)
            Firework.ctx.restore();
        }
        //Update funktion Zeichnet ein Partikel und updated die Parameter
        update() {
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
    Firework.Particle = Particle;
})(Firework || (Firework = {}));
//# sourceMappingURL=particle.js.map