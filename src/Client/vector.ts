namespace Firework {
  //Hilfsklasse zum darstellen eines Vektors für z.B. Position oder Bewegung
  export class Vector {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }
}