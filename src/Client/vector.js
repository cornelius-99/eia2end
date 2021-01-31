"use strict";
var Firework;
(function (Firework) {
    //Hilfsklasse zum darstellen eines Vektors für z.B. Position oder Bewegung
    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    Firework.Vector = Vector;
})(Firework || (Firework = {}));
//# sourceMappingURL=vector.js.map