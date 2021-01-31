namespace Firework {
  //Klasse welche alle Partikel zu einem Feuerwerk generiert, speichert und aktualisiert
  export class FireworkRocket {
    //Ursprungsposition des Feuerwerks (Mausklick Position)
    private pos: Vector;

    //Die Konfiguration mit welcher das Feuerwerk ausgelöst wurde
    private config: FireworkConfig;

    //Array für alle generierten Partikel
    private particles: Particle[] = [];

    constructor(pos: Vector, config: FireworkConfig) {
      this.pos = pos;
      this.config = config;

      //Berechnen wie groß der Winkel zwischen 2 Partikeln ist, damit alle partikel gleichmäßig verteilt werden
      const angleIncrement: number = Math.PI * 2 / this.config.particleNumber;

      //für die konfigurierte Anzahl an Partikel, Partikel generieren
      for (let i: number = 0; i < this.config.particleNumber; i++) {
        //zufällige Farbe bestimmen, welche der Partikel bekommen soll, mit der konfigurierten Sättigung und Helligkeit
        const color: string = `hsl(${this.config.hues[randomNumberFromRange(0, this.config.hues.length)]},${this.config.saturation}%,${this.config.brightness}%`;

        //Bewegung des Partikels in x und y berechnen
        const velocity: Vector = {
          //cos für die Bewegung in x Richtung (* zufällige Zahl zwischen 0 und 1 * particleSpeed, damit nicht jeder Partikel gleich weit fliegt)
          x: Math.cos(angleIncrement * i) * Math.random() * this.config.particleSpeed,
          //gleiches für die y koordinate
          y: Math.sin(angleIncrement * i) * Math.random() * this.config.particleSpeed
        };

        //Eigene Position für den Partikel erstellen, damit nicht alle Partikel die gleiche Position haben
        const pos: Vector = new Vector(this.pos.x, this.pos.y);

        //Erstellen des neuen Partikels und hinzufügen zu dem Partikel Array
        this.particles.push(new Particle(pos, this.config.particleRadius, color, velocity, this.config.gravity, this.config.friction, this.config.particleAlphaReduction));
      }
    }

    //updated alle Partikel und stellt sie dar
    public update(): void {
      //Ruft bei jedem Partikel die update methode auf
      this.particles.forEach(particle => particle.update());
    }

    //prüfen ob Feuerwerk ausgebrannt ist
    public isBurnedOut(): boolean {
      //schauen ob der alphawert des ersten Partikels kleiner als 0 ist, falls ja > ausgebrannt
      return this.particles[0].alpha < 0;
    }
  }
}