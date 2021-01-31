"use strict";
var Firework;
(function (Firework) {
    //Klasse welche alle Partikel zu einem Feuerwerk generiert, speichert und aktualisiert
    class FireworkRocket {
        constructor(pos, config) {
            //Array für alle generierten Partikel
            this.particles = [];
            this.pos = pos;
            this.config = config;
            //Berechnen wie groß der Winkel zwischen 2 Partikeln ist, damit alle partikel gleichmäßig verteilt werden
            const angleIncrement = Math.PI * 2 / this.config.particleNumber;
            //für die konfigurierte Anzahl an Partikel, Partikel generieren
            for (let i = 0; i < this.config.particleNumber; i++) {
                //zufällige Farbe bestimmen, welche der Partikel bekommen soll, mit der konfigurierten Sättigung und Helligkeit
                const color = `hsl(${this.config.hues[Firework.randomNumberFromRange(0, this.config.hues.length)]},${this.config.saturation}%,${this.config.brightness}%`;
                //Bewegung des Partikels in x und y berechnen
                const velocity = {
                    //cos für die Bewegung in x Richtung (* zufällige Zahl zwischen 0 und 1 * particleSpeed, damit nicht jeder Partikel gleich weit fliegt)
                    x: Math.cos(angleIncrement * i) * Math.random() * this.config.particleSpeed,
                    //gleiches für die y koordinate
                    y: Math.sin(angleIncrement * i) * Math.random() * this.config.particleSpeed
                };
                //Eigene Position für den Partikel erstellen, damit nicht alle Partikel die gleiche Position haben
                const pos = new Firework.Vector(this.pos.x, this.pos.y);
                //Erstellen des neuen Partikels und hinzufügen zu dem Partikel Array
                this.particles.push(new Firework.Particle(pos, this.config.particleRadius, color, velocity, this.config.gravity, this.config.friction, this.config.particleAlphaReduction));
            }
        }
        //updated alle Partikel und stellt sie dar
        update() {
            //Ruft bei jedem Partikel die update methode auf
            this.particles.forEach(particle => particle.update());
        }
        //prüfen ob Feuerwerk ausgebrannt ist
        isBurnedOut() {
            //schauen ob der alphawert des ersten Partikels kleiner als 0 ist, falls ja > ausgebrannt
            return this.particles[0].alpha < 0;
        }
    }
    Firework.FireworkRocket = FireworkRocket;
})(Firework || (Firework = {}));
//# sourceMappingURL=fireworkRocket.js.map